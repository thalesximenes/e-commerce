import React, { useState, useEffect, useRef } from 'react'
import './Home/index.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/auth'
import { useOrderContext } from '../contexts/order'
import { persistToken, persistUser } from '../utils/storage'
import { IOrder, OrderItem } from '../types/order'


const PurchaseItem: React.FC<{ purchaseItem: OrderItem }> = ({ purchaseItem }) => {
    return (
      <li>
        <div className="flex">
          <img width="50px" height="50px" src={purchaseItem.product.picture} alt={purchaseItem.product.name} />
          <span className="ml-2 text-left">
            <p className="flex">{purchaseItem.product.name}</p>
          </span>
        </div>
        <div style={{ marginBottom: "10px" }}></div>
      </li>
    );
  };

  
const Home: React.FC = () => {
  const navigate = useNavigate()
  const [state, { dispatchLogout }] = useAuthContext()
  const loggedUser = state.user
  const isUserLogged = !!loggedUser
  const token = persistToken()
  const user = persistUser()

  const {
    adminOrdersList,
    loadingAdmin,
    dispatchAdminOrdersList,
  } = useOrderContext()

  const handleLogout = async () => {
    await dispatchLogout()
  }


  useEffect(() => {
    const _token = token.get()
    if (_token) {
        dispatchAdminOrdersList(_token)
    }
  }, [])

  return (
    <div className="home-container">
      <div className="menu-container">
        <h1>🛍️ E-commerce</h1>
        {isUserLogged && <h3>Olá, {loggedUser?.name}</h3>}
        <ul className="md-5">
          {isUserLogged && <li onClick={() => navigate('/')}>Início</li>}
          {isUserLogged && <li onClick={() => navigate('/pedidos')}>Pedidos</li>}
          {isUserLogged && (
            <li onClick={() => navigate('/profile')}>Sua conta</li>
          )}
          {isUserLogged && <li onClick={handleLogout}>Sair</li>}
        </ul>
      </div>
      <div className="main-list">
        <h2>Lista de Produtos</h2>
        <div className="products-container">
            {(isUserLogged || token.get()) && (
            <>
            <div className="past-orders-container">
                <h2>Compras</h2>
                {loadingAdmin
                ? (
                    <>
                    <span>Carregando</span>
                    </>
                )
                : <>
                    <ul>
                    {adminOrdersList && adminOrdersList.map((order: IOrder) => {
                        const date = new Date(order.createdAt);
                        const formattedDate = date.toLocaleString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                        });

                        return (
                        <div key={`order-${order.id}`}>
                            <h1 style={{ fontWeight: 800 }}>{formattedDate}</h1>
                            {order.purchaseItems.map((purchaseItem, index: number) => (
                            <PurchaseItem
                                key={`order-${order.id}-purchase-item-${index}`}
                                purchaseItem={purchaseItem}
                            />
                            ))}
                            <hr className="cart-item-divider"></hr>
                            <br></br>
                        </div>
                        )
                        })}
                    </ul>
                </>
                }
            </div>
            </>
        )}
        </div>
      </div>
    </div>
  )
}

export default Home