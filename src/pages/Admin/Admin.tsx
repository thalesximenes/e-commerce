import React, { useEffect } from 'react'
import './index.css'
import P1 from '../../assets/p1.jpeg'
import P2 from '../../assets/p2.jpeg'
import P3 from '../../assets/p3.jpeg'
import P4 from '../../assets/p4.jpeg'
import { ReactComponent as Add } from '../../assets/add.svg'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'
import { persistToken, persistUser } from '../../utils/storage'
import { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useProductContext } from '../../contexts/products'
import { addCategoryService } from '../../services/api'
interface Product {
  name: string
  image: string
  price: number
}

interface User {
  name: string
  email: string
}

const products: Product[] = [
  { name: 'Produto 1', image: P1, price: 10.99 },
  { name: 'Produto 2', image: P2, price: 20.99 },
  { name: 'Produto 3', image: P3, price: 30.99 },
  { name: 'Produto 4', image: P4, price: 40.99 },
]

const users: User[] = [
  { name: 'Categoria 1', email: 'usuario1@dominio.com' },
  { name: 'Categoria 2', email: 'usuario2@dominio.com' },
  { name: 'Categoria 3', email: 'usuario3@dominio.com' },
  { name: 'Categoria 4', email: 'usuario4@dominio.com' },
]

const Admin: React.FC = () => {
  const [
    {
      loading,
      productsList,
      categoryList,
      dispatchAddCategory,
      dispatchDeleteCategory,
      dispatchProductList,
      dispatchCategoryList,
    },
  ] = useProductContext()
  const navigate = useNavigate()
  const [state, { tokens, dispatchLogout }] = useAuthContext()
  const loggedUrer = state.user
  const isUserLogged = !!loggedUrer
  const [open, setOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const cancelButtonRef = useRef(null)
  const firstLoad = useRef(true)

  const handleLogout = async () => {
    await dispatchLogout()
  }

  useEffect(() => {
    if (firstLoad.current) {
      dispatchProductList(tokens.accessToken)
      dispatchCategoryList(tokens.accessToken)
      firstLoad.current = false
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const handleAddCategory = async (e: any) => {
    e.preventDefault()
    try {
      if (categoryName.trim() !== '') {
        await dispatchAddCategory(categoryName, tokens.accessToken)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setOpenCategory(false)
      setCategoryName('')
    }
  }

  const handleDeleteCategory = async (id: string) => {
    console.log('aqui')
    try {
      if (id.trim() !== '') {
        await dispatchDeleteCategory(id, tokens.accessToken)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="admin-page">
      <div className="menu">
        <h1>🛍️ E-commerce</h1>
        {isUserLogged && <h3>Olá, {loggedUrer?.name}</h3>}
        <ul className="md-5">
          {isUserLogged && <li onClick={() => navigate('/')}>Início</li>}
          {isUserLogged && (
            <li onClick={() => navigate('/profile')}>Sua conta</li>
          )}
          {isUserLogged && <li onClick={handleLogout}>Sair</li>}
        </ul>
      </div>
      <div className="content">
        <div className="product-list">
          <h2>
            Lista de Produtos
            <button className="ml-2" onClick={() => setOpen(true)}>
              <Add width={`25px`} />
            </button>
          </h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <span>R$ {product.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="user-list">
          <h2>
            Lista de Categorias
            <button className="ml-2" onClick={() => setOpenCategory(true)}>
              <Add width={`25px`} />
            </button>
          </h2>
          <ul>
            {loading ? (
              <li key={0}>
                <h3>Carregando ...</h3>
              </li>
            ) : (
              categoryList?.map(category => {
                return (
                  <li key={category.id}>
                    <h3>{category.name}</h3>
                    <span>
                      <button>Editar</button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="ml-2 text-red"
                      >
                        <p className="text-red-600">Deletar</p>
                      </button>
                    </span>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Adicionar Produto
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <label>Nome</label>
                            <input
                              type="text"
                              placeholder="Nome"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                            />
                            <label>Preço</label>
                            <input
                              type="text"
                              placeholder="Preço"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                            />
                            <label>Descrição</label>
                            <input
                              type="bigtext"
                              placeholder="Descrição"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                            />
                            <label className="flex flex-row items-center">
                              Categoria
                              <button onClick={() => console.log('asd')}>
                                <Add width={`20px`} />
                              </button>
                            </label>
                            <select
                              data-te-select-init
                              multiple
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full focus:ring-blue-500 focus:border-blue-500"
                            >
                              {categoryList?.map((category, id) => (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                            <label>Foto do Produto</label>
                            <input
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              id="file_input"
                              type="file"
                            />
                            <label>Descrição</label>
                            <input
                              type="bigtext"
                              placeholder="Descrição"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Adicionar
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openCategory} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenCategory}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleAddCategory}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Adicionar Categoria
                          </Dialog.Title>
                          <div className="mt-2">
                            <label>Nome</label>
                            <input
                              type="text"
                              placeholder="Nome"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              value={categoryName}
                              onChange={o => setCategoryName(o.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      >
                        Adicionar
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpenCategory(false)}
                        ref={cancelButtonRef}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default Admin
