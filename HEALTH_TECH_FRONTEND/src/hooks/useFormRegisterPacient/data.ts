import type { PacientForm } from './types'

export const API_URL = 'http://localhost:3000/api/v1/pacients'

export const initialForm: PacientForm = {
  identificacion: '',
  nombres: '',
  apellidos: '',
  fecha_de_nacimiento: '',
  genero: 'hombre',
}