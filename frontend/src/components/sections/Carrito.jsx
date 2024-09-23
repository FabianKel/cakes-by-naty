'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Carrito() {
    const [desserts, setDesserts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedDesserts = JSON.parse(localStorage.getItem('desserts')) || [];
        setDesserts(storedDesserts);
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    const handleRemove = (id) => {
        const updatedDesserts = desserts.filter(dessert => dessert.id !== id);
        setDesserts(updatedDesserts);
        localStorage.setItem('desserts', JSON.stringify(updatedDesserts));
    };

    const handleIncrease = (id) => {
        const updatedDesserts = desserts.map(dessert => 
            dessert.id === id ? { ...dessert, quantity: dessert.quantity + 1 } : dessert
        );
        setDesserts(updatedDesserts);
        localStorage.setItem('desserts', JSON.stringify(updatedDesserts));
    };

    const handleDecrease = (id) => {
        const updatedDesserts = desserts.map(dessert => 
            dessert.id === id && dessert.quantity > 1 ? { ...dessert, quantity: dessert.quantity - 1 } : dessert
        );
        setDesserts(updatedDesserts);
        localStorage.setItem('desserts', JSON.stringify(updatedDesserts));
    };

    const handleConfirm = () => {
        localStorage.setItem('desserts', JSON.stringify(desserts));
        router.push('/Factura');
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
                    <h1 className="text-3xl md:text-4xl text-center font-bold mt-6 mb-6">Tu Carrito</h1>
                    {desserts.length > 0 ? (
                        <>
                            <ul className="space-y-6">
                                {desserts.map((dessert) => (
                                    <li key={dessert.id} className="flex flex-col sm:flex-row items-start bg-[#e2c2c4] shadow-lg rounded-lg p-6">
                                        <div className="flex-shrink-0 w-full sm:w-40 h-40 relative mb-4 sm:mb-0">
                                            <Image
                                                src={dessert.image}
                                                alt={dessert.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 sm:ml-6">
                                            <h3 className="text-2xl font-bold text-[#000000] mb-2">{dessert.title}</h3>
                                            <p className="text-lg text-[#000000]">Precio: Q{dessert.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-lg text-[#000000] mr-2">Cantidad:</span>
                                                <button 
                                                    className="bg-[#FEE4E5] text-black py-1 px-3 border border-gray-400 hover:bg-[#fdb5b5]"
                                                    onClick={() => handleDecrease(dessert.id)}
                                                >
                                                    -
                                                </button>
                                                <div className="bg-[#ffffff] border-t border-b border-gray-400 py-1 px-3 text-lg text-[#000000] text-center">
                                                    {dessert.quantity}
                                                </div>
                                                <button 
                                                    className="bg-[#FEE4E5] text-black py-1 px-3 border border-gray-400 hover:bg-[#fdb5b5]"
                                                    onClick={() => handleIncrease(dessert.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center sm:ml-4 mt-4 sm:mt-0">
                                            <button
                                                className="bg-[#FEE4E5] text-black py-2 px-4 rounded-lg shadow-lg hover:bg-gray-800"
                                                onClick={() => handleRemove(dessert.id)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-4 flex justify-end">
                                <button
                                    className="bg-[#FEE4E5] text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-800"
                                    onClick={handleConfirm}
                                >
                                    Recibo
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-xl text-gray-700">Tu carrito está vacío.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Carrito;
