'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Carrito({ user_id }) {
    const [desserts, setDesserts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (user_id) {
            fetch(`http://localhost:4000/carrito/${user_id}/`)
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setDesserts(data);
                    } else {
                        console.error("Formato de datos incorrecto", data);
                    }
                })
                .catch((error) => {
                    console.error('Error al cargar el carrito:', error);
                });
        }
    }, [user_id]);

    const handleGoBack = () => {
        router.back();
    };

    const handleRemove = (id) => {
        fetch(`http://localhost:4000/carrito/${user_id}/producto/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                const updatedDesserts = desserts.filter(dessert => dessert.producto_id !== id);
                setDesserts(updatedDesserts);
            } else {
                console.error('Error al eliminar el producto');
            }
        })
        .catch((error) => {
            console.error('Error en la solicitud DELETE:', error);
        });
    };
    
    const handleIncrease = (id) => {
        const updatedDesserts = desserts.map(dessert =>
            dessert.producto_id === id ? { ...dessert, cantidad: dessert.cantidad + 1 } : dessert
        );
        setDesserts(updatedDesserts);
    };

    const handleDecrease = (id) => {
        const updatedDesserts = desserts.map(dessert =>
            dessert.producto_id === id && dessert.cantidad > 1 ? { ...dessert, cantidad: dessert.cantidad - 1 } : dessert
        );
        setDesserts(updatedDesserts);
    };

    const handleConfirm = () => {
        router.push('/Factura');
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#ffffff]">
            <div className="relative p-4 md:p-6">
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 text-black text-3xl md:text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr;
                </button>
                <div className="container mx-auto p-4 md:p-6">
                    <h1 className="text-2xl md:text-4xl text-center font-bold mt-4 md:mt-6 mb-4 md:mb-6">Tu Carrito</h1>
                    {desserts.length > 0 ? (
                        <>
                            <ul className="space-y-6">
                                {desserts.map((dessert) => (
                                    <li key={dessert.producto_id} className="flex flex-col sm:flex-row items-start bg-[#696ec1] shadow-lg rounded-lg p-4 sm:p-6">
                                        <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 md:h-40 relative mb-4 sm:mb-0">
                                            <Image
                                                src={dessert.imagen1_producto}
                                                alt={dessert.nombre_producto}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 sm:ml-6">
                                            <h3 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-2">{dessert.nombre_producto}</h3>
                                            <p className="text-lg md:text-xl text-[#ffffff]">Precio: Q{parseFloat(dessert.precio).toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-lg text-[#ffffff] mr-2">Cantidad:</span>
                                                <button 
                                                    className="bg-[#adaec5] text-black py-1 px-3 border border-gray-400 hover:bg-[#888aae]"
                                                    onClick={() => handleDecrease(dessert.producto_id)}
                                                >
                                                    -
                                                </button>
                                                <div className="bg-[#ffffff] border-t border-b border-gray-400 py-1 px-3 text-lg text-[#000000] text-center">
                                                    {dessert.cantidad}
                                                </div>
                                                <button 
                                                    className="bg-[#adaec5] text-black py-1 px-3 border border-gray-400 hover:bg-[#888aae]"
                                                    onClick={() => handleIncrease(dessert.producto_id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center sm:ml-4 mt-4 sm:mt-0">
                                            <button
                                                className="bg-[#adaec5] text-black py-2 px-4 rounded-lg shadow-lg hover:bg-[#888aae]"
                                                onClick={() => handleRemove(dessert.producto_id)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-4 flex justify-end">
                                <button
                                    className="bg-[#696ec1] text-white py-2 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-[#888aae]"
                                    onClick={handleConfirm}
                                >
                                    Recibo
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-xl text-gray-700 mt-6">Tu carrito está vacío.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Carrito;
