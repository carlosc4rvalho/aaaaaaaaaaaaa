import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from 'assets/icons/arrowLeft.svg';
import MotorcycleForm from './components/MotorcycleForm';
import HelmetForm from './components/HelmetForm';
import HeaderAdmin from './components/HeaderAdmin';

const MainContent = ({ handleItemClick }) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className='flex min-h-screen items-center w-full flex-col gap-4'>
      <h1 className='m-4 text-3xl font-bold text-black md:text-5xl'>{getTimeOfDay()}, o que vamos Adicionar?</h1>
      <div className='flex w-full flex-wrap justify-center gap-2'>
        {['Motocicleta', 'Capacete', 'Peça', 'Acessório'].map((item) => (
          <div
            key={item}
            className='flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-red md:h-60 md:w-60'
            onClick={() => handleItemClick(item)}
          >
            <p className='text-lg'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductForm = ({ productType, onClose }) => {
  switch (productType) {
    case 'Motocicleta':
      return <MotorcycleForm />;
    case 'Capacete':
      return <HelmetForm />;
    // Adicione outros casos para diferentes tipos de produto, se necessário
    default:
      return null;
  }
};

function Anunciar() {
  const [showModal, setShowModal] = useState(false);
  const [productType, setProductType] = useState('');

  useEffect(() => {
    document.title = 'Bacana Motors - Novo Produto';
  }, []);

  const handleItemClick = (item) => {
    setProductType(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductType('');
  };

  return (
    <main className='flex w-full justify-center items-center flex-col bg-light'>
      <HeaderAdmin title='Publicar' backTo='/admin' />
      {!showModal && <MainContent handleItemClick={handleItemClick} />}
      {showModal && <ProductForm productType={productType} onClose={handleCloseModal} />}
    </main>
  );
}

export default Anunciar;