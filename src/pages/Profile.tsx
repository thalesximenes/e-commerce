import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from './Register'
import { deleteUserService, updateUserService } from '../services/api'
import { useAuthContext } from '../contexts/auth'
import { ToastContainer, toast } from 'react-toastify'
import { isObjectComplete } from '../utils'

const initialCurrentUser = {
  email: '',
  name: '',
  address: '',
}

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(initialCurrentUser)
  const [password, setPassword] = useState('')
  const [state, { tokens, processLogin, dispatchLogout }] = useAuthContext()
  useEffect(() => {
    setCurrentUser({
      email: state.user?.email ?? '',
      name: state.user?.name ?? '',
      address: state.user?.address ?? '',
    })
  }, [state])
  const isCurrentUserComplete = isObjectComplete(currentUser)
  const isPasswordComplete = isObjectComplete({ password })

  const handleEmailChange = (email: User['email']) => {
    setCurrentUser({ ...currentUser, email: email ?? '' })
  }

  const handleNameChange = (name: User['name']) => {
    setCurrentUser({ ...currentUser, name: name ?? '' })
  }

  const handleAddressChange = (address: User['address']) => {
    setCurrentUser({ ...currentUser, address: address ?? '' })
  }

  const handleUpdate = async () => {
    try {
      const response = await updateUserService(currentUser, tokens.accessToken)
      console.log(response)
      processLogin(response)
      navigate('/')
    } catch (err) {
      toast('Falha na atualização. Tente novamente, por favor.')
    }
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password)
  }

  const handleDelete = async () => {
    try {
      await deleteUserService(password, tokens.accessToken)
      dispatchLogout()
    } catch (err) {
      toast('Não foi possível deletar sua conta. Tente novamente, por favor.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-green-900">
      <div className="flex flex-col min-h-fit w-1/4 justify-center items-center bg-white rounded-lg">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col items-center h-full p-8 rounded-lg">
            <div className="flex flex-col mb-5">
              <h1 className="text-2xl text-gray-500">
                Atualizar Dados de Usuário{' '}
              </h1>
            </div>
            <div className="flex flex-col mt-4 mb-3 w-full">
              <input
                type="email"
                placeholder="E-mail"
                value={currentUser?.email}
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleEmailChange(ev.target.value)}
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
                className="p-2 bg-green-600 text-white rounded-md mb-10 hover:bg-green-800 disabled:bg-slate-400"
                onClick={handleUpdate}
                disabled={!isCurrentUserComplete}
              >
                Atualizar dados
              </button>
              <input
                type="password"
                placeholder="Senha"
                className="p-2 border-2 border-gray-300 rounded-md mb-3"
                onChange={ev => handlePasswordChange(ev.target.value)}
              />
              <button
                className="p-2 bg-red-500 text-white rounded-md mb-4 hover:bg-red-800 disabled:bg-slate-400"
                onClick={handleDelete}
                disabled={!isPasswordComplete}
              >
                Apagar conta
              </button>
              <div className="flex flex-col w-full ">
                <a href="/">Voltar para tela inicial</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full"></div>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Profile
