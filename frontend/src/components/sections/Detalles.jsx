"use client";

import React from 'react';
import Image from 'next/image';
import useModal from 'src/hooks/useModal';
import Modal from '../common/Modal';
import { handleAction } from 'src/handlers/handleAction';

const product = {
  image: '/Espumillas.jpg', 
  title: 'Espumillas',
  description: 'Espumillas bla bla bla bla bla bla bla bla bla bla bla bla'
};

function ProductDetails() {

  const { isOpen, openModal, closeModal, agree } = useModal();

  return (
    <div className="bg-[#ffffff] min-h-screen p-8 relative">
      <div className="relative mt-6 flex flex-col items-center">
        <div className="absolute top-4 left-4 z-10">
          <a className="text-blue-600 hover:text-blue-900 hover:cursor-pointer">Pa trás</a>
        </div>

        <div className="text-center text-2xl font-bold mb-6 text-[#000000]">
          Paquete de Espumillas
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
            <h1 className="text-3xl font-bold mb-4 text-[#000000]">{product.title}</h1>
            <p className="text-lg mb-6">{product.description}</p>
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