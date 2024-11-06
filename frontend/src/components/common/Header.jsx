'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { getCurrentUser } from '@/utils/functions';
import { logout } from '@/utils/https';
import { useRouter } from 'next/navigation';

import Popover from './Popover';

function Header() {
  const [isAuth, setIsAuth] = useState(null);
  const router = useRouter();
  let currentUser = getCurrentUser();
  const [productsInMyCart, setProductsInMyCart] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuth(user);

    if (user && user.id) {
      fetch(`http://localhost:4000/carts/${user.id}/`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            console.log('data: ', data);
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
  }, []);

  useEffect(() => {
    window.addEventListener('storage', () => {
      const productsInMyCart = localStorage.getItem('productsInMyCart');
      console.log('productsInMyCart', productsInMyCart);
      setProductsInMyCart(+productsInMyCart);
    });
  }, []);

  const handleLogout = () => {
    const result = logout();
    if (result) {
      setIsAuth(null);
      router.push('/');
    }
  };

  return (
    <header className='flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-baseLilac'>
      <div className='flex justify-center md:justify-start w-full md:w-auto'>
        <Link href='/'>
          <img
            src='Logos/cbnlogo.png'
            alt='Cakes by Naty'
            className='h-16 w-16 md:h-16 md:w-16 hover:scale-105 transition-transform duration-300'
          />
        </Link>
      </div>
      
      <nav className='flex flex-wrap justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0'>
        <ul className='flex flex-wrap space-x-4 md:space-x-6 items-center'>
          <li className='flex items-center'>
            <a 
              href='https://www.instagram.com/cakes.bynaty/' 
              target='_blank' 
              rel='noopener noreferrer'
            >
              <Icon
                src='/instagram.svg'
                alt='Instagram'
                height='8'
                width='8'
                className='mr-4 md:mr-8 transition-transform transform hover:scale-110'
              />
            </a>
            <Link 
              href='/catalog' 
              className='text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo transition-transform transform hover:scale-105 font-navheader'
            >
              Catálogo
            </Link>
          </li>
          
          <li className='flex items-center'>
            <Link 
              href='/about' 
              className='text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo hover:scale-105 font-navheader'
            >
              Sobre Nosotros
            </Link>
          </li>
          
          <li className='flex items-center'>
            {isAuth ? (
              <Popover handleLogout={handleLogout} />
            ) : (
              <Link 
                href='/login' 
                className='text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo font-navheader ml-2'
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
                className='ml-4 md:ml-6 transition-transform transform hover:scale-110'
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
