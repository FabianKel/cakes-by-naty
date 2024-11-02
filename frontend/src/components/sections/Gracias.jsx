import React from 'react';

function Gracias() {
    return (
        <div className="bg-[#ffffff] min-h-screen p-4 md:p-8 flex items-center justify-center">
            <main className="flex-grow flex items-center justify-center bg-[#ffffff] p-4 md:p-8 w-full">
                <div className="bg-[#8386bb] shadow-lg rounded-lg p-6 md:p-8 text-center w-full max-w-md mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#ffffff] mb-4 md:mb-6">Cakes by Naty</h2>
                    <p className="text-md md:text-lg text-[#ffffff]">
                        Gracias por realizar tu pedido con nosotros. Te confirmamos que tu pedido ha sido recibido con éxito.
                    </p>
                    <p className="text-md md:text-lg text-[#ffffff] font-bold mt-4">
                        Tu número de orden es <span className="text-[#ffffff]">#00001</span>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Gracias;
