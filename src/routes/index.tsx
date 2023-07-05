import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Admin from '../pages/Admin/Admin'
import Profile from '../pages/Profile'
import { AuthProvider } from '../contexts/auth'
import PrivateRoute from './private.routes'
import { ProductsProvider } from '../contexts/products'
import { OrdersProvider } from '../contexts/order'

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrdersProvider>
          <ProductsProvider>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/adm"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ProductsProvider>
        </OrdersProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
