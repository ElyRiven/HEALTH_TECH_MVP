import { useParams } from 'react-router-dom'
import ResponseAlert from '../components/ResponseAlert'
import VitalSignsForm from '../components/VitalSignsForm/VitalSignsForm'

export default function RegisterVitals() {
  const { id } = useParams()

  return (
    <section className="flex flex-col items-center gap-4 py-10 min-h-screen">
      <ResponseAlert
        message={`Paciente con identificación ${id} registrado exitosamente`}
        variant="success"
      />
      {id && <VitalSignsForm patientId={id} />}
    </section>
  )
}
