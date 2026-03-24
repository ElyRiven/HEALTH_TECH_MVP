import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="h-22.5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]">
      <nav className="max-w-286 flex items-center justify-between mx-auto h-full">
        <Link to="/" className="h-full py-2">
          <img src="/HealthTech-Logo.png" alt="HealthTech Logo" className="h-full w-auto" />
        </Link>
        <div className="flex items-center gap-8">
          <Link className='font-medium' to="/">LISTA DE PACIENTES</Link>
          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 h-10.5 w-57 bg-main-white-back border-2 border-blue-medium-tittle text-black-main-font rounded-lg font-medium transition-colors hover:bg-blue-medium-tittle hover:text-main-white-back hover:border-transparent"
          >
            <span>Registrar Paciente</span>
            <img src="/healthicons_health-worker-form-outline-black.svg" alt="" aria-hidden="true" className="transition-[filter] duration-150 group-hover:invert" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

//inline-flex items-center justify-center gap-2 h-10.5 w-57 bg-blue-medium-tittle text-main-white-back rounded-lg font-medium