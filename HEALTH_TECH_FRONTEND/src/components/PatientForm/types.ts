
export interface PatientFormProps {
  onSuccess?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  onError?: (msg: string | string[]) => void
}