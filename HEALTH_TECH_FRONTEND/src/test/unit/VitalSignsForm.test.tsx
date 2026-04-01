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

  it('shows error messages when formError is a string', () => {
    mockHook.mockReturnValue({ ...defaultHookValue, formError: 'Campo inválido' })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByText('Campo inválido')).toBeInTheDocument()
  })

  it('shows multiple error messages when formError is an array', () => {
    mockHook.mockReturnValue({
      ...defaultHookValue,
      formError: ['Error 1', 'Error 2'],
    })
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByText('Error 1')).toBeInTheDocument()
    expect(screen.getByText('Error 2')).toBeInTheDocument()
  })

  it('does not show error div when formError is null', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.queryByText('Error 1')).not.toBeInTheDocument()
  })

  it('nivel_de_conciencia shows all AVPU options', () => {
    render(<VitalSignsForm patientId="123" />)
    expect(screen.getByRole('option', { name: /alerta/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /confuso/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /sin respuesta/i })).toBeInTheDocument()
  })
})
