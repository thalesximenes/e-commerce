import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from './Register'
import api from '../services/api'

const User: React.FC = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<User>()

  const handleEmailChange = (email: User['email']) => {
    setCurrentUser({ ...currentUser, email: email })
  }

  const handlePasswordChange = (password: User['password']) => {
    setCurrentUser({ ...currentUser, password: password })
  }

  const handleNameChange = (name: User['name']) => {
    setCurrentUser({ ...currentUser, name: name })
  }

  const handleAddressChange = (address: User['address']) => {
    setCurrentUser({ ...currentUser, address: address })
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.post('update', { currentUser })
      console.log(response)

      navigate('/')
    } catch (err) {
      alert('Falha no cadastro. Tente novamente, por favor.')
    }
  }

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
                value={currentUser?.email}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleEmailChange(ev.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={currentUser?.password}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handlePasswordChange(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Nome"
                value={currentUser?.name}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleNameChange(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Endereço"
                value={currentUser?.address}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleAddressChange(ev.target.value)}
              />
            </div>
            <div className="flex flex-col w-full ">
              <button
                className="p-2 bg-red-500 text-white rounded-md mb-4 hover:bg-red-800"
                onClick={() => handleUpdate}
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
