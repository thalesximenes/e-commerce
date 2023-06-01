export interface ISignIn {
  email: string
  password: string
}

export type IRegister = {
  email?: string
  password?: string
  name?: string
  address?: string
}

export interface IUser {
  id: number
  name: string
  email: string
  address: string
}

export interface IUserLoggedIn {
  user: IUser
}
