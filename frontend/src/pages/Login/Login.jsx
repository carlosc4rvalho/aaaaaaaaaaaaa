import React, { useEffect } from 'react'

function Login() {
  useEffect(() => {
    document.title = 'Bacana Motors - Login'
  }, [])

  return (
    <main className='bg-url h-screen bg-cover bg-center'>
      <section className='flex h-full items-center justify-center'>
        <form className='rounded-lg bg-white p-8 shadow-md'>
          <header className='mb-4'>
            <h2 className='text-2xl font-bold text-gray-800'>Bem-vindo de volta</h2>
            <p className='text-gray-600'>É bom vê-lo novamente! Vamos fazer você entrar.</p>
          </header>

          <div className='mb-4'>
            <label htmlFor='email' className='mb-1 block text-gray-800'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              className='w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none'
              placeholder='example@gmail.com'
              required
              autoComplete='off'
            />
          </div>

          <div className='mb-6'>
            <button
              type='submit'
              className='w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none'
            >
              Continuar
            </button>
          </div>

          <div>
            Não possui uma conta?{' '}
            <a href='#' className='text-blue-500 hover:underline'>
              Entre em contato
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login
