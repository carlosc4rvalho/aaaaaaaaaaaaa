import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productService from 'services/productService';
import Loading from 'components/Loading'; // Ajuste o caminho conforme necessário

const ItemTypes = {
  IMAGE: 'image',
};

const categories = [
  { id: 1, name: 'motos' },
  { id: 2, name: 'capacetes' },
  { id: 3, name: 'peças' },
  { id: 4, name: 'acessórios' },
  { id: 5, name: 'honda' },
  { id: 6, name: 'yamaha' },
  { id: 7, name: 'street' },
  { id: 8, name: 'scooter' },
  { id: 9, name: 'adventure' },
  { id: 10, name: 'sport' },
  { id: 11, name: 'off-road' },
  { id: 12, name: 'touring' },
];

const ImageCard = ({ image, index, moveImage, handleRemoveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover: (item) => {
      if (item.index === index) return;
      moveImage(item.index, index);
      item.index = index;
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`group relative transform cursor-grab rounded-xl border-2 border-gray-200 transition-transform ease-in-out ${isDragging ? 'opacity-50' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <picture className='relative'>
        <img src={URL.createObjectURL(image)} alt={`Imagem ${index}`} loading='lazy' className='h-36 w-36 rounded-xl object-cover' />
      </picture>
      <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100'>
        Arraste e solte para reordenar
      </div>
      <button
        type='button'
        className='absolute right-2 top-2 cursor-pointer rounded-md bg-red-600 p-1 text-xs text-white transition-opacity ease-in-out opacity-0 group-hover:opacity-100'
        onClick={() => handleRemoveImage(index)}
      >
        Remover
      </button>
    </div>
  );
};

const HelmetForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCategories = watch('categories') || [];

  const onSubmit = async (data) => {
    if (selectedCategories.length === 0) {
      setError('categories', { type: 'manual', message: 'Selecione pelo menos uma categoria.' });
      return;
    }
    if (images.length === 0) {
      setError('images', { type: 'manual', message: 'Adicione pelo menos uma imagem.' });
      return;
    }
    clearErrors(['categories', 'images']);

    setIsLoading(true);
    const productData = {
      ...data,
      categoryIds: selectedCategories.join(','),
    };

    try {
      await productService.createProduct(productData, images);
      toast.success('Capacete criado com sucesso!');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2500);
    } catch (error) {
      toast.error('Erro ao criar capacete.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const newImages = Array.from(e.target.files);
    const validImages = [];
    const newErrors = {};

    for (const file of newImages) {
      if (file.size > 20 * 1024 * 1024) { // 20MB
        newErrors.images = 'A imagem deve ter no máximo 20MB.';
        continue;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = () => {
          if (img.width === img.height) {
            validImages.push(file);
          } else {
            newErrors.images = 'A imagem deve ser no formato 1x1.';
          }
          resolve();
        };
      });
    }

    if (newErrors.images) {
      setError('images', { type: 'manual', message: newErrors.images });
    } else {
      setImages((prevImages) => [...prevImages, ...validImages]);
      clearErrors('images');
    }
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = Array.from(images);
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      <DndProvider backend={HTML5Backend}>
        <section className='m-4 flex flex-col gap-4 rounded-xl border-2 border-gray-300 bg-white p-4 text-black w-11/12 md:w-1/2'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <header>
              <h2 className='text-2xl font-semibold'>Adicionar Capacete</h2>
            </header>

            {/* Nome do capacete */}
            <div className='flex flex-col gap-2'>
              <label className='font-medium' htmlFor='name'>Nome</label>
              <input
                className='rounded-xl bg-gray-200 p-4'
                type='text'
                id='name'
                placeholder='Ex: Capacete Arai'
                {...register('name', { required: 'Nome é obrigatório' })}
              />
              {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </div>

            {/* Preço do capacete */}
            <div className='flex flex-col gap-2'>
              <label className='font-medium' htmlFor='price'>Preço</label>
              <input
                className='rounded-xl bg-gray-200 p-4'
                type='text'
                id='price'
                placeholder='Ex: 500'
                {...register('price', { required: 'Preço é obrigatório' })}
              />
              {errors.price && <span className='text-red-500'>{errors.price.message}</span>}
            </div>

            {/* Cor do capacete */}
            <div className='flex flex-col gap-2'>
              <label className='font-medium' htmlFor='color'>Cor</label>
              <input
                className='rounded-xl bg-gray-200 p-4'
                type='text'
                id='color'
                placeholder='Ex: Preto'
                {...register('color', { required: 'Cor é obrigatória' })}
              />
              {errors.color && <span className='text-red-500'>{errors.color.message}</span>}
            </div>

            {/* Descrição do capacete */}
            <div className='flex flex-col gap-2'>
              <label className='font-medium' htmlFor='description'>Descrição</label>
              <textarea
                className='rounded-xl bg-gray-200 p-4'
                id='description'
                placeholder='Descrição detalhada do capacete'
                {...register('description')}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium' htmlFor='categories'>Categorias</label>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {categories.map((category) => (
                  <label key={category.id} className='flex items-center bg-white border-2 p-2 rounded-lg border-gray cursor-pointer'>
                    <input
                      type='checkbox'
                      value={category.id}
                      {...register('categories')}
                    />
                    <span className='ml-2'>{category.name}</span>
                  </label>
                ))}
              </div>
              {errors.categories && <span className='text-red-500'>{errors.categories.message}</span>}
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-red p-4 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all min-h-32'
                htmlFor='images'
              >
                <input
                  id='images'
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='opacity-0 absolute'
                  multiple
                />
                <span className='text-center text-gray-700'>
                  Formatos aceitos: JPG, JPEG, PNG e WEBP. Máximo de 20MB por imagem. Formato 1x1.
                </span>
              </label>
              {errors.images && <span className='text-red-500'>{errors.images.message}</span>}
            </div>

            {images.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {images.map((image, index) => (
                  <ImageCard
                    key={index}
                    index={index}
                    image={image}
                    moveImage={moveImage}
                    handleRemoveImage={handleRemoveImage}
                  />
                ))}
              </div>
            )}

            <button
              type='submit'
              className='rounded-xl bg-green px-6 py-3 text-white'
            >
              Adicionar
            </button>
          </form>
        </section>
      </DndProvider>
      <ToastContainer />
    </>
  );
};

export default HelmetForm;