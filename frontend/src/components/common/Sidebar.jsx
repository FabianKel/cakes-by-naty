"use client";

import React, { useState } from 'react';


function Sidebar() {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="bg-[#ffffff] min-h-screen px-8">
      <div className="flex mt-8">
        <div className="w-1/4 pr-8">
          <button 
            onClick={toggleCategories} 
            className="font-bold text-lg mb-4 flex items-center"
          >
          <a className='text-3xl'>tres rayas :D</a>
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
      </div>
    </div>
  );
}

export default Sidebar;
