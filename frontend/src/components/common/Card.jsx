import React from 'react';
import { useRouter } from 'next/navigation';

import Image from '@/components/common/Image';
import Button from '@/components/common/Button';

function Card({ product, showButton = true }) {
  const router = useRouter();

  return (
    <div className='border p-4 m-1 rounded-md shadow-lg flex flex-col justify-between max-w-sm'>
      <h2 className='text-2xl font-bold mb-2 font-navheader'>{product.productonombre}</h2>
      <div className='flex justify-center items-center h-full mb-4'>
        <Image
          src={product.imagen1}
          alt={product.productonombre}
          className='w-full h-full object-cover rounded-md'
        />
      </div>
      {showButton && ( // Solo se muestra si es true
        <div className='flex justify-center mt-auto'>
          <Button
            className='p-2 bg-Purple text-white rounded-md hover:bg-customBlue2 transition duration-300 font-navheader'
            onClick={() => router.push(`/productos/${product.productoid}`)}
          >
            Ver más
            <svg
              className='ml-2 w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Card;
