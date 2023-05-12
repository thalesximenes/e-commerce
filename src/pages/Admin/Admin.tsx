import React from 'react'
import './index.css'

interface Product {
  name: string
  image: string
  price: number
}

interface User {
  name: string
  email: string
}

const products: Product[] = [
  { name: 'Produto 1', image: 'https://via.placeholder.com/150', price: 10.99 },
  { name: 'Produto 2', image: 'https://via.placeholder.com/150', price: 20.99 },
  { name: 'Produto 3', image: 'https://via.placeholder.com/150', price: 30.99 },
  { name: 'Produto 4', image: 'https://via.placeholder.com/150', price: 40.99 },
]

const users: User[] = [
  { name: 'Usuário 1', email: 'usuario1@dominio.com' },
  { name: 'Usuário 2', email: 'usuario2@dominio.com' },
  { name: 'Usuário 3', email: 'usuario3@dominio.com' },
  { name: 'Usuário 4', email: 'usuario4@dominio.com' },
]

const Admin: React.FC = () => {
  return (
    <div className="admin-page">
      <div className="menu">
        <ul>
          <li>
            <a href="#">Produtos</a>
          </li>
          <li>
            <a href="#">Usuários</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="product-list">
          <h2>Lista de Produtos</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <span>R$ {product.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="user-list">
          <h2>Lista de Usuários</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <h3>{user.name}</h3>
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Admin
