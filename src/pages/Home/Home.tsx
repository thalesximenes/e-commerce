import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'
import { useProductContext } from '../../contexts/products'
import { useOrderContext } from '../../contexts/order'
import { persistToken, persistUser } from '../../utils/storage'
import { IProduct } from '../../types/products'
import { useCookies } from 'react-cookie';
import { IOrder, OrderItem } from '../../types/order'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [state, { dispatchLogout }] = useAuthContext()
  const loggedUser = state.user
  const isUserLogged = !!loggedUser
  const firstLoad = useRef(true)
  const token = persistToken()
  const user = persistUser()
  const [cookies, setCookie] = useCookies();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const productInitialState: IProduct = {
    id: undefined,
    name: '',
    basePrice: 0,
    stock: 0,
    categories: [],
    picture: '',
    urlName: undefined,
    description: '',
  }

  const product = productInitialState

  const [{ productsList, loading, dispatchProductList }] = useProductContext()
  const {
    ordersList,
    loading: loadingOrders,
    dispatchOrdersList,
    dispatchAddOrder,
  } = useOrderContext()

  const handleLogout = async () => {
    await dispatchLogout()
  }

  useEffect(() => {
    const savedCartItems: IProduct[] = cookies.carrinho || [];

    setCartItems(savedCartItems);
  }, [cookies]);

  const handleAddToCart = (product: IProduct) => {
    const updatedCartItems: IProduct[] = [...cartItems];

    updatedCartItems.push(product);
    setCartItems(updatedCartItems);
    setCookie('carrinho', updatedCartItems, { path: '/' });
  };
  
  const handleRemoveFromCart = (product: IProduct) => {
    const updatedCartItems: IProduct[] = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCartItems);
    setCookie('carrinho', updatedCartItems, { path: '/' });
  };

  useEffect(() => {
    if (firstLoad.current) {
      dispatchProductList(token.get())
      firstLoad.current = false
    }
  }, [])

  useEffect(() => {
    if (isUserLogged) {
      dispatchOrdersList(token.get())
    }
  }, [])

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((accumulator, item) => accumulator + parseFloat(item.basePrice.toString()), 0);
    return totalPrice.toFixed(2);
    return 0
  };

  const finishOrder = () => {
    if(isUserLogged) {
      proccessOrder()
    }
    else {
      navigate('/login')
    }
  }

  const proccessOrder = () => {
    // 
  }

  return (
    <div className="home-container">
      <div className="menu-container">
        <h1>🛍️ E-commerce</h1>
        {isUserLogged && <h3>Olá, {loggedUser?.name}</h3>}
        <ul className="md-5">
          {isUserLogged && (
            <li onClick={() => navigate('/profile')}>Sua conta</li>
          )}
          {isUserLogged && user.get().role === 'ADMIN' && (
            <li onClick={() => navigate('/adm')}>Administrador</li>
          )}
          {isUserLogged && <li onClick={handleLogout}>Sair</li>}
          {!isUserLogged && <li onClick={() => navigate('/login')}>Login</li>}
          {!isUserLogged && (
            <li onClick={() => navigate('/register')}>Cadastro</li>
          )}
        </ul>
      </div>
      <div className="main-list">
        <h2>Lista de Produtos</h2>
        <div className="products-container">
          <ul>
            {loading && (
              <>
                <span>Carregando</span>
              </>
            )}
            {!loading && productsList && productsList.length !== 0 && (
              productsList?.map(product => (
                <div className="product" key={product.id}>
                  <div className="flex">
                    <img src={product.picture} alt={product.name} />
                    <span className="ml-2 text-left">
                      <p className="flex">Descrição: </p>
                      {product.description}
                    </span>
                  </div>
                  <div>
                    <p>{product.name}</p>
                    <span>Categorias: </span>
                    <h2>{product.categories?.map(c => c.name).join(', ')}</h2>
                    <p>R$ {(+product.basePrice).toFixed(2)}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              ))
            )}
            {!loading && !productsList || productsList?.length == 0 && (
              <li key={product.id}>
                <img
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkaznaViAIW--m67UwoR5yzgpsIjVziRVCuwDZxCu_FcbWoZbyddGJJqb9aSolPzsuqw&usqp=CAU'
                  }
                  alt={product.name}
                />
                <div>
                  <h3>Sem Produtos Cadastrados</h3>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="cart-container">
        <h2>Carrinho de compras</h2>
        <ul>
          {cartItems && cartItems.map((item: IProduct, index: number) => (
            <li key={index}>
              <div style={{marginBottom: '10px'}}>{item.name} - R$ {parseFloat(item.basePrice.toString()).toFixed(2)}</div>
              <button onClick={() => handleRemoveFromCart(item)}>Remover</button>
              <hr className='cart-item-divider'></hr><br></br>
            </li>
          ))}
        </ul>
        <h3>Total: R$ {calculateTotalPrice()}</h3>
        <button onClick={() => finishOrder()}>Finalizar compra</button>
      </div>
      {isUserLogged && (
        <>
          <div className="past-orders-container">
            <h2>Compras passadas</h2>
            {loadingOrders
              ? (
                <>
                  <span>Carregando</span>
                </>
              )
              : <>
                <ul>
                  {ordersList && ordersList.map((order: IOrder) => {
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
  )
}

export default Home

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
