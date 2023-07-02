import React, { useCallback, useContext, useState } from 'react'
import {
  ICategory,
  IProduct,
  ProductContextData,
  ProductsProviderProps,
} from '../types/products'
import {
  addCategoryService,
  addProductService,
  categoryListService,
  deleteCategoryService,
  deleteProductService,
  productListService,
  updateCategoryService,
  updateProductService,
} from '../services/api'
import { ToastContainer, toast } from 'react-toastify'

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
  const [categoryList, setCategoryList] = useState<ICategory[]>([])

  const dispatchProductList = useCallback(async (tokens: any) => {
    try {
      setLoading(true)

      const data = await productListService()

      setProductsList(data)

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setProductsList(initialState.productsList)
      setLoading(false)
      console.log(e)
      toast('Falha ao resgatar lista de produtos.')
    }
  }, [])

  const dispatchAddProduct = useCallback(
    async (payload: IProduct, token: any) => {
      try {
        setLoading(true)

        const data = await addProductService(payload, token)
        console.log(data)

        setTimeout(() => {
          setLoading(false)
        }, 2000)
      } catch (e) {
        setLoading(false)
        console.log(e)
        toast('Falha ao adicionar produto.')
      } finally {
        dispatchProductList(token)
      }
    },
    []
  )

  const dispatchUpdateProduct = useCallback(
    async (payload: IProduct, token: any) => {
      try {
        setLoading(true)

        const data = await updateProductService(payload, token)
        console.log(data)

        setTimeout(() => {
          setLoading(false)
        }, 2000)
      } catch (e) {
        setLoading(false)
        console.log(e)
        toast('Falha ao atualizar produto.')
      } finally {
        dispatchProductList(token)
      }
    },
    []
  )

  const dispatchDeleteProduct = useCallback(async (id: string, token: any) => {
    try {
      setLoading(true)

      const data = await deleteProductService(id, token)
      console.log(data)

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setLoading(false)
      console.log(e)
      toast('Falha ao deletar produtos.')
    } finally {
      dispatchProductList(token)
    }
  }, [])

  const dispatchCategoryList = useCallback(async (tokens: any) => {
    try {
      setLoading(true)

      const data: any = await categoryListService(tokens.accessToken)

      setCategoryList([...categoryList, ...data])

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setCategoryList(initialState.categoryList)
      setLoading(false)
      toast('Falha ao resgatar lista de categorias.')
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
      toast('Falha ao resgatar adicionar categoria.')
    } finally {
      dispatchCategoryList(token)
    }
  }, [])

  const dispatchUpdateCategory = useCallback(
    async (id: string, name: string, token: any) => {
      try {
        setLoading(true)

        const data = await updateCategoryService(id, name, token)
        console.log(data)

        setTimeout(() => {
          setLoading(false)
        }, 2000)
      } catch (e) {
        setLoading(false)
        console.log(e)
        toast('Falha ao atualizar categoria.')
      } finally {
        dispatchCategoryList(token)
      }
    },
    []
  )

  const dispatchDeleteCategory = useCallback(async (id: string, token: any) => {
    try {
      setLoading(true)

      const data = await deleteCategoryService(id, token)
      console.log(data)

      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } catch (e) {
      setLoading(false)
      console.log(e)
      //toast('Falha ao resgatar lista de produtos.')
    } finally {
      dispatchCategoryList(token)
    }
  }, [])

  return (
    <>
      <ProductContext.Provider
        value={[
          {
            loading,
            productsList,
            dispatchProductList,
            dispatchAddProduct,
            dispatchUpdateProduct,
            dispatchDeleteProduct,
            categoryList,
            dispatchCategoryList,
            dispatchAddCategory,
            dispatchDeleteCategory,
            dispatchUpdateCategory,
          },
        ]}
      >
        {children}
      </ProductContext.Provider>
      <ToastContainer />
    </>
  )
}

const useProductContext = (): ProductContextData => useContext(ProductContext)

export { ProductsProvider, useProductContext }
