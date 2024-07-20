import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Home from "./pages/Home/Home"
import Post from "./pages/Post/Post"
import Profile from "./pages/Profile/Profile"
import { Box } from "@mui/material"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { useSelector } from "react-redux"
import Popular from "./pages/Popular/Popular"

function App() {
  const isAuth = useSelector(state => state.authReducer.userIsExist);

  return (
    <>
      {!isAuth ? ( 
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Dashboard />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/popular" element={<Popular />} />
          </Routes>
        </Box>
      )}  
    </>
  )
}

export default App