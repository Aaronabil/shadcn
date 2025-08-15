import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Dashboard from "@/app/dashboard/page"
import { ProtectedRoute } from "@/app/dashboard/authpage"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { supabase } from "@/lib/supabase"
import { useEffect } from "react"
import { ForgotPassForm } from "@/components/auth/forgotpass-form"
import { UpdatePassForm } from "@/components/auth/updatepass-form"

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session && (location.pathname === "/login" || location.pathname === "/register")) {
        navigate("/", { replace: true })
      }
    }
    checkSession()
  }, [location.pathname, navigate])

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <RegisterForm />
            </div>
          </div>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <ForgotPassForm />
            </div>
          </div>
        }
      />
      <Route
        path="/update-password"
        element={
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <UpdatePassForm />
            </div>
          </div>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
