import { useState, useEffect } from 'react'

export function useRegisterPacient() {
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

  const notifySuccess = () => setSubmitted(true)

  return {
    submitted,
    visible,
    notifySuccess,
  }
}
