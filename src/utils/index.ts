import { User } from '../pages/Register'

export const isObjectComplete = (object: User) => {
  const keys = Object.keys(object)
  for (let i = 0; i < keys.length; i++) {
    const chave = keys[i]
    if (object[chave] === '') {
      return false
    }
  }
  return true
}
