'use client';

import React, { useEffect, useState } from 'react';

function PedidosMenu() {
    const [pedidos, setPedidos] = useState([]);
    const [estado, setEstado] = useState(''); // Estado para los filtros

    useEffect(() => {
        let endpoint = 'http://localhost:4000/pedidos';

        // Cambia el endpoint si un filtro de estado está activo
        if (estado) {
            endpoint = `http://localhost:4000/pedidos/estado=${estado}`;
        }

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setPedidos(data.Pedidos))
            .catch((error) => console.error('Error fetching pedidos:', error));
    }, [estado]); // Vuelve a ejecutar el efecto cuando el estado cambia

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setEstado(value);
        } else {
            setEstado('');
        }
    };

    return (
        <section className="bg-white-200 py-10 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Pedidos</h1>

            <div className="container flex mx-auto justify-center">
                <div className='flex flex-col mx-auto items-center w-full'>
                <div className="flex gap-4 mb-8">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Sin-Entregar"
                            checked={estado === 'Sin-Entregar'}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Sin Entregar
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Entregado"
                            checked={estado === 'Entregado'}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Entregado
                    </label>
                </div>
                <div className="bg-customGray rounded-3xl w-4/5">
                    <div className="pt-5 px-24 flex flex-col gap-10 items-center">
                        {pedidos.map((pedido) => {
                            const formattedDate = new Date(pedido.created_at).toLocaleDateString();

                            return (
                                <div key={pedido.CarritoID} className="bg-white p-5 pb-10 rounded shadow-md my-2 w-4/5">
                                    <div className="flex justify-between">
                                        <h2 className="text-xl font-semibold mb-2">Orden #{pedido.pedidoid}</h2>
                                        <h2 className="text-xl font-semibold mb-2">Fecha de Orden: {formattedDate}</h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col items-start gap-5">
                                            <p className="text-gray-700 text-2xl">👤{pedido.usuario}</p>
                                            <p className="text-gray-700">
                                                Estado de Orden: {pedido.estado_orden === 'Sin-Entregar' ? 'Sin Entregar' : pedido.estado_orden}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-5">
                                            <p className="text-gray-700">
                                                Pago Anticipado: {pedido.pago_anticipado === 'Pago Anticipado No Realizado' ? '❌' : '✔️'}
                                            </p>
                                            <p className="text-gray-700">
                                                Pago Completo: {pedido.pago_completo === 'Pago Completo No Realizado' ? '❌' : '✔️'}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="w-2/5 h-12 p-2 mt-5 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                                        Ver Pedido
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                </div>

            </div>
        </section>
    );
}

export default PedidosMenu;
