import React, { ReactNode } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { useAuthContext } from '../contexts/auth'
import Home from '../pages/Home/Home'

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  path?: string
  element: ReactNode
  // React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
}: PrivateRouteProps) => {
  const [{ user }] = useAuthContext()
  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Route path="/" element={<Home />} />
  )
}

export default PrivateRoute
