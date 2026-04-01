import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import Header from '../../components/Header'

describe('Header', () => {
  it('renders the logo link pointing to /', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link', { name: /healthtech logo/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders the "Lista de Pacientes" navigation link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /lista de pacientes/i })).toBeInTheDocument()
  })

  it('"Lista de Pacientes" link points to /', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /lista de pacientes/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders the "Registrar Paciente" link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /registrar paciente/i })).toBeInTheDocument()
  })

  it('"Registrar Paciente" link points to /register', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /registrar paciente/i })
    expect(link).toHaveAttribute('href', '/register')
  })

  it('renders inside a header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders inside a nav element', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
