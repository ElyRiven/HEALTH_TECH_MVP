import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PacientForm, UseFormRegisterPacient } from './types'
import type React from 'react'
import { API_URL, initialForm } from './data'

export function useFormRegisterPacient(onSuccess?: (e: React.FormEvent<HTMLFormElement>) => void): UseFormRegisterPacient {
  const navigate = useNavigate()
  const [form, setForm] = useState<PacientForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | string[] | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault()
      setFormError('La identificacion debe ser un valor numérico')
    } else {
      setFormError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    const clientErrors: string[] = []

    if (!form.identificacion || form.identificacion === '0') {
      clientErrors.push('Lo siento, debes escribir la identificación del paciente')
    } else if (!/^\d+$/.test(form.identificacion)) {
      clientErrors.push('La identificación debe ser un valor numérico')
    }
    if (!form.nombres.trim()) {
      clientErrors.push('Lo siento, debes escribir los nombres del paciente')
    }
    if (!form.apellidos.trim()) {
      clientErrors.push('Lo siento, debes escribir los apellidos del paciente')
    }
    if (!form.fecha_de_nacimiento) {
      clientErrors.push('Lo siento, debes escribir la fecha de nacimiento del paciente')
    }
    if (!form.genero) {
      clientErrors.push('Lo siento, debes seleccionar el género del paciente')
    }

    if (clientErrors.length > 0) {
      setFormError(clientErrors)
      return
    }

    setLoading(true)

    try {
      const body = {
        identificacion: Number(form.identificacion),
        nombres: form.nombres,
        apellidos: form.apellidos,
        fecha_de_nacimiento: form.fecha_de_nacimiento,
        genero: form.genero,
        estado: 'En espera',
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          setFormError(Object.values(data.errors) as string[])
        } else {
          setFormError(data.message || 'Error al registrar paciente')
        }
        return
      }

      setForm(initialForm)
      if (typeof onSuccess === 'function') {
        onSuccess(e)
      }
      navigate(`/register/${form.identificacion}`)
    } catch {
      setFormError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, formError, handleChange, handleKeyDown, handleSubmit }
}
