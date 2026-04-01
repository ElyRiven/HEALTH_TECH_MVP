import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../test-utils'
import PatientForm from '../../components/PatientForm/PatientForm'
import type { UseFormRegisterPacient } from '../../hooks/useFormRegisterPacient/types'
import { useFormRegisterPacient } from '../../hooks/useFormRegisterPacient/useFormRegisterPacient'

vi.mock('../../hooks/useFormRegisterPacient/useFormRegisterPacient', () => ({
  useFormRegisterPacient: vi.fn(),
}))

const mockHook = useFormRegisterPacient as ReturnType<typeof vi.fn>

const defaultHookValue: UseFormRegisterPacient = {
  form: {
    identificacion: '',
    nombres: '',
    apellidos: '',
    fecha_de_nacimiento: '',
    genero: 'hombre',
  },
  loading: false,
  formError: null,
  handleChange: vi.fn(),
  handleKeyDown: vi.fn(),
  handleSubmit: vi.fn(),
}

describe('PatientForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHook.mockReturnValue(defaultHookValue)
  })

  it('renders the Identificación input', () => {
    render(<PatientForm />)
    expect(screen.getByLabelText(/identificación/i)).toBeInTheDocument()
  })

  it('renders the Nombres input', () => {
    render(<PatientForm />)
    expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument()
  })

  it('renders the Apellidos input', () => {
    render(<PatientForm />)
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument()
  })

  it('renders the Fecha de Nacimiento input', () => {
    render(<PatientForm />)
    expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument()
  })

  it('renders the Genero select', () => {
    render(<PatientForm />)
    expect(screen.getByLabelText(/genero/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<PatientForm />)
    expect(screen.getByRole('button', { name: /registrar paciente/i })).toBeInTheDocument()
  })

  it('submit button is disabled while loading', () => {
    mockHook.mockReturnValue({ ...defaultHookValue, loading: true })
    render(<PatientForm />)
    expect(screen.getByRole('button', { name: /registrando/i })).toBeDisabled()
  })

  it('submit button is enabled when not loading', () => {
    render(<PatientForm />)
    expect(screen.getByRole('button', { name: /registrar paciente/i })).not.toBeDisabled()
  })

  it('Genero select has Hombre, Mujer, Otro options', () => {
    render(<PatientForm />)
    const select = screen.getByLabelText(/genero/i)
    expect(select).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /hombre/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /mujer/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /otro/i })).toBeInTheDocument()
  })

  it('renders a form element', () => {
    const { container } = render(<PatientForm />)
    expect(container.querySelector('form')).toBeInTheDocument()
  })
})
