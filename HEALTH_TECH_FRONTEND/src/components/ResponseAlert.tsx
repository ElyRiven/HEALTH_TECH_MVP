interface ResponseAlertProps {
  message?: string | string[]
  variant?: 'success' | 'error'
}

import { useEffect, useState } from 'react'

export default function ResponseAlert({
  message = 'Paciente Creado exitosamente',
  variant = 'success',
}: ResponseAlertProps) {
  const isSuccess = variant === 'success'
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let duration = 2500
    if (
      (typeof message === 'string' && message === 'Paciente Creado exitosamente') ||
      (Array.isArray(message) && message.length === 1 && message[0] === 'Paciente Creado exitosamente')
    ) {
      duration = 5000
    }
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [message])

  if (!visible) return null

  

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-sm transition-all ${
        isSuccess
          ? 'border-blue-medium-tittle/30 bg-blue-medium-tittle/10 text-blue-medium-tittle'
          : 'border-red-300/50 bg-red-50 text-red-700'
      }`}
    >
      <span className="mt-0.5 shrink-0">
        {isSuccess ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12.5l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold leading-snug">
          {isSuccess ? '¡Éxito!' : 'Error'}
        </p>
        {Array.isArray(message) ? (
          <ul className="flex flex-col gap-0.5 list-none">
            {message.map((msg, i) => (
              <li key={i} className="text-black-main-font/80 font-normal">{msg}</li>
            ))}
          </ul>
        ) : (
          <p className="text-black-main-font/80 font-normal">{message}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-2 top-2 rounded-md p-1 text-black-main-font/60 hover:bg-black-main-font/10 hover:text-black-main-font/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Cerrar alerta"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06z" fill="currentColor" />
          <path d="M11.53 6.47a.75.75 0 0 0-1.06 0l-5 5a.75.75 0 1 0 1.06 1.06l5-5a.75.75 0 0 0 0-1.06z" fill="currentColor" />
        </svg>
      </button>
    </div>
  )
}
