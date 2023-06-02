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

const initialTokens = {
  accessToken: '',
  refreshToken: '',
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(() => ({} as AuthState))
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState(initialTokens)
  const navigate = useNavigate()

  useEffect(() => {
    const user = persistUser().get()
    if (user) processLogin(user)
  }, [])

  const processLogin = (user: User) => {
    setState({ user, isSessionExpired: false })
  }

  const processLogout = () => {
    setState(initialState)
    setTokens(initialTokens)
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
        setTokens({ accessToken, refreshToken })

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
      await signOutService(tokens.refreshToken, tokens.accessToken)
      persistUser().destroy()
      persistToken().destroy()
    } catch {
      console.log('error')
    } finally {
      processLogout()
      navigate('/login')
    }
  }, [navigate, tokens.accessToken, tokens.refreshToken])

  return (
    <AuthContext.Provider
      value={[
        state,
        {
          loading,
          dispatchLogin,
          dispatchLogout,
          tokens,
          processLogin,
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
