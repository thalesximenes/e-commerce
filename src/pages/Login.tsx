import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (email: string) => {
    setEmail(email)
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password)
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.post('login', { email, password })

      localStorage.setItem('userId', response.data)
      localStorage.setItem('userName', response.data.name)

      navigate('/')
    } catch (err) {
      alert('Falha no login. Tente novamente, por favor.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-green-900">
      <div className="flex flex-col min-h-fit w-1/4 justify-center items-center bg-white rounded-lg">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col items-center h-full p-8">
            <div className="flex flex-col mt-4 mb-6">
              <h1 className="text-3xl text-gray-500">🛍️ E-commerce</h1>
            </div>
            <div className="flex flex-col mt-8">
              <input
                type="email"
                placeholder="E-mail"
                className="p-2 border-2 border-gray-300 rounded-md mb-2"
                onChange={ev => handleEmailChange(ev.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                className="p-2 border-2 border-gray-300 rounded-md"
                onChange={ev => handlePasswordChange(ev.target.value)}
              />
            </div>
            <div className="flex flex-col w-full mt-3">
              <button
                className="p-2 bg-red-500 text-white rounded-md mb-5 hover:bg-red-800"
                onClick={() => handleLogin}
              >
                Login
              </button>
              <div className="flex flex-col w-full ">
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
