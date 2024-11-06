"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isPostresOpen, setIsPostresOpen] = useState(false);
  const [isOcasionesOpen, setIsOcasionesOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const togglePostres = () => {
    setIsPostresOpen(!isPostresOpen);
  };

  const toggleOcasiones = () => {
    setIsOcasionesOpen(!isOcasionesOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 font-bold text-lg mb-4 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-sidebarPurple z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-center py-6">
          <Link href="/">
            <img src="Logos/cbnlogo.png" alt="Cakes by Naty" className="h-24 w-auto mt-6 hover:scale-105 transition-transform duration-300" />
          </Link>
        </div>

        <div className="flex flex-col justify-start h-full p-6">
          <div className="mt-2">
            <ul className="space-y-4">
              <li className="font-bold text-lg">
                <button onClick={toggleProducts} className="flex items-center w-full hover:scale-105 transition-transform duration-300">
                  <span
                    className={`mr-2 text-gray-800 transition-transform duration-300 ${isProductsOpen ? 'rotate-90' : 'rotate-0'
                      }`}
                  >
                    ▶
                  </span>
                  Productos
                </button>
                {isProductsOpen && (
                  <ul className="pl-4 space-y-2 text-gray-700 mt-2">
                    <li className="font-normal text-base">
                    </li>
                    <li>
                      <button onClick={togglePostres} className="flex items-center w-full hover:scale-105 transition-transform duration-300">
                        <span
                          className={`mr-2 text-gray-800 transition-transform duration-300 ${isPostresOpen ? 'rotate-90' : 'rotate-0'
                            }`}
                        >
                          ▶
                        </span>
                        Tipos de Postres
                      </button>
                      {isPostresOpen && (
                        <ul className="pl-4 space-y-2 text-gray-700">
                          <li className="font-normal text-base">
                            <Link href="/catalog/pasteles" className="block w-full hover:text-hoverPink">
                              Pasteles
                            </Link>
                          </li>
                          <li className="font-normal text-base">
                            <Link href="/catalog/cupcakes" className="block w-full hover:text-hoverPink">
                              Cupcakes
                            </Link>
                          </li>
                          <li className="font-normal text-base ">
                            <Link href="/catalog/cakepops" className="block w-full hover:text-hoverPink">
                              Cakepops
                            </Link>
                          </li>
                          <li className="font-normal text-base ">
                            <Link href="/catalog/chocolates" className="block w-full hover:text-hoverPink">
                              Chocolates
                            </Link>
                          </li>
                          <li className="font-normal text-base ">
                            <Link href="/catalog/galletas" className="block w-full hover:text-hoverPink">
                              Galletas
                            </Link>
                          </li>
                          <li className="font-normal text-base ">
                            <Link href="/catalog/espumillas" className="block w-full hover:text-hoverPink">
                              Espumillas
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      <button onClick={toggleOcasiones} className="flex items-center w-full hover:scale-105 transition-transform duration-300">
                        <span
                          className={`mr-2 text-gray-800 transition-transform duration-300 ${isOcasionesOpen ? 'rotate-90' : 'rotate-0'
                            }`}
                        >
                          ▶
                        </span>
                        Ocasiones
                      </button>
                      {isOcasionesOpen && (
                        <ul className="pl-4 space-y-2 text-gray-700">
                          <li className="font-normal text-base hover:text-hoverPink">
                            <Link href="/catalog/cumpleanos" className="block w-full">
                              Cumpleaños
                            </Link>
                          </li>
                          <li className="font-normal text-base hover:text-hoverPink">
                            <Link href="/catalog/navidad" className="block w-full">
                              Navidad
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
              <li className="font-bold text-lg text-gray-800">
                <Link href="/account" className="block w-full hover:text-customPink1 hover:scale-105 transition-transform duration-300">
                  Tu Cuenta
                </Link>
              </li>
              <li className="font-bold text-lg text-gray-800">
                <Link href="/about" className="block w-full hover:text-customPink1 hover:scale-105 transition-transform duration-300">
                  Sobre Nosotros
                </Link>
              </li>
              <li className="font-bold text-lg text-gray-800">
                <Link href="/contact" className="block w-full hover:text-customPink1 hover:scale-105 transition-transform duration-300">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto"></div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
