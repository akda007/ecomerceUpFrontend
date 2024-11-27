import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthenticationContext"


export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}