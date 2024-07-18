import React from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

function Footer() {
    return (
        <footer className="bg-customPink py-8 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 font-subtitles">Cakes by Naty</h2>
                    <ul>
                        <li className="mb-2">
                            <Link href="/catalog" className="text-gray-800 hover:text-blue-600 hover:text-hoverPink">Catálogo</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/about" className="text-gray-800 hover:text-blue-600 hover:text-hoverPink">Sobre Nosotros</Link>
                        </li>
                    </ul>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2 font-subtitles">Pasteles con amor</h2>
                    <p className="text-gray-700 italic">Hechos con los mejores ingredientes y mucho cariño.</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 ml-48 font-subtitles">Síguenos</h2>
                    <div className="flex justify-center space-x-4">
                        <a href="https://www.instagram.com/cakes.bynaty/" target="_blank" rel="noopener noreferrer">
                        <Icon src="/instagram.svg" alt="Instagram" height="6" width="6" className="transition-transform transform hover:scale-125" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-600">
                © 2024, Cakes by Naty. Todos los derechos reservados.
            </div>
        </footer>
    );

}

export default Footer