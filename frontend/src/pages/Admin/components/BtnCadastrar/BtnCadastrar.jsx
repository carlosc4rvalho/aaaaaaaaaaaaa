import React, { Link } from 'react-router-dom'

function BtnCadastrar() {
  return (
    <Link to={'/anunciar'}>
      <button className='fixed bottom-5 right-5 rounded-full bg-green p-4 text-xl font-medium md:text-2xl'>
        + Novo produto
      </button>
    </Link>
  )
}

export default BtnCadastrar
