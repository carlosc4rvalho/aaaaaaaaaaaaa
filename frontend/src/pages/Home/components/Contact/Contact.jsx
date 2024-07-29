import React from 'react'
import whatsappIcon from 'assets/icons/whatsapp.svg'

function Contact() {
  return (
    <section
      id='contact-section'
      className={`flex w-full flex-col items-center justify-center bg-light py-8`}
    >
      <div
        className={`flex w-11/12 flex-col items-center justify-center gap-4 m-8 text-dark`}
      >
        <figure>
          <img src={whatsappIcon} alt='Whatsapp' className='h-14 w-14 md:h-20 md:w-20' />
        </figure>

        <figcaption className='text-2xl font-semibold md:text-5xl'>Atendimento Personalizado</figcaption>

        <p className='text-center text-xl md:text-2xl'>
          Garanta um atendimento humanizado e personalizado dedicado a você!
        </p>

        <a
          href='https://api.whatsapp.com/send?phone=554399689296&text='
          target='_blank'
          className='w-9/12 rounded-full bg-red p-4 text-center text-xl md:text-2xl font-medium text-white transition-all hover:opacity-75 md:w-1/4'
          rel='noreferrer'
        >
          Fale com nosso time
        </a>
      </div>
    </section>
  )
}

export default Contact
