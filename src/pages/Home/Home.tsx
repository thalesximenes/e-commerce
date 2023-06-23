import React, { useEffect, useRef } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'
import { useProductContext } from '../../contexts/products'
import { persistToken, persistUser } from '../../utils/storage'
import { IProduct } from '../../types/products'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [state, { dispatchLogout }] = useAuthContext()
  const loggedUrer = state.user
  const isUserLogged = !!loggedUrer
  const firstLoad = useRef(true)
  const token = persistToken()
  const user = persistUser()
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

  const [{ productsList, dispatchProductList }] = useProductContext()
  const handleLogout = async () => {
    await dispatchLogout()
  }

  useEffect(() => {
    if (firstLoad.current) {
      dispatchProductList(token.get())
      firstLoad.current = false
    }
  }, [])

  return (
    <div className="home-container">
      <div className="menu-container">
        <h1>🛍️ E-commerce</h1>
        {isUserLogged && <h3>Olá, {loggedUrer?.name}</h3>}
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
            {productsList && productsList.length !== 0 ? (
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
                    <button>Adicionar ao carrinho</button>
                  </div>
                </div>
              ))
            ) : (
              <li key={product.id}>
                <img
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkaznaViAIW--m67UwoR5yzgpsIjVziRVCuwDZxCu_FcbWoZbyddGJJqb9aSolPzsuqw&usqp=CAU'
                  }
                  alt={product.name}
                />
                <div>
                  <h3>Sem Produtos Cadastrados</h3>
                  <span>R$ {(+product.basePrice).toFixed(2)}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="cart-container">
        <h2>Carrinho de compras</h2>
        <ul>
          <li>Produto 1 - R$ 99,99</li>
          <li>Produto 2 - R$ 149,99</li>
        </ul>
        <h3>Total: R$ 249,98</h3>
        <button>Finalizar compra</button>
      </div>
      <div className="past-orders-container">
        <h2>Compras passadas</h2>
        <ul>
          <li>
            Compra 1 - R$ 99,99 - <a href="#">Ver detalhes</a>
          </li>
          <li>
            Compra 2 - R$ 149,99 - <a href="#">Ver detalhes</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
