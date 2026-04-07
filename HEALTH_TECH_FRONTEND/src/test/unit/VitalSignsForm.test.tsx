import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../test-utils'
import VitalSignsForm from '../../components/VitalSignsForm/VitalSignsForm'
import { useFormRegisterVitals } from '../../hooks/useFormRegisterVitals/useFormRegisterVitals'
import type { UseFormRegisterVitals } from '../../hooks/useFormRegisterVitals/types'

vi.mock('../../hooks/useFormRegisterVitals/useFormRegisterVitals', () => ({
  useFormRegisterVitals: vi.fn(),
}))

const mockHook = useFormRegisterVitals as ReturnType<typeof vi.fn>

const defaultHookValue: UseFormRegisterVitals = {
  form: {
    frecuencia_cardiaca: '',
    frecuencia_respiratoria: '',
    saturacion_o2: '',
    temperatura: '',
    presion: '',
    nivel_de_conciencia: 'Alerta',
    nivel_de_dolor: '',
  },
  loading: false,
  formError: null,
  fieldErrors: {},
  formSuccess: null,
  handleChange: vi.fn(),
  handleSubmit: vi.fn(),
}

describe('VitalSignsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHook.mockReturnValue(defaultHookValue)
  })

  it('renders the Frecuencia Cardiaca field', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/frecuencia cardiaca/i)).toBeInTheDocument()
  })

  it('renders the Frecuencia Respiratoria field', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/frecuencia respiratoria/i)).toBeInTheDocument()
  })

  it('renders the Saturación O2 field', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/saturación o2/i)).toBeInTheDocument()
  })

  it('renders the Temperatura field', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/temperatura/i)).toBeInTheDocument()
  })

  it('renders the Presión field', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/presión/i)).toBeInTheDocument()
  })

  it('renders the Nivel de Conciencia select', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/nivel de conciencia/i)).toBeInTheDocument()
  })

  it('renders the Nivel de Dolor field', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByLabelText(/nivel de dolor/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument()
  })

  it('submit button is disabled while loading', () => {
    mockHook.mockReturnValue({ ...defaultHookValue, loading: true })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByRole('button', { name: /guardando/i })).toBeDisabled()
  })

  it('submit button is enabled when not loading', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByRole('button', { name: /guardar/i })).not.toBeDisabled()
  })

  it('shows per-field error for frecuencia_cardiaca', () => {
    mockHook.mockReturnValue({
      ...defaultHookValue,
      fieldErrors: { frecuencia_cardiaca: 'Frecuencia cardíaca: campo requerido' },
    })
    render(<VitalSignsForm patientId="123" />)
    const error = screen.getByText('Frecuencia cardíaca: campo requerido')
    expect(error).toBeInTheDocument()
    // Error appears adjacent to the field, not at the bottom
    const input = screen.getByLabelText(/frecuencia cardiaca/i)
    expect(input.nextElementSibling).not.toBeNull()
    expect(input.closest('div')?.textContent).toContain('Frecuencia cardíaca: campo requerido')
  })

  it('shows per-field error for temperatura', () => {
    mockHook.mockReturnValue({
      ...defaultHookValue,
      fieldErrors: { temperatura: 'Temperatura: campo requerido' },
    })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByText('Temperatura: campo requerido')).toBeInTheDocument()
    const input = screen.getByLabelText(/temperatura/i)
    expect(input.closest('div')?.textContent).toContain('Temperatura: campo requerido')
  })

  it('shows per-field error for presion', () => {
    mockHook.mockReturnValue({
      ...defaultHookValue,
      fieldErrors: { presion: 'Presión arterial: campo requerido' },
    })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByText('Presión arterial: campo requerido')).toBeInTheDocument()
  })

  it('shows per-field error for nivel_de_dolor', () => {
    mockHook.mockReturnValue({
      ...defaultHookValue,
      fieldErrors: { nivel_de_dolor: 'Nivel de dolor: campo requerido' },
    })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByText('Nivel de dolor: campo requerido')).toBeInTheDocument()
    const input = screen.getByLabelText(/nivel de dolor/i)
    expect(input.closest('div')?.textContent).toContain('Nivel de dolor: campo requerido')
  })

  it('shows multiple per-field errors each below their respective field', () => {
    mockHook.mockReturnValue({
      ...defaultHookValue,
      fieldErrors: {
        frecuencia_cardiaca: 'Frecuencia cardíaca: campo requerido',
        temperatura: 'Temperatura: campo requerido',
        nivel_de_dolor: 'Nivel de dolor: campo requerido',
      },
    })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByText('Frecuencia cardíaca: campo requerido')).toBeInTheDocument()
    expect(screen.getByText('Temperatura: campo requerido')).toBeInTheDocument()
    expect(screen.getByText('Nivel de dolor: campo requerido')).toBeInTheDocument()
  })

  it('does not show error div when fieldErrors is empty', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.queryByText(/campo requerido/i)).not.toBeInTheDocument()
  })

  it('nivel_de_conciencia shows all AVPU options', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByRole('option', { name: /alerta/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /confuso/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /sin respuesta/i })).toBeInTheDocument()
  })
})
