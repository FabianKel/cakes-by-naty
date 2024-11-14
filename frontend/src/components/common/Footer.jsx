import React from 'react'
import Link from 'next/link'
import Icon from '@/components/common/Icon'

function Footer() {
    return (
        <footer>
            <div className="bg-baseLilac py-8 px-4">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 font-subtitles">Cakes by Naty</h2>
                        <ul>
                            <li className="mb-2">
                                <Link href="/catalog" className="text-gray-800 hover:text-white">Catálogo</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/about" className="text-gray-800 hover:text-white">Sobre Nosotros</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-2 font-subtitles">Pasteles con amor</h2>
                        <p className="text-gray-700 italic">Hechos con los mejores ingredientes y mucho cariño.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 font-subtitles">Contáctanos</h2>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/cakes.bynaty/" target="_blank" rel="noopener noreferrer">
                                <Icon
                                    src="/instagram.svg"
                                    alt="Instagram"
                                    height="6"
                                    width="6"
                                    className="transition-transform transform hover:scale-125"
                                />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <Icon
                                    src="/mail.png"
                                    alt="Mail"
                                    height="6"
                                    width="6"
                                    className="transition-transform transform hover:scale-125"
                                />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <Icon
                                    src="/whatsapp.svg"
                                    alt="Whatsapp"
                                    height="6"
                                    width="6"
                                    className="transition-transform transform hover:scale-125"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-baseLavender py-4 w-full">
                <div className="text-center text-sm md:text-base text-white">
                    © 2024, Cakes by Naty. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
