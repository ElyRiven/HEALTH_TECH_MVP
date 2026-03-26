import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type React from 'react'
import type { UseFormRegisterVitals, VitalsForm } from './types'
import { API_URL, initialForm, NIVEL_CONCIENCIA_OPTIONS } from './data'

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

    const fieldErrors: Partial<Record<keyof VitalsForm, string>> = {}

    // frecuencia_cardiaca: entero, 20-300
    const fc = form.frecuencia_cardiaca.trim()
    if (!fc) {
      fieldErrors.frecuencia_cardiaca = 'Frecuencia cardíaca: campo requerido'
    } else if (!/^\d+$/.test(fc)) {
      fieldErrors.frecuencia_cardiaca = 'Frecuencia cardíaca: debe ser un número entero (sin decimales)'
    } else {
      const val = parseInt(fc, 10)
      if (val < 20 || val > 300)
        fieldErrors.frecuencia_cardiaca = 'Frecuencia cardíaca: debe estar entre 20 y 300 bpm'
    }

    // frecuencia_respiratoria: entero, 1-60
    const fr = form.frecuencia_respiratoria.trim()
    if (!fr) {
      fieldErrors.frecuencia_respiratoria = 'Frecuencia respiratoria: campo requerido'
    } else if (!/^\d+$/.test(fr)) {
      fieldErrors.frecuencia_respiratoria = 'Frecuencia respiratoria: debe ser un número entero (sin decimales)'
    } else {
      const val = parseInt(fr, 10)
      if (val < 1 || val > 60)
        fieldErrors.frecuencia_respiratoria = 'Frecuencia respiratoria: debe estar entre 1 y 60 rpm'
    }

    // saturacion_o2: decimal (máx 1 decimal), 50-100
    const so2 = form.saturacion_o2.trim()
    if (!so2) {
      fieldErrors.saturacion_o2 = 'Saturación O2: campo requerido'
    } else if (!/^\d+(\.\d)?$/.test(so2)) {
      fieldErrors.saturacion_o2 = 'Saturación O2: admite como máximo un decimal (ej: 98.5)'
    } else {
      const val = parseFloat(so2)
      if (val < 50 || val > 100)
        fieldErrors.saturacion_o2 = 'Saturación O2: debe estar entre 50.0 y 100.0 %'
    }

    // temperatura: decimal (máx 1 decimal), 25-45
    const temp = form.temperatura.trim()
    if (!temp) {
      fieldErrors.temperatura = 'Temperatura: campo requerido'
    } else if (!/^\d+(\.\d)?$/.test(temp)) {
      fieldErrors.temperatura = 'Temperatura: admite como máximo un decimal (ej: 36.5)'
    } else {
      const val = parseFloat(temp)
      if (val < 25 || val > 45)
        fieldErrors.temperatura = 'Temperatura: debe estar entre 25.0 y 45.0 °C'
    }

    // presion: formato ddd/ddd, sistólica 50-300, diastólica 20-200, diastólica < sistólica
    const presion = form.presion.trim()
    if (!presion) {
      fieldErrors.presion = 'Presión arterial: campo requerido'
    } else if (!/^\d{2,3}\/\d{2,3}$/.test(presion)) {
      fieldErrors.presion = "Presión arterial: formato inválido. Use 'sistólica/diastólica' con 2-3 dígitos (ej: 120/80)"
    } else {
      const [sistolicaStr, diastolicaStr] = presion.split('/')
      const sistolica = parseInt(sistolicaStr, 10)
      const diastolica = parseInt(diastolicaStr, 10)
      if (sistolica < 50 || sistolica > 300) {
        fieldErrors.presion = 'Presión arterial: la sistólica debe estar entre 50 y 300 mmHg'
      } else if (diastolica < 20 || diastolica > 200) {
        fieldErrors.presion = 'Presión arterial: la diastólica debe estar entre 20 y 200 mmHg'
      } else if (diastolica >= sistolica) {
        fieldErrors.presion = 'Presión arterial: la diastólica debe ser menor que la sistólica'
      }
    }

    // nivel_de_conciencia: uno de los valores permitidos
    if (!NIVEL_CONCIENCIA_OPTIONS.includes(form.nivel_de_conciencia)) {
      fieldErrors.nivel_de_conciencia = `Nivel de conciencia: valor inválido`
    }

    // nivel_de_dolor: entero 0-10; debe ser 0 si nivel_de_conciencia es 'Sin respuesta'
    const ndolor = form.nivel_de_dolor.trim()
    if (ndolor === '') {
      fieldErrors.nivel_de_dolor = 'Nivel de dolor: campo requerido'
    } else if (!/^\d+$/.test(ndolor)) {
      fieldErrors.nivel_de_dolor = 'Nivel de dolor: debe ser un número entero'
    } else {
      const val = parseInt(ndolor, 10)
      if (val < 0 || val > 10) {
        fieldErrors.nivel_de_dolor = 'Nivel de dolor: debe estar entre 0 y 10 (escala EVA)'
      } else if (form.nivel_de_conciencia === 'Sin respuesta' && val !== 0) {
        fieldErrors.nivel_de_dolor = "Nivel de dolor: debe ser 0 cuando el nivel de conciencia es 'Sin respuesta'"
      }
    }

    const clientErrors = Object.values(fieldErrors)
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
