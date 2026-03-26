import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResponseAlert from '../components/ResponseAlert'

type DashboardLocationState = {
  alertMsg?: string | string[]
  alertVariant?: 'success' | 'error'
}

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const locationState = location.state as DashboardLocationState | null
  const [alertMsg, setAlertMsg] = useState<string | string[] | null>(null)
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success')
  const [alertKey, setAlertKey] = useState(0)

  useEffect(() => {
    if (!locationState?.alertMsg) return

    setAlertMsg(locationState.alertMsg)
    setAlertVariant(locationState.alertVariant ?? 'success')
    setAlertKey(currentKey => currentKey + 1)
    navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, locationState, navigate])

  return (
    <main className="relative min-h-screen py-10">
      {alertMsg && (
        <div className="absolute top-4 right-4 w-80 z-10">
          <ResponseAlert key={alertKey} message={alertMsg} variant={alertVariant} />
        </div>
      )}
      <h1>Dashboard</h1>
    </main>
  )
}
