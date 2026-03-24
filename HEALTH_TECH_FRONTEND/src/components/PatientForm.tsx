export default function PatientForm() {
  return (
    <div className="bg-white-second-back rounded-lg p-6 w-full max-w-sm shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
      <form className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Identificación
          </label>
          <input
            type="text"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Nombres
          </label>
          <input
            type="text"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Apellidos
          </label>
          <input
            type="text"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Genero
          </label>
          <select
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          >
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-medium-tittle text-main-white-back font-medium py-2 rounded text-sm hover:opacity-90 transition-opacity"
        >
          Registrar Paciente
        </button>

      </form>
    </div>
  )
}
