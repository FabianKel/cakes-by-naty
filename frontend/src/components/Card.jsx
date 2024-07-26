
import React from 'react';

function Card({ product }) {
    return (
        <div className="border p-4 m-2 rounded-md shadow-lg">
            <img src={product.imagen1} alt={product.productonombre} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-bold mt-2">{product.productonombre}</h2>
            <p className="text-gray-700">{product.categorianombre}</p>
            <p className="text-gray-700">{product.ocasion}</p>
            <p className="text-gray-700">Q.{product.precio}</p>
        </div>
    );
};

export default Card;