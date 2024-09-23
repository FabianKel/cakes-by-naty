'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useModal from 'src/hooks/useModal';
import Modal from '../common/Modal';
import { handleAction } from 'src/handlers/handleAction';

const product = {
  id: 4,
  image: '/Pasteles/C70.jpg', 
  title: 'Pastel de Cumpleaños',
  additionalInfo: 'Pastel de 35 porciones',
  occasionTag: 'Cumpleaños',
  description: 'Delicioso pastel relleno de dulce de leche, perfecto para celebrar tu día especial.',
  baseType: 'Masa de chocolate',
  frosting: 'Decorado con crema de mantequilla',
  price: 350.00,
  quantity: 1
};

function ProductDetails() {
   
  const { isOpen, openModal, closeModal, agree } = useModal();

  const router = useRouter(); 

  const handleGoBack = () => {
    router.back(); 
  };

  const handleAddToCart = () => {
    const storedDesserts = JSON.parse(localStorage.getItem('desserts')) || [];
    const updatedDesserts = [...storedDesserts, product];
    localStorage.setItem('desserts', JSON.stringify(updatedDesserts));
    console.log(`${product.title} agregado al carrito`); 
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        backgroundImage: "url('/Fondos/Fondo1.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative mt-6 flex flex-col items-center bg-[#ffffff] bg-opacity-80 p-8 rounded-lg">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={handleGoBack} 
            className="text-black text-4xl focus:outline-none hover:text-gray-700"
          >
            &larr; 
          </button>
        </div>

        <div className="text-center text-2xl font-bold mb-6 text-[#000000]">
          {product.title}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full md:w-3/4">
          <div className="bg-[#e2c2c4] p-4 rounded shadow-lg flex justify-center items-center w-full md:w-1/2">
            <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-[#000000]">{product.title}</h1>
            <p className="text-lg font-bold mb-2">{product.additionalInfo}</p>
            <span className="inline-block bg-[#e2c2c4] text-black py-1 px-3 rounded-full text-sm font-semibold mb-4">
              {product.occasionTag}
            </span>
            <p className="text-lg font-bold mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">Tipo de masa: {product.baseType}</p>
            <p className="text-lg font-bold mb-4">{product.frosting}</p>
            <p className="text-lg font-bold mt-4">Precio: Q. {product.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex space-x-4">
          <button 
            onClick={() => handleAction('http://localhost:4000/pedidos/9', 'DELETE', openModal, closeModal, agree)} 
            className="bg-customPink1 text-black py-3 px-6 rounded-lg shadow-lg hover:bg-hoverPink text-lg">
            Eliminar el 9
          </button>
          
          <button 
            onClick={() => handleAction('http://localhost:4000/pedidos/10', 'DELETE', openModal, closeModal, agree)} 
            className="bg-customPink1 text-black py-3 px-6 rounded-lg shadow-lg hover:bg-hoverPink text-lg">
            Eliminar el 10

          <button 
            className="bg-[#e2c2c4] text-black py-3 px-6 rounded-lg shadow-lg hover:bg-hoverPink text-lg"
            onClick={handleAddToCart}
          >
            Agregar
          </button>

          <Modal
            isOpen={isOpen}
            onCancel={closeModal}
            onAgree={agree}
            msg="¿Estás seguro de que deseas realizar esta acción?"
            type="alert"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;