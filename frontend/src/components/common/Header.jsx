'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { getCurrentUser } from '@/utils/functions';
import { logout } from '@/utils/https';
import { useRouter } from 'next/navigation';
import Popover from './Popover';

function Header() {
  const router = useRouter();
  const [productsInMyCart, setProductsInMyCart] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    setCurrentUser(getCurrentUser());
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:4000/carts/${currentUser.id}/`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const productsInMyCart = data.reduce((acc, item) => acc + item.cantidad, 0);
            localStorage.setItem('productsInMyCart', productsInMyCart);
            window.dispatchEvent(new Event('storage'));
          } else {
            console.error('Formato de datos incorrecto', data);
          }
        })
        .catch((error) => {
          console.error('Error al cargar el carrito:', error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    window.addEventListener('storage', () => {
      const productsInMyCart = localStorage.getItem('productsInMyCart');
      setProductsInMyCart(+productsInMyCart);
    });
  }, []);

  const handleLogout = () => {
    const result = logout();
    if (result) {
      localStorage.setItem('productsInMyCart', 0);
      window.dispatchEvent(new Event('storage'));
      router.push('/');
    }
  };

  if (!isMounted) return null;

  return (
    <header className='flex flex-col md:flex-row justify-between items-center p-2 sm:p-4 md:p-6 bg-baseLilac'>
      <div className='flex justify-center md:justify-start w-full md:w-auto'>
        <Link href='/'>
          <img
            src='Logos/cbnlogo.png'
            alt='Cakes by Naty'
            className='h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 hover:scale-105 transition-transform duration-300'
          />
        </Link>
      </div>

      <nav className='flex flex-wrap justify-center md:justify-end w-full md:w-auto mt-2 sm:mt-4 md:mt-0'>
        <ul className='flex flex-wrap space-x-2 sm:space-x-4 md:space-x-6 items-center'>
          <li className='flex items-center'>
            <a href='https://www.instagram.com/cakes.bynaty/' target='_blank' rel='noopener noreferrer'>
              <Icon
                src='/instagram.svg'
                alt='Instagram'
                height='8'
                width='8'
                className='mr-2 sm:mr-3 md:mr-8 transition-transform transform hover:scale-110'
              />
            </a>
            <Link
              href='/catalog'
              className='text-xs sm:text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo transition-transform transform hover:scale-105 font-navheader'
            >
              Catálogo
            </Link>
          </li>

          <li className='flex items-center'>
            <Link
              href='/about'
              className='text-xs sm:text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo hover:scale-105 font-navheader'
            >
              Sobre Nosotros
            </Link>
          </li>

          <li className='flex items-center'>
            {currentUser?.id ? (
              <Popover handleLogout={handleLogout} />
            ) : (
              <Link
                href='/login'
                className='text-xs sm:text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo font-navheader ml-1 sm:ml-2'
              >
                Iniciar Sesión
              </Link>
            )}
            <a href='/Carrito'>
              <Icon
                src='/shopping-cart.svg'
                alt='Carrito'
                height='8'
                width='8'
                counts={productsInMyCart}
                className='ml-2 sm:ml-3 md:ml-6 transition-transform transform hover:scale-110'
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
