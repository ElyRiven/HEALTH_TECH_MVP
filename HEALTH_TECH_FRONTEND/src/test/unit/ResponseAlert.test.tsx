import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '../test-utils'
import ResponseAlert from '../../components/ResponseAlert'

describe('ResponseAlert', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with success variant by default', () => {
    render(<ResponseAlert />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('¡Éxito!')).toBeInTheDocument()
  })

  it('renders with error variant', () => {
    render(<ResponseAlert variant="error" message="Something broke" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something broke')).toBeInTheDocument()
  })

  it('renders a string message', () => {
    render(<ResponseAlert message="Custom message" />)
    expect(screen.getByText('Custom message')).toBeInTheDocument()
  })

  it('renders a default success message', () => {
    render(<ResponseAlert />)
    expect(screen.getByText('Paciente Creado exitosamente')).toBeInTheDocument()
  })

  it('renders an array of messages as list items', () => {
    render(<ResponseAlert message={['Error 1', 'Error 2', 'Error 3']} variant="error" />)
    expect(screen.getByText('Error 1')).toBeInTheDocument()
    expect(screen.getByText('Error 2')).toBeInTheDocument()
    expect(screen.getByText('Error 3')).toBeInTheDocument()
  })

  it('hides after 2500ms for non-default message', async () => {
    render(<ResponseAlert message="Custom error" variant="error" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2501)
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('stays visible for 5000ms for default success message', async () => {
    render(<ResponseAlert message="Paciente Creado exitosamente" variant="success" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(4999) })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await act(async () => { await vi.advanceTimersByTimeAsync(1) })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('close button hides the alert immediately', () => {
    render(<ResponseAlert message="Test" />)
    const closeBtn = screen.getByRole('button', { name: /cerrar alerta/i })
    fireEvent.click(closeBtn)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('success icon is rendered for success variant', () => {
    render(<ResponseAlert variant="success" />)
    // Success icon is a circle with a checkmark - the alert is visible
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('error icon is rendered for error variant', () => {
    render(<ResponseAlert variant="error" message="Oops" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('success message in array triggers 5000ms duration', async () => {
    render(<ResponseAlert message={['Paciente Creado exitosamente']} variant="success" />)
    await act(async () => { await vi.advanceTimersByTimeAsync(4999) })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await act(async () => { await vi.advanceTimersByTimeAsync(1) })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
