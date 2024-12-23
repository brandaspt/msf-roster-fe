import { AppBar, Box, Button, Container, Toolbar } from "@mui/material"
import LoginButton from "./LoginButton"

const MyAppBar = () => (
  <AppBar position='static' sx={{ marginBottom: 1 }}>
    <Container maxWidth='xl'>
      <Toolbar disableGutters>
        <Box flexGrow={1}>
          <Button href='/'>Home</Button>
          <Button href='/my-roster'>My Roster</Button>
        </Box>
        <Box flexGrow={0}>
          <LoginButton />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
)

export default MyAppBar
