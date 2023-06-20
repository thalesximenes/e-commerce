import axios from 'axios'
import { IRegister, ISignIn } from '../types/User'
import { IUserLoggedIn } from '../types/User'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

interface Temp {
  data: any
}

type User = {
  id: string
  email: string
  name: string
  address: string
  role: string
}

type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export const registerService = (payload: IRegister) => {
  return api.post<IUserLoggedIn>('user', payload).then((res: Temp) => res.data)
}

export const loginService = (payload: ISignIn): Promise<LoginResponse> => {
  return api.post<IUserLoggedIn>('login', payload).then((res: Temp) => res.data)
}

export const signOutService = (refreshToken: string, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api
    .post('logout', { refreshToken }, config)
    .then((res: Temp) => res.data)
}

type UserUpdate = Omit<User, 'id' | 'role'>

export const updateUserService = (payload: UserUpdate, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.patch('user', payload, config).then((res: Temp) => res.data)
}

export const deleteUserService = (payload: string, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      currentPassword: payload,
    },
  }

  return api.delete('user', config).then((res: Temp) => res.data)
}

export const productListService = (accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.get('product/findAll', config).then((res: Temp) => res.data)
}

export const categoryListService = (accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.get('category', config).then((res: Temp) => res.data)
}

export const addCategoryService = (payload: string, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.post('category', { name: payload }, config)
}

export default api
