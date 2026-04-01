import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGetListPacients } from '../../hooks/useGetListPacients/useGetListPacients'

const basePacient = {
  identificacion: 1,
  nombres: 'Juan',
  apellidos: 'Perez',
  fecha_de_nacimiento: '1990-01-01',
  genero: 'hombre',
  hora_de_registro: '10:00',
  estado: 'En espera',
}

describe('useGetListPacients', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts with loading=true and empty patients', () => {
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {})) // pending forever
    const { result } = renderHook(() => useGetListPacients())
    expect(result.current.loading).toBe(true)
    expect(result.current.pacients).toHaveLength(0)
    expect(result.current.error).toBeNull()
  })

  it('loads patients on mount', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 1 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients).toHaveLength(1)
    expect(result.current.error).toBeNull()
  })

  it('maps criticidad 1 → Inmediato / manchester-criticidad-1', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 1 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients[0].criticidadDenominacion).toBe('Inmediato')
    expect(result.current.pacients[0].criticidadColor).toBe('manchester-criticidad-1')
  })

  it('maps criticidad 2 → Muy Urgente / manchester-criticidad-2', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 2 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients[0].criticidadDenominacion).toBe('Muy Urgente')
    expect(result.current.pacients[0].criticidadColor).toBe('manchester-criticidad-2')
  })

  it('maps criticidad 3 → Urgente / manchester-criticidad-3', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 3 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients[0].criticidadDenominacion).toBe('Urgente')
    expect(result.current.pacients[0].criticidadColor).toBe('manchester-criticidad-3')
  })

  it('maps criticidad 4 → Menos Urgente / manchester-criticidad-4', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 4 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients[0].criticidadDenominacion).toBe('Menos Urgente')
    expect(result.current.pacients[0].criticidadColor).toBe('manchester-criticidad-4')
  })

  it('maps criticidad 5 → No Urgente / manchester-criticidad-5', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 5 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients[0].criticidadDenominacion).toBe('No Urgente')
    expect(result.current.pacients[0].criticidadColor).toBe('manchester-criticidad-5')
  })

  it('maps unknown criticidad → empty string / manchester-criticidad-5', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ ...basePacient, criticidad: 99 }]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pacients[0].criticidadDenominacion).toBe('')
    expect(result.current.pacients[0].criticidadColor).toBe('manchester-criticidad-5')
  })

  it('sets error when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Error al obtener la lista de pacientes')
    expect(result.current.pacients).toHaveLength(0)
  })

  it('sets error on network failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Network error')
  })

  it('fetchPacients called with DESC order sends correct query', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.fetchPacients('DESC')
    })
    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining('order=DESC'),
    )
  })

  it('fetchPacients defaults to ASC order', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })
    const { result } = renderHook(() => useGetListPacients())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.fetchPacients()
    })
    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining('order=ASC'),
    )
  })
})
