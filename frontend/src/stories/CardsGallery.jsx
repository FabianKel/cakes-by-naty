import React from 'react';
import Card from './Card';

function CardsGallery({ products, category }) {
    return (
        <div className="bg-white size-full border p-24 m-2 rounded-md shadow-lg flex flex-col justify-between">
            <h2 className="text-black text-2xl font-bold mb-2 font-navheader text-center">{category}</h2>
            <div className='flex flex-row'>
            {products.slice(0, 4).map((product) => (
                <Card
                    key={product.product_id}
                    productonombre={product.productonombre}
                    src={product.src}
                    alt={product.alt}
                />
            ))}
            </div>
            
        </div>
    );
};

export default CardsGallery;