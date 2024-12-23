import { createTheme, ThemeProvider } from "@mui/material"
import { AuthProvider } from "./context/AuthProvider"
import { Route, Routes } from "react-router"
import CssBaseline from "@mui/material/CssBaseline"
import AppLayout from "./layouts/AppLayout"
import Home from "./components/Home"
import MyRoster from "./components/MyRoster"
import AuthGuard from "./guards/AuthGuard"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
            <Route
              path='/my-roster'
              element={
                <AuthGuard>
                  <MyRoster />
                </AuthGuard>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
