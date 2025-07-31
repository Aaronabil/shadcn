import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = !!localStorage.getItem("token") // atau cek state auth kamu
  return isLoggedIn ? children : <Navigate to="/login" replace />
}