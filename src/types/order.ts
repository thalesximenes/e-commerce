import { ReactNode } from 'react'

export interface OrderItem {
    amount: number
    product: OrderProduct
}

export interface OrderProduct {
    name: string
    picture: string
    basePrice: string
}

export interface CreateOrderProduct {
    productId: string
    amount: number
}
export interface ICreateOrder {
    products: CreateOrderProduct[]
}

export interface IOrder {
    id: string
    totalPrice: string
    createdAt: string
    purchaseItems: OrderItem[]
}

export interface OrdersDispatch {
    loading: boolean
    loadingAdmin: boolean
    addingOrder: boolean
    ordersList: IOrder[] | undefined
    adminOrdersList: IOrder[] | undefined
    dispatchOrdersList: (token: string) => Promise<void>
    dispatchAdminOrdersList: (token: string) => Promise<void>
    dispatchAddOrder: (payload: ICreateOrder, token: string) => Promise<void>
  }
  
  export type OrderContextData = OrdersDispatch
  
  export interface OrdersProviderProps {
    children: ReactNode
  }