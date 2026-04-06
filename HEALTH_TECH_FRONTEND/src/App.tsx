import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
  Navigate,
} from "react-router-dom";
import { API_BASE_URL } from "./config/api";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RegisterVitals from "./pages/RegisterVitals";
import Header from "./components/Header";
import "./App.css";

function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 min-h-screen bg-main-white-back">
        <Outlet />
      </div>
    </>
  );
}

async function patientLoader({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const { id } = params;
  if (!id || !/^[A-Z0-9]{10}$/.test(id)) return redirect("/dashboard");
  const res = await fetch(`${API_BASE_URL}/api/v1/pacients/${id}`);
  if (!res.ok) return redirect("/dashboard");
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "register", element: <Register /> },
      {
        path: "register/:id",
        element: <RegisterVitals />,
        loader: patientLoader,
      },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
