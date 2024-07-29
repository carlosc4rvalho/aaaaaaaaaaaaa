import React from 'react'

function OrderBy({ onChange }) {
  const categories = [
    { id: 'null', name: 'Ordenar por...' },
    { id: 'asc', name: 'Menor preço' },
    { id: 'desc', name: 'Maior preço' },
  ]

  const handleOptionChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <select
      onChange={handleOptionChange}
      className='border-2 border-gray-300 flex w-1/3 cursor-pointer appearance-none items-center justify-between gap-2 truncate rounded-xl bg-white p-5 text-base font-medium leading-tight text-gray-900'
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}

export default OrderBy
