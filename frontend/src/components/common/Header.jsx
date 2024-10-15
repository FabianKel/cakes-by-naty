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

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuth(user);
  }, []);

  const handleLogout = () => {
    const result = logout();
    if (result) {
      setIsAuth(null);
      router.push('/');
    }
  };

  return (
    <header className='flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-customPink'>
      <div className='flex justify-center md:justify-start w-full md:w-auto'>
        <Link href='/'>
          <img
            src='Logos/cbn.png'
            alt='Cakes by Naty'
            className='h-30 w-40 md:h-30 md:w-40 hover:scale-105 transition-transform duration-300'
          />
        </Link>
      </div>
      <nav className='flex flex-wrap justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0'>
        <ul className='flex flex-wrap space-x-4 md:space-x-8 items-center'>
          <li className='flex items-center'>
            <a href='https://www.instagram.com/cakes.bynaty/' target='_blank' rel='noopener noreferrer'>
              <Icon
                src='/instagram.svg'
                alt='Instagram'
                height='6'
                width='6'
                className='mr-2 md:mr-16 transition-transform transform hover:scale-125'
              />
            </a>
            <Link href='/catalog' className='text-sm md:text-lg text-gray-800 hover:text-hoverPink font-navheader'>
              Catálogo
            </Link>
          </li>
          <li className='flex items-center'>
            <Link href='/about' className='text-sm md:text-lg text-gray-800 hover:text-hoverPink font-navheader'>
              Sobre Nosotros
            </Link>
          </li>
          <li className='flex items-center'>
            {isAuth ? (
              <Popover handleLogout={handleLogout} />
            ) : (
              <Link href='/login' className='text-sm md:text-lg text-gray-800 hover:text-hoverPink font-navheader ml-2'>
                Iniciar Sesión
              </Link>
            )}
            <a href='/Carrito'>
              <Icon
                src='/shopping-cart.svg'
                alt='Carrito'
                height='6'
                width='6'
                className='ml-4 md:ml-10 transition-transform transform hover:scale-125'
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

