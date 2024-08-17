"use client";

import React, { useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa'; 

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
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="bg-[#ffffff] min-h-screen p-8">
      <Header />

      <div className="flex mt-8">
        <div className="w-1/4 pr-8">
          <button 
            onClick={toggleCategories} 
            className="font-bold text-lg mb-4 flex items-center"
          >
            <FaBars /> {/* Muestra el ícono de tres líneas */}
          </button>
          {showCategories && (
            <ul className="space-y-4">
              <li className="font-bold text-lg">Productos</li>
              <ul className="pl-4 space-y-2 text-gray-700">
                <li>Novedades</li>
                <li>Temporadas</li>
              </ul>
              <li className="font-bold text-lg">Tipos de postres</li>
              <ul className="pl-4 space-y-2 text-gray-700">
                <li>Pasteles</li>
                <li>Cupcakes</li>
                <li>Cakepops</li>
                <li>Chocolates</li>
                <li>Galletas</li>
                <li>Espumillas</li>
              </ul>
              <li className="font-bold text-lg">Ocasiones</li>
              <ul className="pl-4 space-y-2 text-gray-700">
                <li>Cumpleaños</li>
                <li>Aniversario</li>
                <li>Navidad</li>
              </ul>
              <li className="font-bold text-lg">Personalizar</li>
              <li className="font-bold text-lg">Tu cuenta</li>
              <li className="font-bold text-lg">Sobre Nosotros</li>
              <li className="font-bold text-lg">Contáctanos</li>
            </ul>
          )}
        </div>

        <div className="w-3/4 flex flex-wrap justify-center gap-4">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="bg-[#e2c2c4] p-4 rounded shadow flex flex-col items-center text-center w-[120px] h-[180px]"
            >
              <div className="flex justify-center items-center mb-2 w-full h-[100px]">
                <Image src={product.image} alt={product.title} width={80} height={80} />
              </div>
              <span className="font-bold text-sm">{product.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
