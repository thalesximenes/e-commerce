import { ReactNode } from 'react'

export interface IProduct {
  name: string
  picture: string
  urlName: string
  basePrice: string | number
  stock: number
  description: string
}

export interface ICategory {
  id: string
  name: string
  description: string
}

export interface ProductsDispatch {
  loading: boolean
  productsList: IProduct[] | undefined
  categoryList: ICategory[] | undefined
  dispatchProductList: (payload: any) => Promise<void>
  dispatchCategoryList: (payload: any) => Promise<void>
}

export type ProductContextData = [ProductsDispatch]

export interface ProductsProviderProps {
  children: ReactNode
}
