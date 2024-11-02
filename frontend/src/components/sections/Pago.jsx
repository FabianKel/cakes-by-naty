import React from 'react';

function PaymentSelection() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-grow flex items-center justify-center p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-md">
                    <button className="bg-[#4444bc] text-white text-lg font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-md hover:bg-[#adadd5] transition-colors w-full">
                        Efectivo
                    </button>
                    <button className="bg-[#4444bc] text-white text-lg font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-md hover:bg-[#adadd5] transition-colors w-full">
                        Transferencia
                    </button>
                </div>
            </main>
        </div>
    );
}

export default PaymentSelection;
