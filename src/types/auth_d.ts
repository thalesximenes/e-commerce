import { ReactNode } from 'react'
import { User } from '../pages/Register'

export interface ISignIn {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isSessionExpired: boolean
}

export interface AuthDispatch {
  loading: boolean
  dispatchLogin: (payload: ISignIn) => Promise<void>
  dispatchLogout: () => Promise<void>
}

export type AuthContextData = [AuthState, AuthDispatch]

export interface AuthProviderProps {
  children: ReactNode
}

export interface IToken {
  token: string
}
