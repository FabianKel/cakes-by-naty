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
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-[#ffffff]">
            <main className="relative flex-grow flex items-center justify-center w-full max-w-lg">
                <button 
                    onClick={handleGoBack} 
                    className="absolute top-4 left-4 text-black text-3xl md:text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr;
                </button>
                <div className="bg-[#8386bb] shadow-lg rounded-lg p-6 md:p-8 text-center w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#ffffff] mb-4 md:mb-6">Cakes by Naty</h2>
                    <p className="text-md md:text-lg text-[#ffffff]">
                        Por favor, revisa tu pedido antes de confirmar.
                    </p>
                    <p className="text-md md:text-lg text-[#ffffff]">
                        ¿Está todo correcto?
                    </p>
                    <p className="text-md md:text-lg text-[#ffffff] font-bold mt-4">
                        Tu número de orden es <span className="text-[#ffffff]">#00001</span>
                    </p>
                    <button
                        className="bg-[#d0d0ff] text-black py-2 px-4 md:py-3 md:px-6 mt-6 rounded-lg shadow-lg hover:bg-[#f4f4ff] transition-colors"
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
