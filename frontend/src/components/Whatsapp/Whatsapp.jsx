import React, { useState, useEffect } from 'react'
import whatsapp from 'assets/icons/whatsapp.svg'

const data = {
  number: '554399689296',
  message: '',
}

function Whatsapp() {
  return (
    <button className='animate-scale-up fixed bottom-4 right-4 z-30 hover:opacity-75 md:bottom-10 md:right-10'>
      <a
        href={`https://api.whatsapp.com/send?phone=${data.number}&text=${encodeURIComponent(data.message)}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <picture>
          <img src={whatsapp} alt='Whatsapp' className='h-20 w-20' />
        </picture>
      </a>
    </button>
  )
}

export default Whatsapp
