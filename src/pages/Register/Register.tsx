import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="register-screen">
      <div className="register-form">
        <div className="register-header">
          <h1> Cadastro </h1>
        </div>
        <div className="register-input-container">
          <input type="text" placeholder="Nome" className="register-input" />
          <input type="email" placeholder="E-mail" className="register-input" />
          <input
            type="password"
            placeholder="Senha"
            className="register-input"
          />
        </div>

        <div className="button-container">
          <button
            className="register-button"
            onClick={() => navigate('/login')}
          >
            Finalizar cadastro
          </button>
          <a href="/login">Ir para tela de login</a>
          <a href="/">Voltar para tela inicial</a>
        </div>
      </div>
    </div>
  )
}

export default Register
