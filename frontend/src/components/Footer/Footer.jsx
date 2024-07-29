import React,{ Link } from 'react-router-dom'

function Footer() {
  // Obter o ano atual
  const currentYear = new Date().getFullYear()

  return (
    <footer className='flex w-full flex-col items-center justify-center bg-dark'>
      <div className='w-full'>
        <iframe 
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.9992699053455!2d-51.823848290461676!3d-23.99580287841405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ec5b4c3c463719%3A0x300833e738a89ae1!2sBacana%20Motors!5e0!3m2!1spt-BR!2sbr!4v1719432664484!5m2!1spt-BR!2sbr'
          className='h-96 w-full'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>

      <div className='m-8 flex flex-col md:flex-row min-h-80 w-11/12 justify-center gap-8 md:w-10/12'>
        <article className='flex flex-1 flex-col gap-4'>
          <header className='text-3xl md:text-4xl font-semibold'>Contato</header>
          <ul className='flex flex-col gap-2'>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='https://api.whatsapp.com/send?phone=554399689296'>
                (43) 99968-9296
              </a>
            </li>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='tel:+554399247887'>
                (43) 99924-7887
              </a>
            </li>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='malito:bacanamotosji@hotmail.com'>
                bacanamotosji@hotmail.com
              </a>
            </li>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='https://maps.app.goo.gl/UaGkFi2CHwK2Yza16c'>
                Av. Natanael Emerenciano Júnior, <br /> 500 - Centro, São João do Ivaí - PR
              </a>
            </li>
          </ul>
        </article>
        <article className='flex flex-1 flex-col gap-4'>
          <header className='text-3xl md:text-4xl font-semibold'>Institucional</header>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' to='/produtos'>
                Motocicletas
              </Link>
            </li>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='#mecânica'>
                Mecânica
              </a>
            </li>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='#quem-somos'>
                Quem Somos
              </a>
            </li>
            <li>
              <a className='text-xl md:text-2xl transition-colors duration-500 hover:text-green' href='#contato'>
                Contato
              </a>
            </li>
          </ul>
        </article>
        <article className='flex flex-1 flex-col gap-4'>
          <header className='text-3xl md:text-4xl font-semibold'>Onde nos Encontrar</header>
          <ul className='flex flex-col gap-2'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </article>
      </div>

      <div className='flex w-full flex-col gap-2 bg-red p-4 text-lg md:flex-row md:justify-around'>
        <a href='https://bacanamotors.com.br'>&copy; {currentYear} Bacana Motors. Todos os direitos reservados.</a>
        <a href='#' className='underline'>
          Política de privacidade
        </a>
        <a href='https://dorac.com.br'>
          Desenvolvido por <span className='underline'>Agência Dorac</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
