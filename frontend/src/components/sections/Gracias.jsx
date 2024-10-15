import React from 'react';

function ThankYou() {
    return (
        <div className="bg-[#ffffff] min-h-screen p-8">
            <main className="flex-grow flex items-center justify-center bg-[#ffffff] p-8">
                <div className="bg-[#8386bb] shadow-lg rounded-lg p-8 text-center w-full md:w-1/2 mx-auto">
                    <h2 className="text-3xl font-bold text-[#ffffff] mb-6">Cakes by Naty</h2>
                    <p className="text-lg text-[#ffffff]">
                        Gracias por realizar tu pedido con nosotros. Te confirmamos que tu pedido ha sido recibido con éxito.
                    </p>
                    <p className="text-lg text-[#ffffff] font-bold mt-4">
                        Tu número de orden es <span className="text-[#ffffff]">#00001</span>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ThankYou;
