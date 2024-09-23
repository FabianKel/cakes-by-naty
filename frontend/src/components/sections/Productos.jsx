'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductGroup from '@/components/common/ProductGroup';

function Productos() {
    const [postres, setPostres] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:4000/productos/')
            .then((response) => response.json())
            .then((data) => {
                console.log('Postres:', data); 
                setPostres(data.productos || []); 
            })
            .catch((error) => console.error('Error fetching cupcakes:', error));
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className="relative p-4">
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 text-black text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr;
                </button>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl md:text-4xl text-center font-bold mt-6 mb-6">Cakepops</h1>

                    <h2 className="text-lg md:text-xl font-bold mb-4">Cakepops de Temporada</h2>
                    <ProductGroup products={postres || []} />
                </div>
            </div>
        </div>
    );
}

export default Productos;