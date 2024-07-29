import React from 'react';
import styles from "./Depoimentos.module.css";
import aspas from "assets/images/aspas.svg";

export default function Depoimentos() {
    return (
        <div className={styles.depoimentosContainer}>
            <header>
                <h2 className='text-4xl md:text-7xl font-bold'>
                DEPOIMENTOS
                </h2>
            </header>

            <div className={styles.depoimentosConteudo}>
                <section className={styles.depoimento}>
                    <img src={aspas} alt="aspas" />
                    <p className='text-2xl md:text-3xl'>"A melhor de toda a região!"</p>
                    <span>- SAMANTHA DORABIATO</span>
                </section>

                <section className={styles.depoimento}>
                    <img src={aspas} alt="aspas" />
                    <p className='text-2xl md:text-3xl'>"Execelente Atendimento!"</p>
                    <span>- JOSÉ CARLOS MARQUES</span>
                </section>

                <section className={styles.depoimento}>
                    <img src={aspas} alt="aspas" />
                    <p className='text-2xl md:text-3xl'>"Muito bom o atendimento, agradeço ao Cleverson que nos atendeu com muita atenção e fez grande esforço para essa conquista da minha filha, obrigado."</p>
                    <span>- ANDERSON FERREIRA</span>
                </section>
            </div>
        </div>
    )
}