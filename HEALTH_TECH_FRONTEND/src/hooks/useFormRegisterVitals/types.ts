import type React from 'react'

export interface VitalsForm {
  frecuencia_cardiaca: string
  frecuencia_respiratoria: string
  saturacion_o2: string
  temperatura: string
  presion: string
  nivel_de_conciencia: string
  nivel_de_dolor: string
}

export interface UseFormRegisterVitals {
  form: VitalsForm
  loading: boolean
  formError: string | string[] | null
  formSuccess: string | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  onSuccess?: (message: string) => void
  onError?: (message: string | string[]) => void
}

export type NavigationAlertState = {
  alertMsg: string
  alertVariant: 'success' | 'error'
}
