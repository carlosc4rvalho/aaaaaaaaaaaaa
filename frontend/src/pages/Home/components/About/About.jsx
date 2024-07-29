import React from 'react'
import styles from './About.module.css'

export default function About() {
  return (
    <div id='quem-somos' className={styles.aboutContainer}>
      <article>
        <h2 className='text-4xl font-bold text-red md:text-6xl'>NOSSA <br /> HISTORIA</h2>

        <p className='text-3xl'>
          A Bacana Motors está situada em São João do Ivaí desde 2010 e vem garantindo a toda região do Vale do Ivaí a
          qualidade em duas rodas.
        </p>

        <a href='https://api.whatsapp.com/send?phone=554399689296' target='_blank' rel='noreferrer'>
          WHATSAPP
        </a>
      </article>

      <section>
        <div>
          <h2 className='text-4xl md:text-5xl font-bold text-red'>MISSÃO</h2>

          <p className='text-2xl'>
            Atuar no mercado de motocicletas, peças, acessórios e serviços de forma personalizada e com compromisso de
            excelência junto aos clientes, sendo referência de qualidade em duas rodas.
          </p>
        </div>

        <div>
          <h2 className='text-4xl md:text-5xl font-bold text-red'>VISÃO</h2>

          <p className='text-2xl'>
            Ser reconhecida como a melhor loja de revendas de motos multimarcas, peças, acessórios e prestação de
            serviços em duas rodas na região do Vale do Ivaí.
          </p>
        </div>

        <div>
          <h2 className='text-4xl md:text-5xl font-bold text-red'>VALORES</h2>

          <p className='text-2xl'>
            A família Bacana Motors cultiva o respeito à vida e a gratidão a Deus, prima pela transparência e
            honestidade, garantindo a credibilidade e confiança junto aos nossos clientes desde 2010.S{' '}
          </p>
        </div>
      </section>
    </div>
  )
}
