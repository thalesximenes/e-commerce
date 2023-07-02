import axios from 'axios'
import { IRegister, ISignIn } from '../types/User'
import { IUserLoggedIn } from '../types/User'
import { IProduct } from '../types/products'

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

export const productListService = () => {
  return api.get('product').then((res: Temp) => res.data)
}

export const addProductService = (payload: IProduct, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.post(
    'product',
    {
      ...payload,
      basePrice: +payload.basePrice,
      stock: +payload.stock,
      discountPercentage: 0,
    },
    config
  )
}

export const updateProductService = (
  payload: IProduct,
  accessToken: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.patch(
    `product/${payload.id}`,
    {
      ...payload,
      id: undefined,
      createdAt: undefined,
      urlName: undefined,
      basePrice: +payload.basePrice,
    },
    config
  )
}

export const deleteProductService = (payload: string, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.delete(`product/${payload}`, config)
}

export const categoryListService = () => {
  return api.get('category').then((res: Temp) => res.data)
}

export const addCategoryService = (payload: string, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.post('category', { name: payload }, config)
}

export const updateCategoryService = (
  id: string,
  name: string,
  accessToken: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.patch(`category/${id}`, { name: name }, config)
}

export const deleteCategoryService = (payload: string, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  return api.delete(`category/${payload}`, config)
}

export default api
