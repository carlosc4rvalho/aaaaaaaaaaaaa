import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Motorcycles.module.css'
import moto1 from 'assets/images/moto1.svg'
import moto2 from 'assets/images/moto2.svg'
import moto3 from 'assets/images/moto3.svg'

export default function Motorcycles() {
  return (
    <section id='motos' className={styles.motorcyclesContainer}>
      <header>
        <h1 className='text-4xl md:text-7xl font-bold'>MOTOS</h1>
      </header>

      <section class={styles.motorcyclesContent}>
        <Link to={'/produtos'}>
          <img src={moto1} alt='' />
          <span>BIS</span>
        </Link>

        <Link to={'/produtos'}>
          <img src={moto2} alt='' />
          <span>CB 300</span>
        </Link>

        <Link to={'/produtos'}>
          <img src={moto3} alt='' />
          <span>BROS</span>
        </Link>
      </section>

      <a href='https://api.whatsapp.com/send?phone=554399689296' target='_blank' rel='noreferrer'>
        SIMULE VALORES
      </a>
    </section>
  )
}
