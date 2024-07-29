import React from 'react';

function ProductTable({ products, onSelectAll, onSelectProduct, selectedProducts }) {
  const handleRowClick = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    onSelectProduct(productId, !isSelected);
  };

  if (!Array.isArray(products)) {
    return null;
  }

  return (
    <>
      {/* Tabela completa para desktop */}
      <div className='hidden w-full overflow-hidden rounded-xl border-2 border-gray-300 bg-white md:block'>
        <table className='w-full'>
          <thead>
            <tr className='bg-white'>
              <th className='p-4'>
                <input
                  type='checkbox'
                  onChange={(e) => onSelectAll(e.target.checked)}
                  checked={selectedProducts.length === products.length}
                  className='h-4 w-4 accent-green cursor-pointer'
                />
              </th>
              <th className='truncate p-4 font-semibold text-dark'>Nome</th>
              <th className='truncate p-4 font-semibold text-dark'>Preço</th>
              <th className='truncate p-4 font-semibold text-dark'>Quilometragem</th>
              <th className='truncate p-4 font-semibold text-dark'>Cilindrada</th>
              <th className='truncate p-4 font-semibold text-dark'>Freios</th>
              <th className='truncate p-4 font-semibold text-dark'>Transmissão</th>
              <th className='truncate p-4 font-semibold text-dark'>Combustível</th>
              <th className='truncate p-4 font-semibold text-dark'>Cor</th>
              <th className='truncate p-4 font-semibold text-dark'>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={`${product.is_active === false ? 'bg-yellow-500 bg-opacity-75' : ''}`}
                onClick={() => handleRowClick(product.id)}
              >
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>
                  <input
                    type='checkbox'
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => onSelectProduct(product.id, e.target.checked)}
                    className='h-4 w-4 accent-green cursor-pointer'
                  />
                </td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.name}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.price}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.mileage}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.displacement}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.brakes}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.transmission}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.fuel}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.color}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.is_active ? 'Ativo' : 'Desativado'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela simplificada para dispositivos móveis */}
      <div className='block w-full overflow-hidden rounded-xl border-2 border-gray-300 bg-white md:hidden'>
        <table className='w-full'>
          <thead className='hidden'>
            <tr>
              <th>
                <input
                  type='checkbox'
                  onChange={(e) => onSelectAll(e.target.checked)}
                  checked={selectedProducts.length === products.length}
                  className='h-4 w-4 accent-green cursor-pointer'
                />
              </th>
              <th className='truncate p-2 font-semibold text-dark'>Nome</th>
              <th className='truncate p-2 font-semibold text-dark'>Preço</th>
              <th className='truncate p-2 font-semibold text-dark'>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={`${product.is_active === false ? 'bg-yellow-500 bg-opacity-75' : ''}`}
                onClick={() => handleRowClick(product.id)}
              >
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>
                  <input
                    type='checkbox'
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => onSelectProduct(product.id, e.target.checked)}
                    className='h-4 w-4 accent-green cursor-pointer'
                  />
                </td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.name}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.price}</td>
                <td className='cursor-pointer text-center p-4 text-xs text-dark'>{product.is_active ? 'Ativo' : 'Desativado'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductTable;
