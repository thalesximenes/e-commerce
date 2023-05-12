import React from 'react'
import './index.css'

const Register: React.FC = () => {
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

        <button className="register-button">Finalizar cadastro</button>
      </div>
    </div>
  )
}

export default Register
