import React from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

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
                        <Icon src="/instagram.svg" alt="Instagram" height="8" width="8" className=" mr-16 transition-transform transform hover:scale-125" />
                    </a>
                        <Link href="/catalog" className="text-lg text-gray-800 hover:text-blue-600 hover:text-hoverPink font-navheader mr-6 ">Catálogo</Link>
                    </li>
                    <li li className="flex items-center">
                        <Link href="/about" className="text-lg text-gray-800 hover:text-blue-600 hover:text-hoverPink font-navheader mr-6">Sobre Nosotros</Link>
                        <Link href="/login" className="text-lg text-gray-800 hover:text-blue-600 hover:text-hoverPink font-navheader ml-6 mr-6 ">Iniciar Sesión</Link>
                        <Icon src="/shopping-cart.svg" alt="Carrito" height="8" width="8" className=" ml-10 mr-10 transition-transform transform hover:scale-125" />
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;