"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    products: false,
    postres: false,
    contact: false
  });

  const router = useRouter();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.sidebar-button')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleFilterChange = (filter) => {
    router.push(`/catalog?filter=${filter}`);
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-gray-100/50 rounded-lg transition-colors duration-200 sidebar-button"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 w-72 h-full bg-[#c9cbe8] z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sidebar-container`}
      >
        <div className="flex justify-center py-8 border-b border-gray-100">
          <Link href="/">
            <img
              src="/Logos/cbnlogo.png"
              alt="Cakes by Naty"
              className="h-24 w-auto hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
        <nav className="px-6 py-6 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
          <div className="space-y-3">
            <button
              onClick={() => toggleMenu('products')}
              className="flex items-center w-full group"
            >
              <span className={`transform transition-transform duration-200 ${openMenus.products ? 'rotate-90' : ''}`}>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-baseLavender" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="ml-2 text-lg font-semibold text-gray-800 group-hover:text-[#5e7377] transition-colors">
                Productos
              </span>
            </button>

            {openMenus.products && (
              <div className="ml-4 space-y-3">
                <button
                  onClick={() => toggleMenu('postres')}
                  className="flex items-center w-full group pl-2"
                >
                  <span className={`transform transition-transform duration-200 ${openMenus.postres ? 'rotate-90' : ''}`}>
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-baseLavender" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="ml-2 text-base font-medium text-gray-700 group-hover:text-baseLavender transition-colors">
                    Tipos de Postres
                  </span>
                </button>

                {openMenus.postres && (
                  <div className="ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
                    {[
                      { name: 'Pasteles', filter: 'pasteles' },
                      { name: 'Cupcakes', filter: 'cupcakes' },
                      { name: 'Cakepops', filter: 'cakepops' },
                      { name: 'Chocolates', filter: 'chocolates' },
                      { name: 'Galletas', filter: 'galletas' },
                      { name: 'Espumillas', filter: 'espumillas' }
                    ].map((category) => (
                      <Link
                        key={category.name}
                        href={`/catalog?filter=${category.filter}`}
                        onClick={(e) => {
                          e.preventDefault(); 
                          handleFilterChange(category.filter);
                        }}
                        className="block py-1 text-gray-600 hover:text-baseLavender hover:pl-2 transition-all duration-200 text-sm"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => toggleMenu('contact')}
              className="flex items-center w-full group"
            >
              <span className={`transform transition-transform duration-200 ${openMenus.contact ? 'rotate-90' : ''}`}>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-baseLavender" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="ml-2 text-lg font-semibold text-gray-800 group-hover:text-[#5e7377] transition-colors">
                Contáctanos
              </span>
            </button>

            {openMenus.contact && (
              <div className="ml-6 space-y-2 border-l-2 border-gray-100 pl-4">
                {[
                  ['Instagram', 'https://www.instagram.com/cakes.bynaty/', true],
                  ['Correo', 'mailto:tu_correo@ejemplo.com', false],
                  ['WhatsApp', 'https://wa.me/tu_numero_whatsapp', true]
                ].map(([name, href, isExternal]) => (
                  <Link
                    key={name}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    className="flex items-center text-gray-600 hover:text-baseLavender hover:pl-2 transition-all duration-200 text-sm"
                  >
                    {name}
                    {isExternal && (
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-4 pt-4 mt-4 border-t border-gray-100">
            <Link 
              href="/user" 
              className="block text-lg font-semibold text-gray-800 hover:text-[#5e7377] hover:pl-2 transition-all duration-200"
            >
              Tu Cuenta
            </Link>
            <Link 
              href="/about" 
              className="block text-lg font-semibold text-gray-800 hover:text-[#5e7377] hover:pl-2 transition-all duration-200"
            >
              Sobre Nosotros
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

