import React from 'react'
import "./PecasAcessorios.css"

export default function PecasAcessorios() {
    return (
        <div className="PecasAcessoriosContainer">
            <section>
                <header>
                    <h2 className='text-4xl md:text-6xl font-bold'>
                        PEÇAS E ACESSORIOS
                    </h2>
                </header>

                <p className='text-2xl'>
                    Na Bacana Motors, comprometemo-nos a fornecer produtos de alta qualidade a preços justos, respaldados por nossa garantia de entrega. Oferecemos uma seleção de peças e acessórios, incluindo capacetes e materiais esportivos para Motocross.                 </p>

                <p className='text-2xl'>
                    Clique no link agora mesmo e eleve sua pilotagem com a Bacana Motors, a  melhor em qualidade e preço justo!
                </p>

                <a href="https://api.whatsapp.com/send?phone=554399689296" target='_blank' rel="noreferrer">CLIQUE AQUI!</a>
            </section>
        </div>
    )
}