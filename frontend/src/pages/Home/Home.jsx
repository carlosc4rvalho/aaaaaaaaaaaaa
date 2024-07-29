// global components
import Header from 'components/Header'
import Footer from 'components/Footer/Footer'
import Whatsapp from 'components/Whatsapp'

// local components
import React, { useEffect } from 'react'

import Contact from './components/Contact'
import Motorcycles from './components/Motorcycles/Motorcycles'
import Depoimentos from './components/Depoimentos/Depoimentos'
import PecasAcessorios from './components/PecasAcessorios/PecasAcessorios'
import ServicosMecanicos from './components/Servicos/ServicosMecanicos'
import Banner from './components/Banner'
import About from './components/About/About'

function Home() {
  useEffect(() => {
    document.title = 'Bacana Motors'
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center w-full'>
      <Header />
      <Banner/>
      <Motorcycles/>
      <About/>
      <ServicosMecanicos/>
      <PecasAcessorios/>
      <Depoimentos/>
      <Contact />
      <Footer />
      <Whatsapp />
    </main>
  )
}

export default Home
