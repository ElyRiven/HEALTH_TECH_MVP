import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Register from '../../pages/Register'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Register page (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the PatientForm', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    expect(screen.getByLabelText(/identificación/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: /registrar paciente/i })).toBeInTheDocument()
  })

  it('shows error alert on submit with empty form', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: /registrar paciente/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })

  it('shows validation error for missing identificacion', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: /registrar paciente/i }))
    await waitFor(() => {
      expect(screen.getByText(/debes escribir la identificación/i)).toBeInTheDocument()
    })
  })

  it('calls fetch and navigates to vitals on valid submission', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    })
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByLabelText(/identificación/i), { target: { name: 'identificacion', value: '99001' } })
    fireEvent.change(screen.getByLabelText(/nombres/i), { target: { name: 'nombres', value: 'Pedro' } })
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { name: 'apellidos', value: 'Soto' } })
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { name: 'fecha_de_nacimiento', value: '1988-07-22' } })
    fireEvent.click(screen.getByRole('button', { name: /registrar paciente/i }))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/register/99001')
    })
  })

  it('shows error alert when API returns error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Paciente ya registrado' }),
    })
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByLabelText(/identificación/i), { target: { name: 'identificacion', value: '11111' } })
    fireEvent.change(screen.getByLabelText(/nombres/i), { target: { name: 'nombres', value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { name: 'apellidos', value: 'Ruiz' } })
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { name: 'fecha_de_nacimiento', value: '1992-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /registrar paciente/i }))
    await waitFor(() => {
      expect(screen.getByText('Paciente ya registrado')).toBeInTheDocument()
    })
  })

  it('shows error alert when network fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('timeout'))
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByLabelText(/identificación/i), { target: { name: 'identificacion', value: '22222' } })
    fireEvent.change(screen.getByLabelText(/nombres/i), { target: { name: 'nombres', value: 'Tom' } })
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { name: 'apellidos', value: 'Smith' } })
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { name: 'fecha_de_nacimiento', value: '1990-01-01' } })
    fireEvent.click(screen.getByRole('button', { name: /registrar paciente/i }))
    await waitFor(() => {
      expect(screen.getByText(/no se pudo conectar/i)).toBeInTheDocument()
    })
  })
})
