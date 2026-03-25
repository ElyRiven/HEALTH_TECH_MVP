import { useState } from 'react'

interface PacientForm {
  identificacion: string
  nombres: string
  apellidos: string
  fecha_de_nacimiento: string
  genero: string
}

interface UseFormRegisterPacient {
  form: PacientForm
  loading: boolean
  error: string | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

const API_URL = 'http://localhost:3000/api/v1/pacients'

const initialForm: PacientForm = {
  identificacion: '',
  nombres: '',
  apellidos: '',
  fecha_de_nacimiento: '',
  genero: 'hombre',
}

export function useFormRegisterPacient(onSuccess?: () => void): UseFormRegisterPacient {
  const [form, setForm] = useState<PacientForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validación extra en frontend
    const idNum = Number(form.identificacion)
    if (!Number.isInteger(idNum) || idNum <= 0) {
      setError('La identificación debe ser un número entero positivo')
      setLoading(false)
      return
    }

    try {
      const body = {
        identificacion: idNum,
        nombres: form.nombres,
        apellidos: form.apellidos,
        fecha_de_nacimiento: form.fecha_de_nacimiento,
        genero: form.genero,
        criticidad: 1,
        estado: 'En espera',
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Error al registrar paciente')
        return
      }

      setForm(initialForm)
      onSuccess?.()
    } catch {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, handleChange, handleSubmit }
}
