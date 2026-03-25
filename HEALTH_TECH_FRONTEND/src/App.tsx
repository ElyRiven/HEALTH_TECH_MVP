
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegisterSuccess'
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/register/:id', element: <RegisterSuccess /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
