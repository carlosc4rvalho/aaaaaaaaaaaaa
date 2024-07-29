import React from 'react';
import styles from './Footer.module.css';
import whatsapp from '../../assets/icons/whatsapp-transparent.svg'
import telephone from '../../assets/icons/telephone-icon.svg'
import email from '../../assets/icons/email-icon.svg'
import location from '../../assets/icons/location-icon.svg'
import facebook from '../../assets/icons/facebook-icon.svg'
import instagram from '../../assets/icons/instagram-icon.svg'


export default function Footer() {
  return (
    <footer id='contato' className={styles.footerContainer}>
      <section className={styles.footerContent}>
        <article className={styles.footerColumn}>
          <header>Intitucional</header>
          <ul>
            <li><a className={styles.item} href='#motos'>Nossas Motos</a></li>
            <li><a className={styles.item} href='#sobre'>Sobre nós</a></li>
            <li><a className={styles.item} href='#mecanica'>Serviços</a></li>
            <li><a className={styles.item} href='#contato'>Contato</a></li>
          </ul>
        </article>

        <article className={styles.footerColumn}>
          <header>Contato</header>
          <ul>
            <li>
              <img src={whatsapp} width={28} height={28} alt='whatsapp' />
              <span>
                <a className={styles.item} href='https://api.whatsapp.com/send?phone=554399689296' target="_blank">(43) 99968-9296</a>
              </span>
            </li>
            <li>
              <img src={telephone} width={28} height={28} alt='telephone' />
              <span>
                <a className={styles.item} href='tel:+554399247887' target="_blank">(43) 99924-7887</a>
              </span>
            </li>
            <li>
              <img src={email} width={28} height={28} alt='email' />
              <span>
                <a className={styles.item} href='malito:bacanamotosji@hotmail.com' target="_blank">bacanamotosji@hotmail.com</a>
              </span>
            </li>
            <li>
              <img src={location} width={28} height={28} alt='location' />
              <span>
                <a className={styles.item} href='https://maps.app.goo.gl/UaGkFi2CHwK2Yza16' target="_blank">São João do Ivaí, PR</a>
              </span>
            </li>
          </ul>
        </article>

        <article className={styles.footerColumn}>
          <header>Onde nos Encontrar</header>
          <ul>
            <li>
              <a href="https://www.facebook.com/bacanamotors/" target='_blank'>
                <img src={facebook} alt='facebook' width={40} height={40} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/bacanamotors/" target='_blank'>
                <img src={instagram} alt='instagram' width={40} height={40} />
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=554399689296" target='_blank'>
                <img src={whatsapp} alt='whatsapp' width={40} height={40} />
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section className={styles.copyright}>
        <a href='https://dorac.com.br' target='_blank'>Desenvolvido por Agência Dorac</a>
        <a href='https://bacanamotors.com.br'>Bacana Motors - Copyright &copy; 2024 - Todos os Direitos Reservados.</a>
        <a href='#' target='_blank'>Politica de Privacidade</a>
      </section>
    </footer >
  );
}
