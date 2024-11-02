"use client";

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
        return desserts.reduce((total, dessert) => total + dessert.price * dessert.quantity, 0).toFixed(2);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-[#ffffff] flex flex-col items-center justify-between">
            <main className="relative flex-grow flex items-center justify-center w-full max-w-lg">
                <button 
                    onClick={handleGoBack} 
                    className="absolute top-4 left-4 text-black text-3xl md:text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr; 
                </button>
                <div className="bg-[#8386bb] shadow-lg rounded-lg p-4 md:p-8 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#ffffff]">Resumen del Pedido</h2>
                    <div className="space-y-4">
                        <div className="border-b border-black pb-4 mb-4">
                            <p className="text-md md:text-lg text-[#ffffff] font-semibold">Número de Pedido: <span className="font-normal">#00001</span></p>
                            <ul className="space-y-2">
                                {desserts.map((item, index) => (
                                    <li key={index} className="flex justify-between text-[#ffffff] text-sm md:text-base">
                                        <span>{item.title} (x{item.quantity})</span>
                                        <span>Q{item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between items-center font-bold text-[#ffffff] text-md md:text-lg">
                            <span>Total</span>
                            <span>Q{calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </main>
            <div className="w-full flex justify-center md:absolute md:bottom-8 md:right-8 mt-4 md:mt-0">
                <button
                    className="bg-[#d0d0ff] text-black text-lg font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#f4f4ff] transition-colors"
                    onClick={handlePayment}
                >
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;
