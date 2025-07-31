import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Dashboard from "@/app/dashboard/page"
import { ThemeProvider } from "@/components/theme-provider"
import { ProtectedRoute } from "@/app/dashboard/authpage"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { supabase } from "@/lib/supabase"

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  )
}
