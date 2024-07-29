import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productService from 'services/productService'
import Header from 'components/Header'
import Whatsapp from 'components/Whatsapp'
import Footer from 'components/Footer/Footer'
import Loading from 'components/Loading'

import mileageIcon from 'assets/icons/mileageIcon.svg'
import displacementIcon from 'assets/icons/displacementIcon.svg'
import brakeIcon from 'assets/icons/brakeIcon.svg'
import transmissionIcon from 'assets/icons/transmissionIcon.svg'
import fuelIcon from 'assets/icons/fuelIcon.svg'
import colorIcon from 'assets/icons/colorIcon.svg'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const productData = await productService.getProductById(id)
        setProduct(productData)
        if (productData && productData.product_images.length > 0) {
          setCurrentImage(productData.product_images[0])
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      document.title = `Bacana Motors - ${product.name}`
    }
  }, [product])

  const handleThumbnailMouseOver = (imageUrl) => {
    setCurrentImage(imageUrl)
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <main className='flex flex-col justify-center items-center w-full'>
          <Header />
          <section className='grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 md:w-9/12 my-10 md:my-20 uppercase'>
            {product && (
              <>
                <ImageSection
                  currentImage={currentImage}
                  productImages={product.product_images}
                  handleThumbnailMouseOver={handleThumbnailMouseOver}
                  toggleFullScreen={toggleFullScreen}
                  isFullScreen={isFullScreen}
                />
                <ProductInfoSection product={product} />
              </>
            )}
          </section>
          <Footer />
          <Whatsapp />
        </main>
      )}
    </>
  )
}

function ImageSection({ currentImage, productImages, handleThumbnailMouseOver, toggleFullScreen, isFullScreen }) {
  const openFullScreen = () => {
    toggleFullScreen()
  }

  return (
    <section className='relative w-full'>
      <div className='flex w-full justify-end gap-4'>
        <div className='flex w-full flex-col gap-4 text-black'>
          <picture>
            <img
              src={`https://bacanamotors.com.br/api/uploads/${currentImage}`}
              alt='Product'
              className='cursor-pointer border border-gray-300 w-full'
              onClick={openFullScreen}
            />
          </picture>
          <div className='flex w-full gap-2 overflow-auto'>
            {productImages.map((image) => (
              <picture key={image}>
                <img
                  src={`https://bacanamotors.com.br/api/uploads/${image}`}
                  alt='Product Thumbnail'
                  className='h-20 w-20 cursor-pointer border border-gray-300 hover:opacity-80'
                  onMouseOver={() => handleThumbnailMouseOver(image)}
                />
              </picture>
            ))}
          </div>
        </div>
      </div>
      {isFullScreen && (
        <FullScreenImage
          currentImage={currentImage}
          productImages={productImages}
          handleThumbnailMouseOver={handleThumbnailMouseOver}
          toggleFullScreen={toggleFullScreen}
        />
      )}
    </section>
  )
}

function FullScreenImage({ currentImage, productImages, handleThumbnailMouseOver, toggleFullScreen }) {
  const closeFullScreen = () => {
    toggleFullScreen()
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-95'>
      <div className='max-w-screen relative max-h-screen'>
        <picture>
          <img
            src={`https://bacanamotors.com.br/api/uploads/${currentImage}`}
            alt='Product'
            className='cursor-pointer border object-contain w-full h-full'
            onClick={closeFullScreen}
          />
        </picture>
        <div className='absolute right-0 top-0 p-4'>
          <button className='bg-dark py-2 px-4 text-white hover:opacity-75' onClick={closeFullScreen}>
            Fechar
          </button>
        </div>
      </div>
    </section>
  )
}

function ProductInfoSection({ product }) {
  return (
    <section className='flex flex-col justify-center gap-8 bg-white px-4 py-8 shadow-2xl w-full text-black'>
      <button>
        <span className='bg-red p-2 px-8 text-center text-3xl font-semibold text-white'>
          R${product.price}
        </span>
      </button>
      <header className='flex flex-col items-center justify-center gap-2 text-dark'>
        <h2 className='text-xl font-semibold md:text-3xl'>{product.name}</h2>
      </header>

      <div className='grid grid-cols-2 justify-center w-full gap-4 my-2'>        
        {product.mileage && (
        <div className='flex items-center justify-center gap-2'>
          <img src={mileageIcon} alt='Mileage' className='h-6 w-6' />
          <span>{product.mileage}</span>
        </div>
      )}
        {product.displacement && (
          <div className='flex items-center justify-center gap-2'>
            <img src={displacementIcon} alt='Displacement' className='h-6 w-6' />
            <span>{product.displacement}</span>
          </div>
        )}
        {product.brakes && (
          <div className='flex items-center justify-center gap-2'>
            <img src={brakeIcon} alt='Brakes' className='h-6 w-6' />
            <span>{product.brakes}</span>
          </div>
        )}
        {product.transmission && (
          <div className='flex items-center justify-center gap-2'>
            <img src={transmissionIcon} alt='Transmission' className='h-6 w-6' />
            <span>{product.transmission}</span>
          </div>
        )}
        {product.fuel && (
          <div className='flex items-center justify-center gap-2'>
            <img src={fuelIcon} alt='Fuel' className='h-6 w-6' />
            <span>{product.fuel}</span>
          </div>
        )}
        {product.color && (
          <div className='flex items-center justify-center gap-2'>
            <img src={colorIcon} alt='Color' className='h-6 w-6' />
            <span>{product.color}</span>
          </div>
        )}
      </div>

      <ul className='font-medium'>
        <li className='text-base'>Parcelamos no cartão</li>
        <li className='text-base'>Fazemos financiamento</li>
        <li className='text-base'>Pegamos sua moto na troca</li>
      </ul>

      <button>
        <a href='https://api.whatsapp.com/send?phone=554399689296&text=' target='_blank' className='bg-green p-3 w-full text-center text-2xl font-semibold text-white'>
          Entrar em contato
        </a>
      </button>
      <div className='text-justify text-base'>{product.description}</div>
    </section>
  )
}

export default Product