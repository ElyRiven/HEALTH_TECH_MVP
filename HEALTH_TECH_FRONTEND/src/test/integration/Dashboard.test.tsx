import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import { useGetListPacients } from '../../hooks/useGetListPacients/useGetListPacients'
import type { UseGetListPacients } from '../../hooks/useGetListPacients/types'

vi.mock('../../hooks/useGetListPacients/useGetListPacients', () => ({
  useGetListPacients: vi.fn(),
}))

const mockHook = useGetListPacients as ReturnType<typeof vi.fn>

function mockHookWith(overrides: Partial<UseGetListPacients> = {}) {
  mockHook.mockReturnValue({
    pacients: [],
    loading: false,
    error: null,
    fetchPacients: vi.fn(),
    ...overrides,
  })
}

function renderDashboard(locationState?: unknown) {
  const initialEntry = locationState
    ? { pathname: '/', state: locationState }
    : '/'
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Dashboard />
    </MemoryRouter>,
  )
}

describe('Dashboard page (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHookWith()
  })

  it('renders the page heading', () => {
    renderDashboard()
    expect(screen.getByRole('heading', { name: /lista de pacientes/i })).toBeInTheDocument()
  })

  it('renders PatientTable component', () => {
    renderDashboard()
    expect(screen.getByText(/no hay pacientes en espera/i)).toBeInTheDocument()
  })

  it('renders patient data from hook', () => {
    mockHookWith({
      pacients: [{
        identificacion: 1,
        nombres: 'Laura',
        apellidos: 'Torres',
        criticidad: 2,
        criticidadDenominacion: 'Muy Urgente',
        criticidadColor: 'manchester-criticidad-2',
        fecha_de_nacimiento: '1995-03-10',
        genero: 'mujer',
        hora_de_registro: '09:00',
        estado: 'En espera',
      }],
    })
    renderDashboard()
    expect(screen.getByText('Laura')).toBeInTheDocument()
    expect(screen.getByText('Muy Urgente')).toBeInTheDocument()
  })

  it('shows alert when navigating with alertMsg state', async () => {
    renderDashboard({ alertMsg: 'Signos registrados exitosamente', alertVariant: 'success' })
    await waitFor(() => {
      expect(screen.getByText('Signos registrados exitosamente')).toBeInTheDocument()
    })
  })

  it('shows error alert when navigating with error variant', async () => {
    renderDashboard({ alertMsg: 'Error al registrar', alertVariant: 'error' })
    await waitFor(() => {
      expect(screen.getByText('Error al registrar')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })

  it('shows loading state from PatientTable', () => {
    mockHookWith({ loading: true })
    renderDashboard()
    expect(screen.getByText(/cargando pacientes/i)).toBeInTheDocument()
  })

  it('shows error from PatientTable', () => {
    mockHookWith({ error: 'Servidor no disponible' })
    renderDashboard()
    expect(screen.getByText('Servidor no disponible')).toBeInTheDocument()
  })
})
