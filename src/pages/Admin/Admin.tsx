import React from 'react'
import './index.css'

import P1 from '../../assets/p1.jpeg'
import P2 from '../../assets/p2.jpeg'
import P3 from '../../assets/p3.jpeg'
import P4 from '../../assets/p4.jpeg'
import { useNavigate } from 'react-router-dom'

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
  { name: 'Produto 1', image: P1, price: 10.99 },
  { name: 'Produto 2', image: P2, price: 20.99 },
  { name: 'Produto 3', image: P3, price: 30.99 },
  { name: 'Produto 4', image: P4, price: 40.99 },
]

const users: User[] = [
  { name: 'Usuário 1', email: 'usuario1@dominio.com' },
  { name: 'Usuário 2', email: 'usuario2@dominio.com' },
  { name: 'Usuário 3', email: 'usuario3@dominio.com' },
  { name: 'Usuário 4', email: 'usuario4@dominio.com' },
]

const Admin: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="admin-page">
      <div className="menu">
        <h3>🛍️ E-commerce</h3>
        <ul>
          <li onClick={() => navigate('/')}>Início</li>
          <li onClick={() => alert('Página de Conta de Usuário')}>Sua conta</li>
          <li onClick={() => navigate('/login')}>Sair</li>
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
