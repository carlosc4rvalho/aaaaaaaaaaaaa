import React from 'react'
import { Link } from 'react-router-dom'
import arrowLeft from 'assets/icons/arrowLeft.svg'

const CustomHeader = ({ title, backTo }) => {
  return (
    <header className='bg-customDark flex w-full items-center justify-center bg-dark p-4 text-2xl font-medium'>
      {backTo && (
        <Link to={backTo} className='absolute left-4 text-white'>
          <picture>
            <img src={arrowLeft} alt='Voltar' width={25} height={25} />
          </picture>
        </Link>
      )}
      <p className='text-white'>{title}</p>
    </header>
  )
}

export default CustomHeader