'use client';

import React, { useEffect, useState } from 'react';
import ProductGroup from '@/components/common/ProductGroup';

function Catalogo() {
    const [cakes, setCakes] = useState([]);
    const [cupcakes, setCupcakes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/products/categoria/3/3')
            .then((response) => response.json())
            .then((data) => {
                console.log('Cakes:', data); 
                setCakes(data.productos || []); 
            })
            .catch((error) => console.error('Error fetching cakes:', error));

        fetch('http://localhost:4000/products/categoria/1/3')
            .then((response) => response.json())
            .then((data) => {
                console.log('Cupcakes:', data); 
                setCupcakes(data.productos || []); 
            })
            .catch((error) => console.error('Error fetching cupcakes:', error));
    }, []);

    return (
        <div className='flex flex-col'>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl text-center font-bold mt-6 mb-6">Catálogo</h1>
                <h2 className="text-xl font-bold mb-4">Nuestros Pasteles</h2>
                <ProductGroup products={cakes} />
                <h2 className="text-xl font-bold mb-4">Nuestros Cupcakes</h2>
                <ProductGroup products={cupcakes} />
            </div>
        </div>
    );
}

export default Catalogo;
