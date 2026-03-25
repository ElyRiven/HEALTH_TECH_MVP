import { useState, useEffect, useReducer } from 'react'
import type { PacientForm } from '../useFormRegisterPacient/types'
import { API_URL } from '../useFormRegisterPacient/data';
import { registerReducer, initialState } from './registerReducer';

export function useRegisterPacient() {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!submitted) return
    setVisible(true)
    const fadeOut = setTimeout(() => setVisible(false), 2000)
    const remove = setTimeout(() => setSubmitted(false), 2500)
    return () => {
      clearTimeout(fadeOut)
      clearTimeout(remove)
    }
  }, [submitted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: 'UPDATE_FIELD', name: e.target.name as keyof PacientForm, value: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const body = {
        identificacion: Number(state.form.identificacion),
        nombres: state.form.nombres,
        apellidos: state.form.apellidos,
        fecha_de_nacimiento: state.form.fecha_de_nacimiento,
        genero: state.form.genero,
        criticidad: 1,
        estado: 'En espera',
      };

      

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: 'SET_ERROR', payload: data.message || 'Error al registrar paciente' });
        return;
      }

      dispatch({ type: 'RESET_FORM' });
      setSubmitted(true);
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'No se pudo conectar con el servidor' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    form: state.form,
    loading: state.loading,
    error: state.error,
    handleChange,
    handleSubmit,
    submitted,
    visible,
  }
}
