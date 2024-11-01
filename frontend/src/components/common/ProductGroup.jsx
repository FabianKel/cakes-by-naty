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

    return (
        <div className="my-8 mx-auto w-full">
            <div className="grid grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <Link href={`/productos/${product.productoid}`} key={index}>
                        <div className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
                            <h3 className="text-lg font-bold mb-2">{product.productonombre}</h3>
                            <img
                                src={product.imagen1}
                                alt={product.productonombre}
                                className="rounded-md object-cover w-full h-48"
                            />
                        </div>
                    </Link>
                ))}
                {showViewMore && (
                    <div className="flex items-center justify-center">
                        <button 
                            onClick={handleViewMore}
                            className="flex items-center text-bold text-black-600 hover:scale-105 transition-transform duration-300"
                        >
                            Ver más
                            <svg
                                className="ml-2 w-4 h-4"
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
                )}
            </div>
        </div>
    );
}

export default ProductGroup;