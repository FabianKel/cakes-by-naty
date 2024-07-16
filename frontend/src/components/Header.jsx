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
                    <img src="/instagram.svg" alt="Instagram" className="h-8 w-8 mr-16" />
                        <Link href="/catalog" className="text-lg text-gray-800 hover:text-blue-600 font-navheader mr-6 ">Catálogo</Link>
                    </li>
                    <li li className="flex items-center">
                        <Link href="/about" className="text-lg text-gray-800 hover:text-blue-600 font-navheader mr-6">Sobre Nosotros</Link>
                        <img src="/shopping-cart.svg" alt="Carrito" className="h-8 w-8 ml-10 mr-10" />
                    </li>
                </ul>
            </nav>
        </header>
    );
}


export default Header;