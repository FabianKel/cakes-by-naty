import React from 'react';
import Header from './Header';
import Image from 'next/image';

import Cupcake from '../assets/cupcake.svg';
import Pasteles from '../assets/pasteles.svg';
import Galletas from '../assets/galletas.svg';
import Espumillas from '../assets/espumillas.svg';
import Chocolates from '../assets/chocolates.svg';
import Cakepops from '../assets/cakepops.svg';

const products = [
  { image: Cupcake, title: 'Cupcake' },
  { image: Pasteles, title: 'Pasteles' },
  { image: Galletas, title: 'Galletas' },
  { image: Espumillas, title: 'Espumillas' },
  { image: Chocolates, title: 'Chocolates' },
  { image: Cakepops, title: 'Cakepops' }
];

function Menu() {
  return (
    <div className="bg-[#ffffff] min-h-screen p-8">
      {/* Header */}
      <Header />

      {/* Contenido */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-[#e2c2c4] p-4 rounded shadow flex flex-col items-center text-center w-[150px] h-[200px]"
          >
            <div className="flex justify-center items-center mb-2 w-full h-[120px]">
              <Image src={product.image} alt={product.title} width={100} height={100} />
            </div>
            <span className="font-bold text-md">{product.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
