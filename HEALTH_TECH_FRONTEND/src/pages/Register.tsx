import { useCallback, useState } from 'react'
import PatientForm from '../components/PatientForm/PatientForm'
import ResponseAlert from '../components/ResponseAlert'
import { useRegisterPacient } from '../hooks/useRegisterPacient/useRegisterPacient'

export default function Register() {
  const { submitted, visible, notifySuccess } = useRegisterPacient()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [errorKey, setErrorKey] = useState(0)

  const notifyError = useCallback((message: string) => {
    setErrorMsg(message)
    setErrorKey(k => k + 1)
  }, [])

  return (
    <main className="relative flex flex-col items-center gap-4 py-10 min-h-screen">
      {submitted && (
        <div
          className={`absolute top-4 right-4 w-80 z-10 transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ResponseAlert message="Usuario Creado exitosamente" variant="success" />
        </div>
      )}
      {errorMsg && !submitted && (
        <div className="absolute top-4 right-4 w-80 z-10">
          <ResponseAlert key={errorKey} message={errorMsg} variant="error" />
        </div>
      )}
      <PatientForm onSuccess={notifySuccess} onError={notifyError} />
    </main>
  )
}
