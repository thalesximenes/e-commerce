import { User } from '../pages/Register'

interface IStore {
  get: () => any
  set: (val: any) => void
  destroy: () => void
}

export const persistUser = (): IStore => {
  const key = 'ecommerce:user'
  return {
    set: (val: User) => {
      localStorage.setItem(key, JSON.stringify(val))
    },
    get: (): User => {
      const storedData = localStorage.getItem(key)
      return storedData ? JSON.parse(storedData) : null
    },
    destroy: () => {
      localStorage.removeItem(key)
    },
  }
}

export const persistToken = (): IStore => {
  const key = 'ecommerce:token'
  return {
    set: (val: string) => {
      localStorage.setItem(key, val)
    },
    get: () => localStorage.getItem(key),
    destroy: () => {
      localStorage.removeItem(key)
    },
  }
}
