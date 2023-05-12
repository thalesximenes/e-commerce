import React from 'react'
import './index.css'

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="menu-container">
        <ul>
          <li>Home</li>
          <li>Produtos</li>
          <li>Categorias</li>
          <li>Carrinho</li>
        </ul>
      </div>
      <div className="main-list">
        <h1>Produtos</h1>
        <div className="products-container">
          <div className="product">
            <img
              src="https://via.placeholder.com/150x150.png?text=Produto1"
              alt="Produto 1"
            />
            <h3>Produto 1</h3>
            <p>R$ 99,99</p>
            <button>Adicionar ao carrinho</button>
          </div>
          <div className="product">
            <img
              src="https://via.placeholder.com/150x150.png?text=Produto2"
              alt="Produto 2"
            />
            <h3>Produto 2</h3>
            <p>R$ 149,99</p>
            <button>Adicionar ao carrinho</button>
          </div>
          <div className="product">
            <img
              src="https://via.placeholder.com/150x150.png?text=Produto3"
              alt="Produto 3"
            />
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
