
import React from 'react';
import Image from '@/components/Image';

function Card({ product }) {
    return (
        <div className="border p-4 m-2 rounded-md shadow-lg flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2 font-navheader">{product.productonombre}</h2>
            <div className="flex justify-center items-center h-full mb-4">
            <Image src={product.imagen1} alt={product.productonombre} className="w-full h-full object-cover rounded-md"/>
            </div>
            <div className="flex justify-center mt-auto">
                <button className="p-2 bg-buttonCardPink text-white rounded-md hover:bg-subtitlesPink transition duration-300 flex items-center font-navheader">
                    Ver más
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Card;