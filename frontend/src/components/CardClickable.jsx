import React, { useState } from 'react';
import Image from '@/components/Image';

function CardClickable({ product }) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div onClick={toggleDetails} className="cursor-pointer border p-4 m-2 rounded-md shadow-lg transition-transform transform hover:scale-105">
            <Image src={product.imagen1} alt={product.nombre} className="w-full h-48 object-cover rounded-md mt-2" />
            <h2 className="text-xl font-bold mt-2">{product.productonombre}</h2>
            {showDetails && (
                <>
                    <p className="text-gray-700 mt-2">Categoría: {product.categorianombre}</p>
                    <p className="text-gray-700">Ocasión: {product.ocasion}</p>
                    <p className="text-gray-700">Precio: Q.{product.precio}</p>
                </>
            )}
        </div>
    );
}

export default CardClickable;
