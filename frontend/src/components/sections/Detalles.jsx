'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useModal from 'src/hooks/useModal';
import Modal from '../common/Modal';
import { handleAction } from 'src/handlers/handleAction';
import links from '@/utils/links';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import { getUsuario } from '@/utils/https';
import LoginSection from './LoginSection';

const ProductDetails = ({ id }) => {
const router = useRouter();

const { isOpen, openModal, closeModal, agree } = useModal();
const [product, setProduct] = useState(undefined);
const [usuario, setUsuario] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = getAuthToken();
  const currentUser = getCurrentUser();

  if (token && currentUser) {
    setIsAuthenticated(true);
    const fetchData = async () => {
      try {
        const user = await getUsuario(currentUser.id);
        setUsuario(user.usuario); 
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  } else {
    setLoading(false);
  }
}, []);

const handleGoBack = () => {
  router.back();
};

const handleAddToCart = async () => {
  if (!usuario || !product) {
    console.error('Usuario o producto no disponible');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/carts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioid: usuario.usuarioid, 
        productoid: product.productoid, 
        cantidad: 1, 
        personalizacionid: null, 
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Producto agregado al carrito exitosamente:', data);
      alert('Producto agregado al carrito');
    } else {
      console.error('Error al agregar el producto al carrito:', data);
      alert('Error al agregar el producto al carrito');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

// Obtener el producto por ID
useEffect(() => {
  if (id) {
    const fetchLink = `${links.producto}/${id}`;
    fetch(fetchLink)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.producto); // Asegúrate de acceder al campo 'producto'
      })
      .catch((error) => console.error('Error fetching product:', error));
  }
}, [id]);

  
if (loading) {
  return <div>Cargando...</div>; 
}

if (!isAuthenticated) {
  return <LoginSection />; 
}

return (
  <div className='min-h-screen p-4 md:p-8'>
  {product && (
    <div className='relative mt-6 flex flex-col items-center bg-[#ffffff] bg-opacity-80 p-8 rounded-lg'>
      <div className='absolute top-4 left-4 z-10'>
        <button
          onClick={handleGoBack}
          className='text-black text-4xl focus:outline-none hover:text-gray-700'
        >
          &larr;
        </button>
      </div>

      <div className='text-center text-2xl font-bold mb-6 text-[#000000]'>{product.productonombre}</div>

      <div className='flex flex-col md:flex-row items-center justify-center gap-8 w-full md:w-3/4'>
        <div className='bg-[#e2c2c4] p-4 rounded shadow-lg flex justify-center items-center w-full md:w-1/2'>
          <div className='relative w-full h-0' style={{ paddingBottom: '100%' }}>
            <Image
              src={product.imagen1}
              alt={product.productonombre}
              layout='fill'
              objectFit='cover'
              className='rounded'
            />
          </div>
        </div>

        <div className='w-full md:w-1/2 text-center md:text-left'>
          <h1 className='text-3xl font-bold mb-2 text-[#000000]'>{product.productonombre}</h1>
          <p className='text-lg font-bold mb-2'>{product.descripcion}</p>
          {product.ocasion !== 'Indefinida' && (
            <span className='inline-block bg-[#e2c2c4] text-black py-1 px-3 rounded-full text-sm font-semibold mb-4'>
              {product.ocasion}
            </span>
          )}
          <p className='text-lg font-bold mb-4'>Tipo de masa: {product.masanombre}</p>
          <p className='text-lg font-bold mb-4'>Cobertura: {product.coberturatipo}</p>
          <p className='text-lg font-bold mt-4'>Precio: Q. {parseFloat(product.precio).toFixed(2)}</p>
        </div>
      </div>

      <div className='absolute bottom-8 right-8 flex space-x-4'>
        <button
          className='bg-[#e2c2c4] text-black py-3 px-6 rounded-lg shadow-lg hover:bg-hoverPink text-lg'
          onClick={handleAddToCart}
        >
          Agregar
        </button>

        <Modal
          isOpen={isOpen}
          onCancel={closeModal}
          onAgree={agree}
          msg='¿Estás seguro de que deseas realizar esta acción?'
          type='alert'
        />
      </div>
    </div>
  )}
  </div>
  );
};

export default ProductDetails;
