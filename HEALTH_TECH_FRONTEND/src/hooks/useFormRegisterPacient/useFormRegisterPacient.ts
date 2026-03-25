import { useState } from 'react'
import type { PacientForm, UseFormRegisterPacient } from './types'
import type React from 'react'
import { API_URL, initialForm } from './data'

export function useFormRegisterPacient(onSuccess?: (e: React.FormEvent<HTMLFormElement>) => void): UseFormRegisterPacient {
  const [form, setForm] = useState<PacientForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setFormError(null)

    try {
      const body = {
        identificacion: Number(form.identificacion),
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
        setFormError(data.message || 'Error al registrar paciente')
        return
      }

      setForm(initialForm)
      if (typeof onSuccess === 'function') {
        onSuccess(e)
      }
    } catch {
      setFormError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, formError, handleChange, handleSubmit }
}
