import React, { useState, useEffect } from 'react'
import productService from 'services/productService'
import Header from 'components/Header'
import Loading from 'components/Loading'
import Whatsapp from 'components/Whatsapp'
import OrderBy from './components/OrderBy'
import SearchInput from './components/SearchInput'
import ProductCard from './components/ProductCard/ProductCard'
import Footer from 'components/Footer/Footer'

function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [noProductsFound, setNoProductsFound] = useState(false)

  useEffect(() => {
    document.title = 'Bacana Motors - Produtos'
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
      }, 1000)
    }
  }

  function updateProducts(updatedProducts) {
    setProducts(updatedProducts)
    setNoProductsFound(updatedProducts.length === 0)
  }

  async function orderByProducts(order) {
    setIsLoading(true)
    try {
      const sortedProducts = [...products].sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price
      })
      updateProducts(sortedProducts)
    } catch (error) {
      console.error('Erro ao ordenar produtos:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 0)
    }
  }

  function handleSearch(searchTerm) {
    setIsLoading(true)
    const term = searchTerm.toLowerCase()
    try {
      const filteredProducts = products.filter((product) =>
        Object.values(product).some((value) =>
          typeof value === 'string' ? value.toLowerCase().includes(term) : false,
        ),
      )
      updateProducts(filteredProducts)
    } catch (error) {
      console.error('Erro ao filtrar produtos:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 0)
    }
  }

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} /> }
      {!isLoading && (
        <main className='flex min-h-screen w-full flex-col items-center justify-center bg-light'>
          <Header />

          <div className='flex w-11/12 flex-col items-center justify-center gap-4 my-5'>
            <div className='flex w-full items-center justify-center gap-2 md:w-1/2'>
              <SearchInput onChange={handleSearch} />
              <OrderBy onChange={(e) => orderByProducts(e.target.value)} />
            </div>

            <div className='flex w-full flex-wrap justify-center gap-3'>
              {products.length > 0 ? (
                products.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className='text-dark'>{noProductsFound && 'Nenhum produto encontrado.'}</p>
              )}
            </div>
          </div>
          <Footer />
          <Whatsapp />
        </main>
      )}
    </>
  )
}

export default Products
