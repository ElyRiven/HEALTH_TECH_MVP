export interface PacientForm {
  identificacion: string
  nombres: string
  apellidos: string
  fecha_de_nacimiento: string
  genero: string
}

import type React from 'react'
export interface UseFormRegisterPacient {
  form: PacientForm
  loading: boolean
  formError: string | string[] | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}