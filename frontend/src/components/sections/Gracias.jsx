import React from 'react';

function ThankYou() {
    return (
        <div className="bg-[#ffffff] min-h-screen p-8">
            <main className="flex-grow flex items-center justify-center bg-[#ffffff] p-8">
                <div className="bg-[#e2c2c4] shadow-lg rounded-lg p-8 text-center w-full md:w-1/2 mx-auto">
                    <h2 className="text-3xl font-bold text-[#000000] mb-6">Cakes by Naty</h2>
                    <p className="text-lg text-[#000000]-700">
                        Gracias por realizar tu pedido con nosotros. Te confirmamos que tu pedido ha sido recibido con éxito.
                    </p>
                    <p className="text-lg font-bold mt-4">
                        Tu número de orden es <span className="text-[#000000]">#00001</span>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ThankYou;
