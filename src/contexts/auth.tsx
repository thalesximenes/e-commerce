import React, { useCallback, useContext, useState, useEffect } from 'react'
import { persistToken, persistUser } from '../utils/storage'
import { loginService, signOutService } from '../services/api'
import {
  ISignIn,
  AuthProviderProps,
  AuthContextData,
  AuthState,
} from '../types/auth_d'
import { User } from '../pages/Register'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
)

const initialState: AuthState = {
  user: null,
  isSessionExpired: false,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(() => ({} as AuthState))
  const [loading, setLoading] = useState(false)
  const [refreshToken, setRefreshToken] = useState<string>()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('ecommerce:token')

  console.log('STATE', state)

  useEffect(() => {
    const user = persistUser().get()
    if (user) processLogin(user)
  }, [])

  const processLogin = (user: User) => {
    setState({ user, isSessionExpired: false })
  }

  const processLogout = () => {
    setState(initialState)
    setRefreshToken('')
  }

  const dispatchLogin = useCallback(
    async ({ email, password }: ISignIn) => {
      try {
        setLoading(true)

        const { user, accessToken, refreshToken } = await loginService({
          email,
          password,
        })
        persistUser().set(user)
        persistToken().set(accessToken)
        setRefreshToken(refreshToken)

        setTimeout(() => {
          processLogin(user)
          setLoading(false)
        }, 2000)
        if (user.role === 'ADMIN') {
          navigate('/adm')
        } else {
          navigate('/')
        }
      } catch (e) {
        setLoading(false)
        toast('E-mail ou senha incorretos')
      }
    },
    [navigate]
  )

  const dispatchLogout = useCallback(async () => {
    try {
      await signOutService(refreshToken, accessToken)
      persistUser().destroy()
      persistToken().destroy()
    } catch {
      console.log('error')
    } finally {
      processLogout()
      navigate('/login')
    }
  }, [navigate])

  return (
    <AuthContext.Provider
      value={[
        state,
        {
          loading,
          dispatchLogin,
          dispatchLogout,
        },
      ]}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextData {
  return useContext(AuthContext)
}
