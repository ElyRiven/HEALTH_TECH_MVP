import { useParams } from 'react-router-dom'
import ResponseAlert from '../components/ResponseAlert'

export default function RegisterSuccess() {
  const { id } = useParams()

  return (
    <section className="flex flex-col items-center gap-4 py-10 min-h-screen">
      <ResponseAlert
        message={`Paciente con identificación ${id} registrado exitosamente`}
        variant="success"
      />
    </section>
  )
}
