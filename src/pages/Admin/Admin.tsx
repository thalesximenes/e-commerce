import React, { useEffect } from 'react'
import './index.css'
import { ReactComponent as Add } from '../../assets/add.svg'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'
import { persistToken } from '../../utils/storage'
import { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useProductContext } from '../../contexts/products'
import { IProduct } from '../../types/products'

const Admin: React.FC = () => {
  const [
    {
      loading,
      productsList,
      dispatchProductList,
      dispatchAddProduct,
      dispatchUpdateProduct,
      dispatchDeleteProduct,
      categoryList,
      dispatchCategoryList,
      dispatchAddCategory,
      dispatchDeleteCategory,
      dispatchUpdateCategory,
    },
  ] = useProductContext()
  const navigate = useNavigate()
  const [state, { dispatchLogout }] = useAuthContext()
  const loggedUrer = state.user
  const isUserLogged = !!loggedUrer
  const cancelButtonRef = useRef(null)
  const firstLoad = useRef(true)

  const token = persistToken()

  const productInitialState: IProduct = {
    id: undefined,
    name: '',
    basePrice: 0,
    stock: 0,
    categories: [],
    picture: '',
    urlName: undefined,
    description: '',
  }

  const [open, setOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(false)
  const [product, setProduct] = useState<IProduct>(productInitialState)
  const [openCategory, setOpenCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [idUpdate, setIdUpdate] = useState('')

  const handleLogout = async () => {
    await dispatchLogout()
  }

  useEffect(() => {
    if (firstLoad.current) {
      dispatchProductList(token.get())
      dispatchCategoryList(token.get())
      firstLoad.current = false
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const handleAddProduct = async (e: any) => {
    e.preventDefault()
    if (editProduct) {
      try {
        if (
          +product.basePrice > 0 &&
          product?.categories?.length !== 0 &&
          product?.name?.trim() !== '' &&
          product.picture !== '' &&
          +product.stock >= 0
        ) {
          await dispatchUpdateProduct(product, token.get())
        }
      } catch (err) {
        console.log(err)
      } finally {
        setOpen(false)
        setCategoryName('')
        setIdUpdate('')
        setEditProduct(false)
      }
    } else {
      try {
        if (
          +product.basePrice > 0 &&
          product?.categories?.length !== 0 &&
          product?.name?.trim() !== '' &&
          product.picture !== '' &&
          +product?.stock >= 0
        ) {
          await dispatchAddProduct(product, token.get())
        }
      } catch (err) {
        console.log(err)
      } finally {
        setOpenCategory(false)
        setCategoryName('')
      }
    }
  }

  const handleEditProduct = async (payload: IProduct) => {
    setOpen(true)
    setProduct({
      ...payload,
      categories: payload.categories?.map(c => c.id),
      urlName: undefined,
    })
    setEditProduct(true)
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      if (id.trim() !== '') {
        await dispatchDeleteProduct(id, token.get())
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddCategory = async (e: any) => {
    e.preventDefault()
    if (editCategory) {
      try {
        if (categoryName.trim() !== '') {
          await dispatchUpdateCategory(idUpdate, categoryName, token.get())
        }
      } catch (err) {
        console.log(err)
      } finally {
        setOpenCategory(false)
        setCategoryName('')
        setIdUpdate('')
        setEditCategory(false)
      }
    } else {
      try {
        if (categoryName.trim() !== '') {
          await dispatchAddCategory(categoryName, token.get())
        }
      } catch (err) {
        console.log(err)
      } finally {
        setOpenCategory(false)
        setCategoryName('')
      }
    }
  }

  const handleEditCategory = async (id: string, name: string) => {
    setOpenCategory(true)
    setCategoryName(name)
    setEditCategory(true)
    setIdUpdate(id)
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      if (id.trim() !== '') {
        await dispatchDeleteCategory(id, token.get())
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
            <button
              className="ml-2"
              onClick={() => {
                setOpen(true)
                setEditProduct(false)
                setProduct(productInitialState)
              }}
            >
              <Add width={`25px`} />
            </button>
          </h2>
          <ul>
            {productsList && productsList.length !== 0 ? (
              productsList?.map(product => (
                <li key={product.id}>
                  <img src={product.picture} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <span>R$ {(+product.basePrice).toFixed(2)}</span>
                    <h3>{product.description}</h3>
                    <span>Categorias: </span>
                    <h2>{product.categories?.map(c => c.name).join(', ')}</h2>
                    <button onClick={() => handleEditProduct(product)}>
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProduct(product.id ? product.id : '')
                      }
                      className="ml-2 text-red"
                    >
                      <p className="text-red-600">Deletar</p>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li key={product.id}>
                <img
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkaznaViAIW--m67UwoR5yzgpsIjVziRVCuwDZxCu_FcbWoZbyddGJJqb9aSolPzsuqw&usqp=CAU'
                  }
                  alt={product.name}
                />
                <div>
                  <h3>Sem Produtos Cadastrados</h3>
                  <span>R$ {(+product.basePrice).toFixed(2)}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="user-list">
          <h2>
            Lista de Categorias
            <button
              className="ml-2"
              onClick={() => {
                setOpenCategory(true)
                setEditCategory(false)
                setCategoryName('')
                setIdUpdate('')
              }}
            >
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
                      <button
                        onClick={() =>
                          handleEditCategory(category.id, category.name)
                        }
                      >
                        Editar
                      </button>
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
                          {editProduct ? 'Editar Produto' : 'Adicionar Produto'}
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <label>Nome</label>
                            <input
                              type="text"
                              placeholder="Nome"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              value={product?.name}
                              onChange={o =>
                                setProduct({
                                  ...product,
                                  name: o.target.value,
                                })
                              }
                            />
                            <label>Preço</label>
                            <input
                              type="number"
                              placeholder="Preço"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              value={product?.basePrice}
                              onChange={o =>
                                setProduct({
                                  ...product,
                                  basePrice: o.target.value,
                                })
                              }
                            />
                            <label>Estoque</label>
                            <input
                              type="number"
                              placeholder="Quantidade de Produtos no Estoque"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              value={product?.stock}
                              onChange={o =>
                                setProduct({
                                  ...product,
                                  stock: o.target.value,
                                })
                              }
                            />
                            <label className="flex flex-row items-center">
                              Categoria
                            </label>
                            <select
                              data-te-select-init
                              multiple
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full focus:ring-blue-500 focus:border-blue-500"
                              value={product.categories}
                              onChange={o => {
                                var options = o.target.options
                                var value = []
                                for (
                                  var i = 0, l = options.length;
                                  i < l;
                                  i++
                                ) {
                                  if (options[i].selected) {
                                    value.push(options[i].value)
                                  }
                                }
                                return setProduct({
                                  ...product,
                                  categories: value,
                                })
                              }}
                            >
                              {categoryList?.map(category => (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>

                            <label>Foto do Produto</label>
                            {/* <input
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              id="file_input"
                              type="file"
                            /> */}
                            <input
                              type="bigtext"
                              placeholder="Foto do Produto"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              value={product?.picture}
                              onChange={o =>
                                setProduct({
                                  ...product,
                                  picture: o.target.value,
                                })
                              }
                            />
                            <label>Descrição</label>
                            <textarea
                              placeholder="Descrição"
                              className="p-2 border-2 border-gray-300 rounded-md mb-2 w-full"
                              value={product?.description}
                              onChange={o =>
                                setProduct({
                                  ...product,
                                  description: o.target.value,
                                })
                              }
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
                      onClick={handleAddProduct}
                    >
                      {editProduct ? 'Editar' : 'Adicionar'}
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
                            {editCategory
                              ? 'Editar Categoria'
                              : 'Adicionar Categoria'}
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
                        {editCategory ? 'Editar' : 'Adicionar'}
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
