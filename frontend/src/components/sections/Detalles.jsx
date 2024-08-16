import React from 'react';
import Header from './Header';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const product = {
  image: '../assets/pastel.png', 
  title: 'Cupcake',
  description: 'Pastel de chocolate con relleno de dulce de leche. Decorado con crema de mantequilla'
};

function ProductDetails() {
  return (
    <div className="bg-[#ffffff] min-h-screen p-8">
      {/* Header */}
      <Header color="#da97ed" />

      {/* Contenido */}
      <div className="relative mt-6 flex flex-col items-center">
        {/* Flecha de regresar */}
        <div className="absolute top-4 left-4 z-10">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" className="text-black cursor-pointer" />
        </div>

        {/* Categoría */}
        <div className="text-center text-2xl font-bold mb-6 text-[#000000]">
          Pastel de cumpleaños
        </div>

        {/* Contenido del producto */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full md:w-3/4">
          {/* Imagen del producto */}
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

          {/* Descripción del producto */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4 text-[#000000]">{product.title}</h1>
            <p className="text-lg mb-6">{product.description}</p>
          </div>
        </div>

        {/* Botón de Pedir */}
        <div className="mt-8">
          <button className="bg-[#e2c2c4] text-black py-3 px-6 rounded-lg shadow-lg hover:bg-[#000000] text-lg">
            Pedir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
