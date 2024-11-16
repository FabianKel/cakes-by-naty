'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUsuario } from '@/utils/https';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import OrderForm from '@/components/common/OrderForm';

function OrderSummary() {
    const [desserts, setDesserts] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    const fetchUserData = useCallback(async () => {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        try {
            const user = await getUsuario(currentUser.id);
            setUsuario(user.usuario);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, []);

    useEffect(() => {
        const token = getAuthToken();
        setToken(token);
        fetchUserData();

        const storedDesserts = localStorage.getItem('desserts');
        if (storedDesserts) {
            setDesserts(JSON.parse(storedDesserts));
        }
    }, [fetchUserData]);

    const calculateTotal = () => {
        return desserts.reduce((total, dessert) => total + dessert.precio * dessert.cantidad, 0);
    };

    const direcciones = usuario
        ? [
            usuario.direccion1id && {
                id: usuario.direccion1id,
                nombre: usuario.direccion1_nombre,
                campo1: usuario.direccion1_campo1,
                campo2: usuario.direccion1_campo2,
                ciudad: usuario.direccion1_ciudad,
                departamento: usuario.direccion1_departamento,
            },
            usuario.direccion2id && {
                id: usuario.direccion2id,
                nombre: usuario.direccion2_nombre,
                campo1: usuario.direccion2_campo1,
                campo2: usuario.direccion2_campo2,
                ciudad: usuario.direccion2_ciudad,
                departamento: usuario.direccion2_departamento,
            },
            usuario.direccion3id && {
                id: usuario.direccion3id,
                nombre: usuario.direccion3_nombre,
                campo1: usuario.direccion3_campo1,
                campo2: usuario.direccion3_campo2,
                ciudad: usuario.direccion3_ciudad,
                departamento: usuario.direccion3_departamento,
            },
        ].filter(Boolean)
        : [];

        const formik = useFormik({
            initialValues: {
                direccion_seleccionada: direcciones.length > 0 ? direcciones[0].id : '',
            },
            enableReinitialize: true,
            onSubmit: async (values) => {
                try {
                    // Buscar la dirección seleccionada
                    const direccion = direcciones.find((direccion) => direccion.id === values.direccion_seleccionada);
        
                    // Estructurar el cuerpo del correo
                    const EstructuraEmail = {
                        titulo: "Nuevo Pedido",
                        cuerpo: "Se ha realizado un nuevo pedido.",
                        productos: desserts,
                        total: calculateTotal().toFixed(2),
                        usuario_nombre: usuario.primer_nombre,
                        usuario_apellido: usuario.segundo_nombre,
                        usuario_correo: usuario.correo,
                        usuario_telefono: usuario.telefono,
                        direccion: direccion,
                    };
        
                    const response = await fetch('http://localhost:4000/send/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(EstructuraEmail),
                    });
        
                    if (response.ok) {
                        alert('Correo enviado correctamente');
                    } else {
                        const errorData = await response.json();
                        console.error('Error al enviar el correo:', errorData);
                        alert('Error al enviar el correo');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    alert('Ocurrió un error al enviar el correo');
                }
            },
            validationSchema: yup.object({
                direccion_seleccionada: yup.string().required('Debe seleccionar una dirección'),
            }),
        });
        

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-[#ffffff]">
            <main className="relative flex-grow flex items-center justify-center">
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 text-black text-5xl focus:outline-none hover:text-gray-700"
                >
                    &larr;
                </button>

                <div className="flex flex-col relative md:flex-row md:gap-8 w-9/12">
                    <div className="flex flex-col w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-300 mb-6  md:mb-0">
                        <OrderForm usuario={usuario} token={token} />
                    </div>

                    <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg  mx-auto px-6 pb-32 md:ml-6">
                        <form onSubmit={formik.handleSubmit} className="bg-white mb-12">
                            <div className="border-b border-gray-200 bg-white px-8 py-6">
                                <h1 className="text-xl font-semibold text-gray-800">Selecciona una dirección</h1>
                                <select
                                    name="direccion_seleccionada"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.direccion_seleccionada}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors"
                                >
                                    {direcciones.map((direccion) => (
                                        <option key={direccion.id} value={direccion.id}>
                                            {direccion.nombre} - {direccion.campo1}, {direccion.campo2}, {direccion.ciudad}, {direccion.departamento}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.direccion_seleccionada && formik.errors.direccion_seleccionada && (
                                    <p className="mt-1 text-sm text-red-500">{formik.errors.direccion_seleccionada}</p>
                                )}
                            </div>

                            <div className="absolute bottom-8 right-8">
                                <button
                                    type='submit'
                                    className="bg-buttonPurple text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-buttonhoverPurple transition-colors"
                                    onClick={formik.handleSubmit}
                                    disabled={formik.isSubmitting}
                                >
                                    Confirmar Pedido
                                </button>
                            </div>
                        </form>

                        <h2 className="text-3xl font-bold text-center mb-6 text-[#000000]">Resumen del Pedido</h2>
                        <div className="space-y-4">
                            <div className="border-b border-black pb-4 mt-8 mb-4">
                                <ul className="space-y-2">
                                    {desserts.map((item, index) => (
                                        <li key={index} className="flex justify-between">
                                            <span>{item.nombre_producto} (x{item.cantidad})</span>
                                            <span>Q{item.precio}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total</span>
                                <span>Q{calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default OrderSummary;
