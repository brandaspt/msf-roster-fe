import { useAuth } from "../context/AuthProvider"
import { enVars } from "../config"

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth() // Use your auth context or hook

  if (!user) {
    // Redirect to login with the current path as the return URL
    window.location.href = `${enVars.BACKEND_ROOT_URL}/login`
    return null // Prevent rendering the protected content while redirecting
  }

  return children
}

export default AuthGuard
