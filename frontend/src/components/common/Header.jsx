"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { getCurrentUser } from '@/utils/functions';
import { logout } from '@/utils/https';
import { useRouter } from 'next/navigation';
import Popover from './Popover';

function Header() {
  const router = useRouter();
  const [productsInMyCart, setProductsInMyCart] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); 

  const fetchCart = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/carts/${userId}/`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const totalProducts = data.reduce((acc, item) => acc + item.cantidad, 0);
        localStorage.setItem('productsInMyCart', totalProducts);
        window.dispatchEvent(new Event('storage'));
      } else {
        throw new Error('Formato de datos incorrecto');
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      setProductsInMyCart(0);
    }
  }, []);

  const handleStorageChange = useCallback(() => {
    const products = localStorage.getItem('productsInMyCart');
    setProductsInMyCart(Number(products) || 0);

    const updatedUser = getCurrentUser();
    if (updatedUser?.id) {
      setTimeout(() => {
        setCurrentUser(updatedUser);
        setIsPopoverVisible(true); 
      }, 2000); 
    } else {
      setCurrentUser(null);
      setIsPopoverVisible(false);
    }
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.id) {
      setCurrentUser(user);
      setIsPopoverVisible(true);
    }

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchCart(currentUser.id);
    }
  }, [currentUser, fetchCart]);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        localStorage.removeItem('currentUser');
        localStorage.setItem('productsInMyCart', '0');
        setCurrentUser(null);
        setProductsInMyCart(0);
        setIsPopoverVisible(false);
        window.dispatchEvent(new Event('storage'));
        router.push('/');
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  };

  const navigationLinks = [
    {
      href: 'https://www.instagram.com/cakes.bynaty/',
      external: true,
      icon: {
        src: '/instagram.svg',
        alt: 'Instagram',
      },
      text: 'Catálogo',
      catalogLink: '/catalog',
    },
    {
      href: '/about',
      text: 'Sobre Nosotros',
    },
  ];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-2 sm:p-4 md:p-6 bg-baseLilac">
      <div className="flex justify-center md:justify-start w-full md:w-auto">
        <Link href="/" aria-label="Ir a la página principal">
          <img
            src="Logos/cbnlogo.png"
            alt="Cakes by Naty"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
        </Link>
      </div>

      <nav className="flex flex-wrap justify-center md:justify-end w-full md:w-auto mt-2 sm:mt-4 md:mt-0">
        <ul className="flex flex-wrap space-x-2 sm:space-x-4 md:space-x-6 items-center">
          {navigationLinks.map((link, index) => (
            <li key={index} className="flex items-center">
              {link.icon && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Instagram"
                >
                  <Icon
                    src={link.icon.src}
                    alt={link.icon.alt}
                    height="8"
                    width="8"
                    className="mr-2 sm:mr-3 md:mr-8 transition-transform transform hover:scale-110"
                  />
                </a>
              )}
              {link.catalogLink ? (
                <Link
                  href={link.catalogLink}
                  className="relative text-xs sm:text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo font-navheader after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-mainhoverIndigo after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.text}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="relative text-xs sm:text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo font-navheader after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-mainhoverIndigo after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.text}
                </Link>
              )}
            </li>
          ))}

          <li className="flex items-center">
            {isPopoverVisible ? (
              <Popover handleLogout={handleLogout} />
            ) : (
              <Link
                href="/login"
                className="relative text-xs sm:text-sm md:text-base text-gray-800 hover:text-mainhoverIndigo font-navheader ml-1 sm:ml-2 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-mainhoverIndigo after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
              >
                Iniciar Sesión
              </Link>
            )}
            <Link
              href="/Carrito"
              aria-label={`Carrito de compras con ${productsInMyCart} productos`}
            >
              <Icon
                src="/shopping-cart.svg"
                alt="Carrito"
                height="8"
                width="8"
                counts={productsInMyCart}
                className="ml-2 sm:ml-3 md:ml-6 transition-transform transform hover:scale-110"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
