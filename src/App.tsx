import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Dashboard from "@/app/dashboard/page"
import Course from "@/app/dashboard/course"
import Assigment from "@/app/dashboard/assigment"
import Certificate from "@/app/dashboard/certificate"
import { ProtectedRoute } from "@/app/dashboard/authpage"
import { StudentLoginForm } from "@/components/auth/student-login-form"
import { LecturerLoginForm } from "@/components/auth/lecturer-login-form"
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
      if (session && (location.pathname === "/student/login" || location.pathname === "/lecturer/login" || location.pathname === "/register")) {
        navigate("/dashboard", { replace: true })
      }
    }
    checkSession()
  }, [location.pathname, navigate])

  return (
    <Routes>
      <Route
        path="/student/login"
        element={
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <StudentLoginForm />
            </div>
          </div>
        }
      />
      <Route
        path="/lecturer/login"
        element={
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <LecturerLoginForm />
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
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <Assigment />
          </ProtectedRoute>
        }
      /><Route
        path="/certificates"
        element={
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        }
      />
    </Routes>
    
  )
}
