import { Box } from "@mui/material"
import MyAppBar from "../components/MyAppBar"
import { Outlet } from "react-router"

const AppLayout = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <MyAppBar />
      <Box padding={2}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout
