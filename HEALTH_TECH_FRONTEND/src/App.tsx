import { createBrowserRouter, RouterProvider, Outlet, redirect } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import RegisterVitals from './pages/RegisterVitals'
import Header from './components/Header'
import './App.css'

function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 min-h-screen bg-main-white-back">
        <Outlet />
      </div>
    </>
  )
}

async function patientLoader({ params }: { params: Record<string, string | undefined> }) {
  const { id } = params
  if (!id || !/^\d+$/.test(id)) return redirect('/')
  const res = await fetch(`http://localhost:3000/api/v1/pacients/${id}`)
  if (!res.ok) return redirect('/')
  return null
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'register', element: <Register /> },
      { path: 'register/:id', element: <RegisterVitals />, loader: patientLoader },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
