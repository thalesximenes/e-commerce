import React from 'react'
import { useNavigate } from 'react-router-dom'

const User: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-green-900">
      <div className="flex flex-col min-h-fit w-1/4 justify-center items-center bg-white rounded-lg">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col items-center h-full p-8">
            <div className="flex flex-col mb-2">
              <h1 className="text-3xl text-gray-500">
                {' '}
                Atualizar Dados de Usuário{' '}
              </h1>
            </div>
            <div className="flex flex-col mt-4 mb-3">
              <input
                type="email"
                placeholder="E-mail"
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
              />
              <input
                type="password"
                placeholder="Senha"
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Nome"
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Endereço"
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
              />
            </div>
            <div className="flex flex-col w-full ">
              <button
                className="p-2 bg-red-500 text-white rounded-md mb-4 hover:bg-red-800"
                onClick={() => navigate('/login')}
              >
                Atualizar dados
              </button>
              <div className="flex flex-col w-full ">
                <a href="/">Voltar para tela inicial</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
