import React from 'react'
import { Link } from 'react-router-dom'

import mileageIcon from 'assets/icons/mileageIcon.svg'
import displacementIcon from 'assets/icons/displacementIcon.svg'
import brakeIcon from 'assets/icons/brakeIcon.svg'
import transmissionIcon from 'assets/icons/transmissionIcon.svg'
import fuelIcon from 'assets/icons/fuelIcon.svg'
import colorIcon from 'assets/icons/colorIcon.svg'

function ProductInfo({ label, value, icon }) {
  return (
    <li className='flex items-center gap-2'>
      <img src={icon} alt={label} width={30} height={30} />
      <span>{value}</span>
    </li>
  )
}

function ProductCard({ product }) {
  if (!product.is_active) {
    return null
  }

  return (
    <Link
      to={`/produto/${product.id}`}
      className='shadow-2xl flex flex-col items-center justify-between gap-6 border-2 border-gray-300 bg-white text-dark hover:cursor-pointer md:w-1/4 overflow-hidden'
    >
      <img
        src={`https://bacanamotors.com.br/api/uploads/${product.product_images[0]}`}
        loading='lazy'
        alt='Product'
      />

      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <header>
          <h2 className='mx-4 text-center text-2xl font-semibold'>{product.name}</h2>
        </header>

        <div className='flex w-full justify-around'>
          <ul className='flex flex-col gap-4'>
            {product.mileage && <ProductInfo label='Mileage' value={product.mileage} icon={mileageIcon} />}
            {product.fuel && <ProductInfo label='Fuel' value={product.fuel} icon={fuelIcon} />}
            {product.color && <ProductInfo label='Color' value={product.color} icon={colorIcon} />}
          </ul>
          <ul className='flex flex-col gap-4'>
            {product.displacement && <ProductInfo label='Displacement' value={product.displacement} icon={displacementIcon} />}
            {product.transmission && <ProductInfo label='Transmission' value={product.transmission} icon={transmissionIcon} />}
            {product.brakes && <ProductInfo label='Brakes' value={product.brakes} icon={brakeIcon} />}
          </ul>
        </div>
        <span className='text-4xl font-bold text-red'>{product.price}</span>
      </div>

      <button className='w-full cursor-pointer bg-green p-3 text-center text-xl font-medium text-white hover:opacity-75'>
        Ver detalhes
      </button>
    </Link>
  )
}

export default ProductCard
