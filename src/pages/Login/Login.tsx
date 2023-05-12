import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="login-screen">
      <div className="login-form">
        <div className="login-header">
          <h1>🛍️ E-commerce</h1>
        </div>
        <div className="register-input-container">
          <input type="email" placeholder="E-mail" className="login-input" />
          <input type="password" placeholder="Senha" className="login-input" />
        </div>

        <div className="button-container">
          <button className="login-button" onClick={() => navigate('/')}>
            Login
          </button>
          <a href="/register">Ainda não possui conta?</a>
          <a href="/">Voltar para tela inicial</a>
        </div>
      </div>
    </div>
  )
}

export default Login
