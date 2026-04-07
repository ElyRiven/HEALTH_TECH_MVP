import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PacientForm, UseFormRegisterPacient } from './types'
import type React from 'react'
import { API_URL, initialForm } from './data'

export function useFormRegisterPacient(
  onSuccess?: (e: React.FormEvent<HTMLFormElement>) => void,
  onError?: (msg: string | string[]) => void,
): UseFormRegisterPacient {
  const navigate = useNavigate()
  const [form, setForm] = useState<PacientForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | string[] | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'identificacion') {
      setForm({ ...form, identificacion: value.toUpperCase() })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
    if (!allowed.includes(e.key) && !/^[A-Z0-9a-z]$/.test(e.key)) {
      e.preventDefault()
      const msg = 'La identificación solo puede contener números y letras'
      setFormError(msg)
      onError?.(msg)
    } else {
      setFormError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    const clientErrors: string[] = []

    if (!form.identificacion) {
      clientErrors.push('Lo siento, debes escribir la identificación del paciente')
    } else if (form.identificacion.length !== 10) {
      clientErrors.push('El parámetro pacientId debe tener 10 caracteres')
    } else if (!/^[A-Z0-9]+$/.test(form.identificacion)) {
      clientErrors.push('El parámetro pacientId debe contener solo números y letras mayúsculas')
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
      onError?.(clientErrors)
      return
    }

    setLoading(true)

    try {
      const body = {
        identificacion: form.identificacion,
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
          const msgs = Object.values(data.errors) as string[]
          setFormError(msgs)
          onError?.(msgs)
        } else {
          const msg = data.message || 'Error al registrar paciente'
          setFormError(msg)
          onError?.(msg)
        }
        return
      }

      setForm(initialForm)
      if (typeof onSuccess === 'function') {
        onSuccess(e)
      }
      navigate(`/register/${form.identificacion}`, { state: { fromRegistration: true } })
    } catch {
      const msg = 'No se pudo conectar con el servidor'
      setFormError(msg)
      onError?.(msg)
    } finally {
      setLoading(false)
    }
  }


  return { form, loading, formError, handleChange, handleKeyDown, handleSubmit }
}
