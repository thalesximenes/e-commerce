import React from 'react'
import './index.css'

const Login: React.FC = () => {
  return (
    <div className="login-screen">
      <div className="login-form">
        <div className="login-header">
          <h1>🛍️ Compra Fácil</h1>
        </div>
        <div className="register-input-container">
          <input type="email" placeholder="E-mail" className="login-input" />
          <input type="password" placeholder="Senha" className="login-input" />
        </div>

        <button className="login-button">Login</button>
      </div>
    </div>
  )
}

export default Login
