import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navigation({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleLinkClick = () => {
    handleClose()
  }

  const overlayClass = isOpen ? 'opacity-85' : 'opacity-0 pointer-events-none'
  const translateClass = isOpen ? 'translate-x-0' : 'translate-x-full'

  return (
    <div id='nav' className={`transition-all`}>
      <div
        className={`fixed inset-0 z-30 bg-dark ${overlayClass} backdrop-blur-xl backdrop-filter duration-500 ease-in-out`}
        onClick={handleClose}
      />

      <nav
        className={`fixed inset-y-0 right-0 z-40 flex w-9/12 flex-col justify-center gap-8 bg-dark p-8 shadow-lg duration-1000 ease-in-out md:w-1/3 ${translateClass}`}
      >
        <ul className='flex flex-col gap-4'>
          <li>
            <Link to='/' onClick={handleLinkClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
              Início
            </Link>
          </li>
          <li>
            <Link to='/produtos' onClick={handleLinkClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
              Motocicletas
            </Link>
          </li>
          <li>
            <Link to='/produtos' onClick={handleLinkClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
              Acessórios
            </Link>
          </li>
          <li>
            <a href='#clientes' onClick={handleLinkClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
              Mecânica
            </a>
          </li>
          <li>
            <a href='#academia-dorac' onClick={handleLinkClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
              Quem Somos
            </a>
          </li>
          <li>
            <a href='#contato' onClick={handleLinkClick} className='text-4xl font-medium text-white hover:text-green hover:underline'>
              Contato
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation