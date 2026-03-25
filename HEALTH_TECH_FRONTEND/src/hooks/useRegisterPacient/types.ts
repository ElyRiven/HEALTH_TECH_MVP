import type { PacientForm } from '../useFormRegisterPacient/types';

export type State = {
  form: PacientForm;
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: 'SET_FORM'; payload: PacientForm }
  | { type: 'UPDATE_FIELD'; name: keyof PacientForm; value: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_FORM' };