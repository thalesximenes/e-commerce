import { ReactNode } from 'react'

export interface IProduct {
  id: string | undefined
  name: string | undefined
  picture: string | undefined
  urlName: string | undefined
  basePrice: string | number
  stock: string | number
  categories: any[] | undefined
  description: string | undefined
  amount: number
}

export interface ICategory {
  id: string
  name: string
  description: string
}

export interface ProductsDispatch {
  loading: boolean
  productsList: IProduct[] | undefined
  dispatchProductList: (payload: any) => Promise<void>
  dispatchAddProduct: (payload: IProduct, token: string) => Promise<void>
  dispatchUpdateProduct: (payload: IProduct, token: string) => Promise<void>
  dispatchDeleteProduct: (id: string, token: string) => Promise<void>
  categoryList: ICategory[] | undefined
  dispatchCategoryList: (payload: any) => Promise<void>
  dispatchAddCategory: (name: string, payload: any) => Promise<void>
  dispatchDeleteCategory: (id: string, token: any) => Promise<void>
  dispatchUpdateCategory: (
    id: string,
    name: string,
    token: any
  ) => Promise<void>
}

export type ProductContextData = [ProductsDispatch]

export interface ProductsProviderProps {
  children: ReactNode
}
