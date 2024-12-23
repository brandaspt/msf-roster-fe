import { createContext, useState, useEffect, useContext } from "react"
import { getMe } from "../api"
import { PlayerCard } from "../types"

type AuthContextType = {
  user: PlayerCard | null
}

const AuthContext = createContext<AuthContextType>(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<PlayerCard>({
    frame: "",
    name: "",
    icon: ""
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe()
        setUser(user)
      } catch (error) {
        setUser(null)
        console.error("Error fetching user:", error)
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
