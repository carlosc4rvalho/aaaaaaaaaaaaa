

import React from 'react'
import "./ServicosMecanicos.css"

export default function ServicosMecanicos() {
    return (
        <div id="mecânica" className="ServicosMecanicosContainer">
            <section>
                <header>
                    <h2 className='text-4xl md:text-6xl font-bold'>
                        SERVIÇOS MECÂNICOS
                    </h2>
                </header>

                <p className='text-2xl'>
                    Localizada no subsolo da loja, nossa oficina mecânica reúne uma equipe de profissionais altamente qualificados e experientes, prontos para oferecer uma gama completa de serviços especializados em motocicletas.
                </p>

                <p className='text-2xl'>
                    Garanta não apenas a sua segurança, mas também o tratamento excepcional que sua moto merece. Agende hoje mesmo e experimente a qualidade em duas rodas que só a Bacana Motors proporciona.
                </p>

                <a href="https://api.whatsapp.com/send?phone=554399689296" target='_blank' rel="noreferrer">AGENDE JÁ!</a>
            </section>
        </div>
    )
}