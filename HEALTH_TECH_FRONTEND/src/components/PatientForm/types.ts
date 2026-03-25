export interface PatientFormProps {
  onSuccess?: (e: React.FormEvent<HTMLFormElement>) => void
  onError?: (message: string) => void
}