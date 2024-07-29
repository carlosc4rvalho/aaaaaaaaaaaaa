import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import capacete from 'assets/icons/capacete.png'
import logotipo from 'assets/icons/bacanamotors.png'
import menu from 'assets/icons/menu.svg'
import Navigation from 'components/Navigation'

function Header() {
  const [textIndex, setTextIndex] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const texts = [
    'Entregamos em todo o brasil',
    'Ampla variedade de motos novas e usadas',
    'Mecânica especializada para sua moto',
    'Garantia de qualidade em todos os serviços',
    'Atendimento dedicado, profissional e humanizado',
    'Venha nos visitar e conheça nossas ofertas!',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [texts.length])

  useEffect(() => {
    let lastScrollPosition = window.scrollY
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY
      const isScrolledToTop = currentScrollPosition < 200
      setIsHeaderVisible(isScrolledToTop || lastScrollPosition > currentScrollPosition)
      lastScrollPosition = currentScrollPosition
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => setShowNavigation(!showNavigation)

  return (
    <>
      <header
        className={`bg-filter bg-purple flex w-full flex-col bg-dark bg-filter backdrop-blur-xl transition-all duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className='flex items-center justify-between m-8 md:mx-20 text-white'>
          <Link to='/'>
            <div className='flex items-center gap-4 hover:opacity-75'>
              <img src={capacete} className='w-8 md:w-14' />
              <img src={logotipo} className='w-40 md:w-72' />
            </div>
          </Link>

          <ul className='hidden items-center gap-10 md:flex'>
            <li>
              <Link className='text-xl transition-colors duration-500 hover:text-green' to='/produtos'>
                Motocicletas
              </Link>
            </li>
            <li>
              <Link className='text-xl transition-colors duration-500 hover:text-green' to='/produtos'>
                Peças e Acessórios
              </Link>
            </li>
            <li>
              <a className='text-xl transition-colors duration-500 hover:text-green' href='#mecânica'>
                Mecânica
              </a>
            </li>
            <li>
              <a className='text-xl transition-colors duration-500 hover:text-green' href='#quem-somos'>
                Quem Somos
              </a>
            </li>
          </ul>

          <button className='md:hidden' onClick={handleClick}>
            <img src={menu} alt='Ícone de Menu Hamburger' className='h-10 w-10' />
          </button>
        </nav>

        <section className='flex w-full justify-center overflow-hidden bg-red p-3'>
          <span
            className='w-full animate-carousel text-center text-base text-white md:text-lg md:uppercase'
          >
            {texts[textIndex]}
          </span>
        </section>
      </header>

      <Navigation isOpen={showNavigation} onClose={() => setShowNavigation(false)} />
    </>
  )
}

export default Header
