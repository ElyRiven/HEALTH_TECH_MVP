export type VitalSignsFormProps = {
  patientId: string
  onSuccess?: (message: string) => void
  onError?: (error: string | string[]) => void
}
