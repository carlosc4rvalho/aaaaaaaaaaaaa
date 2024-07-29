import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import productService from 'services/productService'
import Loading from 'components/Loading'
import arrowLeft from 'assets/icons/arrowLeft.svg'
import SearchInput from './components/SearchInput'
import OrderBy from './components/OrderBy'
import ProductTable from './components/ProductTable/ProductTable'
import BtnCadastrar from './components/BtnCadastrar/BtnCadastrar'

function Admin() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [noProductsFound, setNoProductsFound] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    document.title = 'Bacana Motors - Painel de Controle'
    fetchData()
  }, [])

  async function fetchData() {
    setIsLoading(true)
    try {
      const productsData = await productService.getProducts()
      setProducts(productsData)
      setNoProductsFound(productsData.length === 0)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      },0)
    }
  }

  async function sortProducts(order) {
    setIsLoading(true)
    const filtered = [...products].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
    setProducts(filtered)
    setTimeout(() => {
      setIsLoading(false)
    },0)
  }

  function handleSearch(searchTerm) {
    setIsLoading(true)
    const term = searchTerm.toLowerCase()
    const filtered = products.filter((product) => {
      return Object.keys(product).some((key) => {
        if (typeof product[key] === 'string') {
          return product[key].toLowerCase().includes(term)
        }
        return false
      })
    })
    setProducts(filtered)
    setNoProductsFound(filtered.length === 0)
    setTimeout(() => {
      setIsLoading(false)
    },0)
  }

  async function handleSelectAll(isSelected) {
    if (isSelected) {
      setSelectedProducts(products.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  async function handleSelectProduct(productId, isSelected) {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  async function handleDeleteProducts() {
    if (selectedProducts.length === 0) {
      return
    }

    setIsLoading(true)
    try {
      await productService.deleteProducts(selectedProducts)
      setSelectedProducts([])
      await fetchData()
    } catch (error) {
      console.error('Erro ao deletar produtos:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      },0)
    }
  }

  async function handleActivateProducts() {
    if (selectedProducts.length === 0) {
      return
    }

    setIsLoading(true)
    try {
      await productService.activateProducts(selectedProducts)
      setSelectedProducts([])
      await fetchData()
    } catch (error) {
      console.error('Erro ao ativar produtos:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      },0)
    }
  }

  async function handleDeactivateProducts() {
    if (selectedProducts.length === 0) {
      return
    }

    setIsLoading(true)
    try {
      await productService.deactivateProducts(selectedProducts)
      setSelectedProducts([])
      await fetchData()
    } catch (error) {
      console.error('Erro ao desativar produtos:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      },0)
    }
  }

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      {!isLoading && (
        <main className='flex min-h-screen w-full flex-col items-center gap-4 bg-light'>
          <header className='flex w-full items-center justify-center bg-dark p-4'>
            <Link to={'/'} className='absolute left-4 text-white'>
              <picture>
                <img src={arrowLeft} alt='Voltar' width={25} height={25} />
              </picture>
            </Link>
            <p className='text-2xl font-medium text-white'>Painel de Controle</p>
          </header>

          <section className='flex w-11/12 flex-col items-center justify-center gap-4'>
            <div className='flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between'>
              <div className='flex items-center justify-end gap-2 md:w-full lg:w-1/2'>
                <SearchInput onChange={handleSearch} />
                <OrderBy onChange={sortProducts} />
              </div>

              <div className='flex w-full flex-col gap-2 rounded-xl border-2 border-gray-300 bg-white p-3 text-base md:w-1/2 md:flex-row md:items-center'>
                <div className='flex flex-1 font-semibold text-black'>Ações em massa:</div>

                <div className='flex w-full flex-1 items-center gap-2'>
                  <ActionButton onClick={handleActivateProducts} text='Ativar' color='blue-500' />
                  <ActionButton onClick={handleDeactivateProducts} text='Desativar' color='yellow-500' />
                  <ActionButton onClick={handleDeleteProducts} text='Deletar' color='red' />
                </div>
              </div>
            </div>

            {noProductsFound ? (
              <p className='mt-40 text-lg font-medium text-black'>Nenhum produto encontrado</p>
            ) : (
              <ProductTable
                products={products}
                onSelectAll={handleSelectAll}
                onSelectProduct={handleSelectProduct}
                selectedProducts={selectedProducts}
              />
            )}
          </section>
          <BtnCadastrar />
        </main>
      )}
    </>
  )
}

function ActionButton({ onClick, text, color }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center rounded-lg p-2 font-medium text-white shadow-2xl bg-${color}`}
    >
      {text}
    </button>
  )
}

export default Admin
