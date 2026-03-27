import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResponseAlert from '../components/ResponseAlert'
import VitalSignsForm from '../components/VitalSignsForm/VitalSignsForm'

export default function RegisterVitals() {
  const { id } = useParams()
  const [alertMsg, setAlertMsg] = useState<string | string[] | null>(
    id ? `Paciente con identificación ${id} registrado exitosamente` : null
  )
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success')
  const [alertKey, setAlertKey] = useState(0)

  const notifySuccess = useCallback((message: string) => {
    setAlertMsg(message)
    setAlertVariant('success')
    setAlertKey(k => k + 1)
  }, [])

  const notifyError = useCallback((message: string | string[]) => {
    setAlertMsg(message)
    setAlertVariant('error')
    setAlertKey(k => k + 1)
  }, [])

  return (
    <section className="relative flex flex-col items-center gap-4 py-10 min-h-screen">
      {alertMsg && (
        <div className="absolute top-4 right-4 w-80 z-10">
          <ResponseAlert key={alertKey} message={alertMsg} variant={alertVariant} />
        </div>
      )}
      {id && <VitalSignsForm patientId={id} onSuccess={notifySuccess} onError={notifyError} />}
    </section>
  )
}
