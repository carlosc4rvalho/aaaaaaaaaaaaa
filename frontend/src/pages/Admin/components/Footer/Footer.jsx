import React from 'react'

function Footer() {
  return (
    <footer className='flex w-full flex-col justify-center items-center gap-2 bg-red p-4 text-white md:flex-row'>
      <a href='https://dorac.com.br' className='text-center'>
        Desenvolvido por <span className='underline'>Agência Dorac</span>
      </a>
    </footer>
  )
}

export default Footer
