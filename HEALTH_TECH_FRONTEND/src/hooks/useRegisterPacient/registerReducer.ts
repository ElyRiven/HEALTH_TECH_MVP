
import {  initialForm } from '../useFormRegisterPacient/data';
import type { State,Action } from './types';

export const initialState: State = {
  form: initialForm,
  loading: false,
  error: null,
};

export function registerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, form: action.payload };
    case 'UPDATE_FIELD':
      return { ...state, form: { ...state.form, [action.name]: action.value } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_FORM':
      return { ...state, form: initialForm };
    default:
      return state;
  }
}