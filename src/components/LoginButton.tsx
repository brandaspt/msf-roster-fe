import { Box, Button, Typography } from "@mui/material"
import { useAuth } from "../context/AuthProvider"
import PlayerAvatar from "./PlayerAvatar"
import { enVars } from "../config"

const LoginButton = () => {
  const { user } = useAuth()

  const handleLogin = () => {
    window.location.href = `${enVars.BACKEND_ROOT_URL}/login`
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
