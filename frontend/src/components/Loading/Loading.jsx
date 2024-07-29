import React from 'react';

function Loading({ isLoading }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isLoading ? 'visible' : 'invisible'}`}>
      <div className='absolute inset-0 flex items-center justify-center bg-white'>
        <div className='relative flex flex-col items-center gap-2'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-red border-t-gray-300'></div>
          <p className='text-xl font-semibold text-black'>Carregando...</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
