import { describe, it, expect } from 'vitest'
import { registerReducer, initialState } from '../../hooks/useRegisterPacient/registerReducer'
import { initialForm } from '../../hooks/useFormRegisterPacient/data'

describe('registerReducer', () => {
  it('returns current state for unknown action', () => {
    // @ts-expect-error intentional unknown action
    const result = registerReducer(initialState, { type: 'UNKNOWN_ACTION' })
    expect(result).toEqual(initialState)
  })

  it('handles SET_FORM', () => {
    const newForm = { ...initialForm, nombres: 'Juan', apellidos: 'Perez' }
    const result = registerReducer(initialState, { type: 'SET_FORM', payload: newForm })
    expect(result.form.nombres).toBe('Juan')
    expect(result.form.apellidos).toBe('Perez')
  })

  it('handles UPDATE_FIELD', () => {
    const result = registerReducer(initialState, {
      type: 'UPDATE_FIELD',
      name: 'apellidos',
      value: 'Garcia',
    })
    expect(result.form.apellidos).toBe('Garcia')
  })

  it('handles UPDATE_FIELD for identificacion', () => {
    const result = registerReducer(initialState, {
      type: 'UPDATE_FIELD',
      name: 'identificacion',
      value: '12345',
    })
    expect(result.form.identificacion).toBe('12345')
  })

  it('handles SET_LOADING true', () => {
    const result = registerReducer(initialState, { type: 'SET_LOADING', payload: true })
    expect(result.loading).toBe(true)
  })

  it('handles SET_LOADING false', () => {
    const withLoading = { ...initialState, loading: true }
    const result = registerReducer(withLoading, { type: 'SET_LOADING', payload: false })
    expect(result.loading).toBe(false)
  })

  it('handles SET_ERROR with a message', () => {
    const result = registerReducer(initialState, { type: 'SET_ERROR', payload: 'Something went wrong' })
    expect(result.error).toBe('Something went wrong')
  })

  it('handles SET_ERROR null', () => {
    const withError = { ...initialState, error: 'some error' }
    const result = registerReducer(withError, { type: 'SET_ERROR', payload: null })
    expect(result.error).toBeNull()
  })

  it('handles RESET_FORM', () => {
    const modified = {
      ...initialState,
      form: { ...initialForm, nombres: 'Modified', apellidos: 'Form' },
    }
    const result = registerReducer(modified, { type: 'RESET_FORM' })
    expect(result.form).toEqual(initialForm)
  })

  it('initialState has correct shape', () => {
    expect(initialState.form).toEqual(initialForm)
    expect(initialState.loading).toBe(false)
    expect(initialState.error).toBeNull()
  })
})
