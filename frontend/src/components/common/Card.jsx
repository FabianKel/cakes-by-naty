import React from 'react';
import { useRouter } from 'next/navigation';
import Image from '@/components/common/Image';
import Button from '@/components/common/Button';

function Card({ product, showButton = true, isNew }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between mx-4 mb-6 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-[1.02] group">
      <div className="p-4">
        <div className="relative overflow-hidden rounded-xl mb-4">
          {isNew && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                Nuevo
              </span>
            </div>
          )}
          
          <div className="h-52 overflow-hidden">
            <Image
              src={product.imagen1}
              alt={product.productonombre}
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </div>

        <h2 className="text-lg font-bold mb-3 font-hsubtitles text-center text-gray-800 pt-2"> 
          {product.productonombre}
        </h2>
      </div>

      {showButton && (
        <div className="px-4 pb-4">
          <Button
            className="w-full p-3 bg-baseLavender text-white rounded-lg hover:bg-subtitlesPink transition-all duration-300 font-navheader flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={() => router.push(`/productos/${product.productoid}`)}
          >
            Ver más
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Card;


