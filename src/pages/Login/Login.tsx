import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-green-900">
      <div className="flex flex-col h-1/2 justify-center items-center bg-white rounded-lg">
        <div className="flex flex-col  h-3/4 justify-center items-center bg-blue-400">
          <div className="flex flex-col items-center h-1/2 bg-orange-500">
            <div className="flex flex-col">
              <h1 className="text-3xl text-gray-500">🛍️ E-commerce</h1>
            </div>
            <div className="flex flex-col w-3/4 mb-4 bg-red-400">
              <input
                type="email"
                placeholder="E-mail"
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
              />
              <input
                type="password"
                placeholder="Senha"
                className="p-2 border-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="w-2/4">
              <button
                className="login-button  p-2 bg-red-500 text-white rounded-md"
                onClick={() => navigate('/')}
              >
                Login
              </button>
              <div className="">
                <a href="/register" className="">
                  Ainda não possui conta?
                </a>
                <a href="/" className="">
                  Voltar para tela inicial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
