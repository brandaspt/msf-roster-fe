import { enVars } from "../config"
import { useAuth } from "../context/AuthProvider"

const AuthGuard = ({ children }) => {
  const { user } = useAuth() // Use your auth context or hook

  if (!user) {
    // Redirect to login with the current path as the return URL
    window.location.href = `${enVars.BACKEND_ROOT_URL}/auth/login`
    return null // Prevent rendering the protected content while redirecting
  }

  return children
}

export default AuthGuard
