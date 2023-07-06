import React, { useCallback, useContext, useState } from 'react'
import {
  ICreateOrder,
  IOrder,
  OrderContextData,
  OrdersProviderProps
} from '../types/order'
import {
  addOrderService,
  listOrdersService,
  listAdminOrdersService
} from '../services/api'
import { ToastContainer, toast } from 'react-toastify'

export const OrderContext = React.createContext<OrderContextData>(
  {} as OrderContextData
)

const OrdersProvider: React.FC<OrdersProviderProps> = ({
  children,
}: OrdersProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [loadingAdmin, setLoadingAdmin] = useState(true)
  const [addingOrder, setAddingOrder] = useState(false)
  const [ordersList, setOrderList] = useState<IOrder[]>()
  const [adminOrdersList, setAdminOrderList] = useState<IOrder[]>()

  const dispatchOrdersList = useCallback(async (token: string) => {
    try {
      setLoading(true)
      const data = await listOrdersService(token)
      setOrderList(data)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
      toast('Falha ao resgatar lista de pedidos.')
    }
  }, [])

  const dispatchAdminOrdersList = useCallback(async (token: string) => {
    try {
      setLoadingAdmin(true)
      const data = await listAdminOrdersService(token)
      setAdminOrderList(data)
      setLoadingAdmin(false)
    } catch (e) {
      setLoadingAdmin(false)
      console.log(e)
      toast('Falha ao resgatar lista de pedidos.')
    }
  }, [])

  const dispatchAddOrder = useCallback(
    async (payload: ICreateOrder, token: any) => {
      try {
        setAddingOrder(true)

        await addOrderService(payload, token)
        setAddingOrder(false)
      } catch (e) {
        setAddingOrder(false)
        console.log(e)
        toast('Falha ao criar ordem.')
      } finally {
        dispatchOrdersList(token)
      }
    },
    []
  )

  return (
    <>
      <OrderContext.Provider
        value={{
            loading,
            loadingAdmin,
            addingOrder,
            ordersList,
            adminOrdersList,
            dispatchOrdersList,
            dispatchAdminOrdersList,
            dispatchAddOrder,
          }}
      >
        {children}
      </OrderContext.Provider>
      <ToastContainer />
    </>
  )
}

const useOrderContext = (): OrderContextData => useContext(OrderContext)

export { OrdersProvider, useOrderContext }
