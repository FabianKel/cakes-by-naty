import React from 'react';


function PaymentSelection() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="flex flex-row items-center gap-6">
                    <button className="bg-[#e2c2c4] text-black text-lg font-bold py-4 px-8 rounded-lg shadow-md hover:bg-[#d1a7a9] transition-colors">
                        Efectivo
                    </button>
                    <button className="bg-[#e2c2c4] text-black text-lg font-bold py-4 px-8 rounded-lg shadow-md hover:bg-[#d1a7a9] transition-colors">
                        Transferencia
                    </button>
                </div>
            </main>
        </div>
    );
}

export default PaymentSelection;
