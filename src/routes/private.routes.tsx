import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/auth'

const PrivateRoute = ({ children }: any) => {
  const [state] = useAuthContext()
  const isAuthenticated = !!state.user

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

export default PrivateRoute
