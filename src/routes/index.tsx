import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Admin from '../pages/Admin/Admin'
import Profile from '../pages/Profile'
import { AuthProvider } from '../contexts/auth'

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/adm" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
