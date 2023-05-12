import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import P1 from '../../assets/p1.jpeg'
import P2 from '../../assets/p3.jpeg'
import P3 from '../../assets/p4.jpeg'

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="home-container">
      <div className="menu-container">
        <h3>🛍️ E-commerce</h3>
        <ul>
          <li>Início</li>
          <li onClick={() => alert('Página de Conta de Usuário')}>Sua conta</li>
          <li onClick={() => navigate('/adm')}>Administrador</li>
          <li onClick={() => navigate('/login')}>Sair</li>
        </ul>
      </div>
      <div className="main-list">
        <h1>Produtos</h1>
        <div className="products-container">
          <div className="product">
            <img src={P1} alt="Produto 1" />
            <h3>Produto 1</h3>
            <p>R$ 99,99</p>
            <button>Adicionar ao carrinho</button>
          </div>
          <div className="product">
            <img src={P2} alt="Produto 2" />
            <h3>Produto 2</h3>
            <p>R$ 149,99</p>
            <button>Adicionar ao carrinho</button>
          </div>
          <div className="product">
            <img src={P3} alt="Produto 3" />
            <h3>Produto 3</h3>
            <p>R$ 199,99</p>
            <button>Adicionar ao carrinho</button>
          </div>
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
