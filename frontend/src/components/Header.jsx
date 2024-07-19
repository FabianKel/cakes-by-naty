import React from 'react';
import Link from 'next/link';

function Header() {
    return (
        <header className="flex justify-between items-center p-6 bg-customPink">
            <div className="text-2xl font-bold flex items-center">
                <Link href="/">
                    <img src="/cbn.png" alt="Cakes by Naty" className="h-30 w-40 mr-4" /> 
                </Link>
            </div>
            <nav>
                <ul className="flex space-x-8 items-center">
                    <li className="flex items-center">
                    <a href="https://www.instagram.com/cakes.bynaty/" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram.svg" alt="Instagram" className="h-8 w-8 mr-16 transition-transform transform hover:scale-125" />
                    </a>
                        <Link href="/catalog" className="text-lg text-gray-800 hover:text-blue-600 hover:text-hoverPink font-navheader mr-6 ">Catálogo</Link>
                    </li>
                    <li li className="flex items-center">
                        <Link href="/about" className="text-lg text-gray-800 hover:text-blue-600 hover:text-hoverPink font-navheader mr-6">Sobre Nosotros</Link>
                        <img src="/shopping-cart.svg" alt="Carrito" className="h-8 w-8 ml-10 mr-10 transition-transform transform hover:scale-125" />
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;