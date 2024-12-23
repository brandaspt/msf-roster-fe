import { Box, Container } from "@mui/material"
import MyAppBar from "../components/MyAppBar"
import { Outlet } from "react-router"

const AppLayout = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <MyAppBar />
      <Container>
        <Outlet />
      </Container>
    </Box>
  )
}

export default AppLayout
