import { useFormRegisterPacient } from '../../hooks/useFormRegisterPacient/useFormRegisterPacient'
import type { PatientFormProps } from './types'

export default function PatientForm({ onSuccess, onError }: PatientFormProps) {
  const { form, loading, handleChange, handleKeyDown, handleSubmit } = useFormRegisterPacient(onSuccess, onError)

  return (
    <div className="bg-white-second-back rounded-lg p-6 w-full max-w-sm shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="identificacion" className="text-blue-medium-tittle text-sm font-medium">
            Identificación
          </label>
          <input
            id="identificacion"
            type="text"
            name="identificacion"
            value={form.identificacion}
            onChange={handleChange}
            maxLength={10}
            onKeyDown={handleKeyDown}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nombres" className="text-blue-medium-tittle text-sm font-medium">
            Nombres
          </label>
          <input
            id="nombres"
            type="text"
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="apellidos" className="text-blue-medium-tittle text-sm font-medium">
            Apellidos
          </label>
          <input
            id="apellidos"
            type="text"
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="fecha_de_nacimiento" className="text-blue-medium-tittle text-sm font-medium">
            Fecha de Nacimiento
          </label>
          <input
            id="fecha_de_nacimiento"
            type="date"
            name="fecha_de_nacimiento"
            value={form.fecha_de_nacimiento}
            onChange={handleChange}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="genero" className="text-blue-medium-tittle text-sm font-medium">
            Genero
          </label>
          <select
            id="genero"
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          >
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-medium-tittle text-main-white-back font-medium py-2 rounded 
          text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrar Paciente'}
        </button>
      </form>
    </div>
  )
}
