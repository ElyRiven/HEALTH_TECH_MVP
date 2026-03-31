import { useFormRegisterVitals } from '../../hooks/useFormRegisterVitals/useFormRegisterVitals'
import { NIVEL_CONCIENCIA_OPTIONS } from '../../hooks/useFormRegisterVitals/data'
import type { VitalSignsFormProps } from './types'

export default function VitalSignsForm({ patientId, onSuccess, onError }: VitalSignsFormProps) {
  const { form, loading, formError, handleChange, handleSubmit } = useFormRegisterVitals(patientId, onSuccess, onError)

  return (
    <div className="bg-white-second-back rounded-lg p-6 w-full max-w-sm shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
      <form className="flex flex-col gap-4" noValidate onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Frecuencia Cardiaca
          </label>
          <input
            type="number"
            name="frecuencia_cardiaca"
            value={form.frecuencia_cardiaca}
            onChange={handleChange}
            min="20"
            max="300"
            step="1"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 75 (20-300 bpm)"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Frecuencia Respiratoria
          </label>
          <input
            type="number"
            name="frecuencia_respiratoria"
            value={form.frecuencia_respiratoria}
            onChange={handleChange}
            min="1"
            max="60"
            step="1"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 18 (1-60 rpm)"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Saturación o2
          </label>
          <input
            type="number"
            name="saturacion_o2"
            value={form.saturacion_o2}
            onChange={handleChange}
            min="50"
            max="100"
            step="0.1"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 98.5, 50-100, máximo un decimal (50.0-100.0 %)"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Temperatura
          </label>
          <input
            type="number"
            name="temperatura"
            value={form.temperatura}
            onChange={handleChange}
            min="25"
            max="45"
            step="0.1"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 36.5 (°C)"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Presión
          </label>
          <input
            type="text"
            name="presion"
            value={form.presion}
            onChange={handleChange}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
            placeholder="Ej: 120/80 (mmHg)"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Nivel de conciencia
          </label>
          <select
            name="nivel_de_conciencia"
            value={form.nivel_de_conciencia}
            onChange={handleChange}
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none"
          >
            {NIVEL_CONCIENCIA_OPTIONS.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-blue-medium-tittle text-sm font-medium">
            Nivel de dolor
          </label>
          <input
            type="number"
            name="nivel_de_dolor"
            value={form.nivel_de_dolor}
            onChange={handleChange}
            min="0"
            max="10"
            step="1"
            className="bg-main-white-back rounded px-3 py-2 text-black-main-font text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 5 (0-10 EVA)"
          />
        </div>

        {formError && (
          <div className="text-red-600 text-xs flex flex-col gap-1">
            {Array.isArray(formError)
              ? formError.map((err, i) => <span key={i}>{err}</span>)
              : <span>{formError}</span>}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-medium-tittle text-main-white-back font-medium py-2 rounded 
          text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}
