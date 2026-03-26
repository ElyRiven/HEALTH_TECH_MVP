import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type React from 'react'
import type { UseFormRegisterVitals, VitalsForm } from './types'
import { API_URL, initialForm } from './data'

export function useFormRegisterVitals(patientId: string): UseFormRegisterVitals {
  const navigate = useNavigate()
  const [form, setForm] = useState<VitalsForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | string[] | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    const clientErrors: string[] = []

    if (!form.frecuencia_cardiaca.trim()) {
      clientErrors.push('Debes ingresar la frecuencia cardíaca')
    }
    if (!form.frecuencia_respiratoria.trim()) {
      clientErrors.push('Debes ingresar la frecuencia respiratoria')
    }
    if (!form.saturacion_o2.trim()) {
      clientErrors.push('Debes ingresar la saturación de O2')
    }
    if (!form.temperatura.trim()) {
      clientErrors.push('Debes ingresar la temperatura')
    }
    if (!form.presion.trim()) {
      clientErrors.push('Debes ingresar la presión arterial')
    }
    if (!form.nivel_de_conciencia) {
      clientErrors.push('Debes seleccionar el nivel de conciencia')
    }
    if (form.nivel_de_dolor === '') {
      clientErrors.push('Debes ingresar el nivel de dolor')
    }

    if (
      form.nivel_de_conciencia === 'Sin respuesta' &&
      form.nivel_de_dolor !== '' &&
      parseInt(form.nivel_de_dolor, 10) !== 0
    ) {
      clientErrors.push("El nivel de dolor debe ser 0 cuando el nivel de conciencia es 'Sin respuesta'")
    }

    if (clientErrors.length > 0) {
      setFormError(clientErrors)
      return
    }

    setLoading(true)

    try {
      const body = {
        frecuencia_cardiaca: parseInt(form.frecuencia_cardiaca, 10),
        frecuencia_respiratoria: parseInt(form.frecuencia_respiratoria, 10),
        saturacion_o2: parseFloat(form.saturacion_o2),
        temperatura: parseFloat(form.temperatura),
        presion: form.presion,
        nivel_de_conciencia: form.nivel_de_conciencia,
        nivel_de_dolor: parseInt(form.nivel_de_dolor, 10),
      }

      const res = await fetch(API_URL(patientId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errores) {
          setFormError(Object.values(data.errores) as string[])
        } else if (data.campos_faltantes) {
          setFormError(data.campos_faltantes as string[])
        } else if (data.errors) {
          setFormError(Object.values(data.errors) as string[])
        } else {
          setFormError(data.message || 'Error al registrar signos vitales')
        }
        return
      }

      setFormSuccess(data.message || 'Signos vitales registrados exitosamente')
      setForm(initialForm)
      setTimeout(() => navigate('/'), 2600)
    } catch {
      setFormError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, formError, formSuccess, handleChange, handleSubmit }
}
