import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ReactNode } from 'react'
import { useFormRegisterPacient } from '../../hooks/useFormRegisterPacient/useFormRegisterPacient'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('useFormRegisterPacient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns correct initial state', () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    expect(result.current.form.identificacion).toBe('')
    expect(result.current.form.nombres).toBe('')
    expect(result.current.form.apellidos).toBe('')
    expect(result.current.form.fecha_de_nacimiento).toBe('')
    expect(result.current.form.genero).toBe('hombre')
    expect(result.current.loading).toBe(false)
    expect(result.current.formError).toBeNull()
  })

  it('handleChange updates an input field', () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleChange({
        target: { name: 'nombres', value: 'María' },
      } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.form.nombres).toBe('María')
  })

  it('handleChange updates a select field', () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleChange({
        target: { name: 'genero', value: 'mujer' },
      } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(result.current.form.genero).toBe('mujer')
  })

  it('handleKeyDown prevents non-digit keys and calls onError', () => {
    const onError = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(undefined, onError), { wrapper })
    const preventDefault = vi.fn()
    act(() => {
      result.current.handleKeyDown({
        key: 'a',
        preventDefault,
      } as unknown as React.KeyboardEvent<HTMLInputElement>)
    })
    expect(preventDefault).toHaveBeenCalled()
    expect(result.current.formError).toBe('La identificacion debe ser un valor numérico')
    expect(onError).toHaveBeenCalledWith('La identificacion debe ser un valor numérico')
  })

  it('handleKeyDown allows digit keys', () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    const preventDefault = vi.fn()
    act(() => {
      result.current.handleKeyDown({
        key: '7',
        preventDefault,
      } as unknown as React.KeyboardEvent<HTMLInputElement>)
    })
    expect(preventDefault).not.toHaveBeenCalled()
  })

  it('handleKeyDown allows control keys (Backspace, Delete, Tab, Enter, ArrowLeft, ArrowRight)', () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    const controlKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight']
    for (const key of controlKeys) {
      const preventDefault = vi.fn()
      act(() => {
        result.current.handleKeyDown({
          key,
          preventDefault,
        } as unknown as React.KeyboardEvent<HTMLInputElement>)
      })
      expect(preventDefault).not.toHaveBeenCalled()
    }
  })

  it('handleKeyDown clears formError after valid key', () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleKeyDown({ key: 'e', preventDefault: vi.fn() } as unknown as React.KeyboardEvent<HTMLInputElement>)
    })
    expect(result.current.formError).toBeTruthy()
    act(() => {
      result.current.handleKeyDown({ key: '1', preventDefault: vi.fn() } as unknown as React.KeyboardEvent<HTMLInputElement>)
    })
    expect(result.current.formError).toBeNull()
  })

  it('handleSubmit sets errors for completely empty form', async () => {
    const onError = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(undefined, onError), { wrapper })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(Array.isArray(result.current.formError)).toBe(true)
    expect(result.current.formError).toEqual(
      expect.arrayContaining(['Lo siento, debes escribir la identificación del paciente'])
    )
    expect(onError).toHaveBeenCalled()
  })

  it('handleSubmit rejects identificacion = "0"', async () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleChange({ target: { name: 'identificacion', value: '0' } } as React.ChangeEvent<HTMLInputElement>)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.formError).toEqual(
      expect.arrayContaining(['Lo siento, debes escribir la identificación del paciente'])
    )
  })

  it('handleSubmit requires nombres', async () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleChange({ target: { name: 'identificacion', value: '99' } } as React.ChangeEvent<HTMLInputElement>)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.formError).toEqual(
      expect.arrayContaining(['Lo siento, debes escribir los nombres del paciente'])
    )
  })

  it('handleSubmit requires apellidos', async () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleChange({ target: { name: 'identificacion', value: '99' } } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({ target: { name: 'nombres', value: 'Ana' } } as React.ChangeEvent<HTMLInputElement>)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.formError).toEqual(
      expect.arrayContaining(['Lo siento, debes escribir los apellidos del paciente'])
    )
  })

  it('handleSubmit requires fecha_de_nacimiento', async () => {
    const { result } = renderHook(() => useFormRegisterPacient(), { wrapper })
    act(() => {
      result.current.handleChange({ target: { name: 'identificacion', value: '99' } } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({ target: { name: 'nombres', value: 'Ana' } } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({ target: { name: 'apellidos', value: 'Lopez' } } as React.ChangeEvent<HTMLInputElement>)
    })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.formError).toEqual(
      expect.arrayContaining(['Lo siento, debes escribir la fecha de nacimiento del paciente'])
    )
  })

  it('submits successfully, resets form and navigates', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 12345 }),
    })
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(onSuccess), { wrapper })
    act(() => { result.current.handleChange({ target: { name: 'identificacion', value: '12345' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'nombres', value: 'Carlos' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'apellidos', value: 'Ruiz' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'fecha_de_nacimiento', value: '1990-06-15' } } as React.ChangeEvent<HTMLInputElement>) })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/pacients',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(mockNavigate).toHaveBeenCalledWith('/register/12345')
    expect(onSuccess).toHaveBeenCalled()
    expect(result.current.form.identificacion).toBe('')
    expect(result.current.loading).toBe(false)
  })

  it('handles API error with errors object', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ errors: { id: 'Paciente ya registrado' } }),
    })
    const onError = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(undefined, onError), { wrapper })
    act(() => { result.current.handleChange({ target: { name: 'identificacion', value: '12345' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'nombres', value: 'Carlos' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'apellidos', value: 'Ruiz' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'fecha_de_nacimiento', value: '1990-06-15' } } as React.ChangeEvent<HTMLInputElement>) })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(onError).toHaveBeenCalledWith(['Paciente ya registrado'])
  })

  it('handles API error with message string', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'El paciente ya existe' }),
    })
    const onError = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(undefined, onError), { wrapper })
    act(() => { result.current.handleChange({ target: { name: 'identificacion', value: '99999' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'nombres', value: 'Test' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'apellidos', value: 'User' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'fecha_de_nacimiento', value: '2000-01-01' } } as React.ChangeEvent<HTMLInputElement>) })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(onError).toHaveBeenCalledWith('El paciente ya existe')
  })

  it('handles API error without message uses fallback', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    })
    const onError = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(undefined, onError), { wrapper })
    act(() => { result.current.handleChange({ target: { name: 'identificacion', value: '11111' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'nombres', value: 'Test' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'apellidos', value: 'User' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'fecha_de_nacimiento', value: '2000-01-01' } } as React.ChangeEvent<HTMLInputElement>) })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(onError).toHaveBeenCalledWith('Error al registrar paciente')
  })

  it('handles network error (fetch throws)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Connection refused'))
    const onError = vi.fn()
    const { result } = renderHook(() => useFormRegisterPacient(undefined, onError), { wrapper })
    act(() => { result.current.handleChange({ target: { name: 'identificacion', value: '12345' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'nombres', value: 'Carlos' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'apellidos', value: 'Ruiz' } } as React.ChangeEvent<HTMLInputElement>) })
    act(() => { result.current.handleChange({ target: { name: 'fecha_de_nacimiento', value: '1990-06-15' } } as React.ChangeEvent<HTMLInputElement>) })
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.formError).toBe('No se pudo conectar con el servidor')
    expect(result.current.loading).toBe(false)
    expect(onError).toHaveBeenCalledWith('No se pudo conectar con el servidor')
  })
})
