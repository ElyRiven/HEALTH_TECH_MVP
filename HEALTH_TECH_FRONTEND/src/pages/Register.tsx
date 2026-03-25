import PatientForm from '../components/PatientForm/PatientForm'
import ResponseAlert from '../components/ResponseAlert'
import { useRegisterPacient } from '../hooks/useRegisterPacient/useRegisterPacient'

export default function Register() {
  const { submitted, visible, handleSubmit } = useRegisterPacient()

  return (
    <section className="relative flex flex-col items-center gap-4 py-10 min-h-screen">
      {submitted && (
        <div
          className={`absolute top-4 right-4 w-80 z-10 transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ResponseAlert message="Usuario Creado exitosamente" variant="success" />
        </div>
      )}
      <PatientForm onSuccess={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} />
    </section>
  )
}
