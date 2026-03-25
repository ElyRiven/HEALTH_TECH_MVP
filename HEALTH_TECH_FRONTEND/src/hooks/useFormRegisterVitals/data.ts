import type { VitalsForm } from './types'

export const API_URL = (patientId: string) =>
  `http://localhost:3000/api/v1/vitals/${patientId}`

export const initialForm: VitalsForm = {
  frecuencia_cardiaca: '',
  frecuencia_respiratoria: '',
  saturacion_o2: '',
  temperatura: '',
  presion: '',
  nivel_de_conciencia: 'Alerta',
  nivel_de_dolor: '',
}

export const NIVEL_CONCIENCIA_OPTIONS = [
  'Alerta',
  'Confuso',
  'Responde a la voz',
  'Responde al dolor',
  'Sin respuesta',
]
