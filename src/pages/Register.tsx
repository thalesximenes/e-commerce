import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerService } from '../services/api'
import { isObjectComplete } from '../utils'
import { ToastContainer, toast } from 'react-toastify'

export type User = {
  email?: string
  password?: string
  name?: string
  address?: string
}

const initialNewUser = {
  email: '',
  password: '',
  name: '',
  address: '',
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState<User>(initialNewUser)

  const handleEmailChange = (email: User['email']) => {
    setNewUser({ ...newUser, email: email })
  }

  const handlePasswordChange = (password: User['password']) => {
    setNewUser({ ...newUser, password: password })
  }

  const handleNameChange = (name: User['name']) => {
    setNewUser({ ...newUser, name: name })
  }

  const handleAddressChange = (address: User['address']) => {
    setNewUser({ ...newUser, address: address })
  }

  const handleRegister = async () => {
    try {
      await registerService({ ...newUser })
      navigate('/login')
    } catch (err) {
      toast(
        'É necessária uma senha com 8 caracteres, com pelo menos 1 letra e 1 número'
      )
    }
  }

  const isNewUserComplete = isObjectComplete(newUser)

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-green-900">
      <div className="flex flex-col min-h-fit w-1/4 justify-center items-center bg-white rounded-lg">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col items-center h-full p-8">
            <div className="flex flex-col mb-2">
              <h1 className="text-3xl text-gray-500"> Cadastro </h1>
            </div>
            <div className="flex flex-col mt-4 mb-3">
              <input
                type="email"
                placeholder="E-mail"
                value={newUser?.email}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleEmailChange(ev.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={newUser?.password}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handlePasswordChange(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Nome"
                value={newUser?.name}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleNameChange(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Endereço"
                value={newUser?.address}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleAddressChange(ev.target.value)}
              />
            </div>
            <div className="flex flex-col w-full ">
              <button
                className="p-2 bg-red-500 text-white rounded-md mb-4 hover:bg-red-800 disabled:bg-slate-500"
                onClick={handleRegister}
                disabled={!isNewUserComplete}
              >
                Finalizar cadastro
              </button>
              <div className="flex flex-col w-full ">
                <a href="/login">Ir para tela de login</a>
                <a href="/">Voltar para tela inicial</a>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
