interface ResponseAlertProps {
  message?: string
  variant?: 'success' | 'error'
}

export default function ResponseAlert({
  message = 'Usuario Creado exitosamente',
  variant = 'success',
}: ResponseAlertProps) {
  const isSuccess = variant === 'success'

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-sm transition-all ${
        isSuccess
          ? 'border-[#217FCA]/30 bg-[#217FCA]/10 text-[#217FCA]'
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
        <p className="text-black-main-font/80 font-normal">{message}</p>
      </div>
    </div>
  )
}
