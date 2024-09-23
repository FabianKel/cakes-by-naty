'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function ConfirmOrder() {
    const router = useRouter();

    const handleConfirm = () => {
        router.push('/Pago');
    };

    const handleGoBack = () => {
        router.back(); 
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <main className="relative flex-grow flex items-center justify-center bg-[#ffffff] p-8">
                <button 
                    onClick={handleGoBack} 
                    className="absolute top-4 left-4 text-black text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr; 
                </button>
                <div className="bg-[#e2c2c4] shadow-lg rounded-lg p-8 text-center w-full md:w-1/2 mx-auto">
                    <h2 className="text-3xl font-bold text-[#000000] mb-6">Cakes by Naty</h2>
                    <p className="text-lg text-[#000000]">
                        Por favor, revisa tu pedido antes de confirmar.
                    </p>
                    <p className="text-lg text-[#000000]">
                        ¿Está todo correcto?
                    </p>
                    <p className="text-lg font-bold mt-4">
                        Tu número de orden es <span className="text-[#000000]">#00001</span>
                    </p>
                    <button
                        className="bg-[#FEE4E5] text-black py-3 px-6 mt-6 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
                        onClick={handleConfirm}
                    >
                        Pagar
                    </button>
                </div>
            </main>
        </div>
    );
}

export default ConfirmOrder;
