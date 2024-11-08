'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function OrderSummary() {
    const [desserts, setDesserts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedDesserts = localStorage.getItem('desserts');
        if (storedDesserts) {
            setDesserts(JSON.parse(storedDesserts));
        }
    }, []);

    const handlePayment = () => {
        router.push('/Confirmacion'); 
    };

    const handleGoBack = () => {
        router.back(); 
    };

    const calculateTotal = () => {
        return desserts.reduce((total, dessert) => total + dessert.price * dessert.quantity, 0);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-[#ffffff]">
            <main className="relative flex-grow flex items-center justify-center">
                <button 
                    onClick={handleGoBack} 
                    className="absolute top-4 left-4 text-black text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr; 
                </button>
                <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-1/2 mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6 text-[#000000]">Resumen del Pedido</h2>
                    <div className="space-y-4">
                        <div className="border-b border-black pb-4 mt-8 mb-4">
                            <p className="text-lg font-semibold">Número de Pedido: <span className="font-normal">#00001</span></p>
                            <ul className="space-y-2">
                                {desserts.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.productonombre} (x{item.quantity})</span>
                                        <span>Q{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total</span>
                            <span>Q{calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </main>
            <div className="absolute bottom-8 right-8">
                <button
                    className="bg-buttonPurple text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-buttonhoverPurple transition-colors"
                    onClick={handlePayment}
                >
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;
