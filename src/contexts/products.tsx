import React, { useCallback, useContext, useState } from 'react'
import {
  ICategory,
  IProduct,
  ProductContextData,
  ProductsProviderProps,
} from '../types/products'
import {
  addCategoryService,
  categoryListService,
  productListService,
} from '../services/api'
import { toast } from 'react-toastify'

export const ProductContext = React.createContext<ProductContextData>(
  {} as ProductContextData
)

const initialState = {
  productsList: [],
  categoryList: [],
  loading: false,
}

const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}: ProductsProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [productsList, setProductsList] = useState<IProduct[]>()
  const [categoryList, setCategoryList] = useState<ICategory[]>()

  const dispatchProductList = useCallback(async (tokens: any) => {
    try {
      setLoading(true)

      const data = await productListService(tokens.accessToken)

      setProductsList(data)

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setProductsList(initialState.productsList)
      setLoading(false)
      //toast('Falha ao resgatar lista de produtos.')
    }
  }, [])

  const dispatchCategoryList = useCallback(async (tokens: any) => {
    try {
      setLoading(true)

      const data: any = await categoryListService(tokens.accessToken)

      setCategoryList(data)

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setCategoryList(initialState.categoryList)
      setLoading(false)
      //toast('Falha ao resgatar lista de produtos.')
    }
  }, [])

  const dispatchAddCategory = useCallback(async (name: string, token: any) => {
    try {
      setLoading(true)

      const data = await addCategoryService(name, token)
      console.log(data)

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setLoading(false)
      console.log(e)
      //toast('Falha ao resgatar lista de produtos.')
    }
  }, [])

  return (
    <ProductContext.Provider
      value={[
        {
          loading,
          dispatchProductList,
          dispatchCategoryList,
          dispatchAddCategory,
          categoryList,
          productsList,
        },
      ]}
    >
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = (): ProductContextData => useContext(ProductContext)

export { ProductsProvider, useProductContext }
