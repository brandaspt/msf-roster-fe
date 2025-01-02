import { Box, Button, Typography } from "@mui/material"
import { enVars } from "../config"
import { useAuth } from "../context/AuthProvider"
import PlayerAvatar from "./PlayerAvatar"

const LoginButton = () => {
  const { user } = useAuth()

  const handleLogin = () => {
    window.location.href = `${enVars.BACKEND_ROOT_URL}/auth/login`
  }

  return user ? (
    <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
      <Typography variant='body1' sx={{ ml: 2 }}>
        Welcome {user.name}
      </Typography>
      <PlayerAvatar user={user} />
    </Box>
  ) : (
    <Button onClick={handleLogin}>Login with Scopely</Button>
  )
}

export default LoginButton
