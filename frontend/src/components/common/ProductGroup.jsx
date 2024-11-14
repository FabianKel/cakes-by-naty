import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function ProductGroup({ products, showViewMore = true, categoryUrl }) {
    const router = useRouter();

    const handleViewMore = () => {
        if (categoryUrl) {
            router.push(`/catalog?filter=${categoryUrl}`);
        }
    };

    const formatTitle = (title) => {
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
        const parts = title.split(emojiRegex);
        
        let result = [];
        parts.forEach((part, index) => {
            if (!part) return; 
            
            if (part.match(emojiRegex)) {
                // Si es un emoji, agregarlo como está
                result.push(
                    <span key={`emoji-${index}`}>{part}</span>
                );
            } else {
                // Si es texto o números, aplicar el gradiente
                result.push(
                    <span 
                        key={`text-${index}`}
                        className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-subtitlesPink group-hover:to-baseLavender transition-all duration-300"
                    >
                        {part.trim()}
                    </span>
                );
            }
        });

        return result;
    };

    return (
        <div className="my-8 mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <Link href={`/productos/${product.productoid}`} key={index}>
                        <div className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="relative p-4">
                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={product.imagen1}
                                        alt={product.productonombre}
                                        className="rounded-lg object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-4 rounded-lg bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <h3 className="text-lg font-hsubtitles text-center relative flex items-center justify-center gap-1 flex-wrap">
                                    {formatTitle(product.productonombre)}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}

                {showViewMore && (
                    <>
                        <div className="flex items-center justify-end w-full col-span-1 mt-4 md:hidden">
                            <button 
                                onClick={handleViewMore}
                                className="flex items-center gap-2 text-bold text-black-600 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                Ver más
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <button 
                                onClick={handleViewMore}
                                className="flex items-center text-bold text-black-600 hover:scale-105 transition-all duration-300 group"
                            >
                                Ver más
                                <svg
                                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductGroup;