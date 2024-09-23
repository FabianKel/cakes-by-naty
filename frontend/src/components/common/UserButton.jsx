'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importa useRouter
import Icon from '@/components/common/Icon';
import { logout, getUsuario, getUsuarioPedidos } from '@/utils/https';
import { getAuthToken, getCurrentUser } from '@/utils/functions';

function UserButton() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación
    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]); // Agregado estado para pedidos
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carga
    const router = useRouter(); // Inicializa el router

    const toggleUser = () => {
        setIsUserOpen(!isUserOpen);
    };

    useEffect(() => {
        const token = getAuthToken();
        const currentUser = getCurrentUser();

        if (token && currentUser) {
            setIsAuthenticated(true); // Usuario autenticado
            const fetchData = async () => {
                try {
                    const userResponse = await getUsuario(currentUser.id);
                    const pedidosResponse = await getUsuarioPedidos(currentUser.id);
                    setUsuario(userResponse.usuario);
                    setPedidos(pedidosResponse);
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                } finally {
                    setLoading(false); // Termina la carga
                }
            };
            fetchData();
        } else {
            setLoading(false); // Termina la carga si no hay token o usuario
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false); // Desactiva la autenticación
            router.push('/'); // Redirige a la página de inicio
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>; // Muestra un indicador de carga
    }

    return (
        <div className=''>

            <div className="flex flex-col justify-start h-full p-6">
                <div className="mt-2">
                    <ul className="space-y-4">
                        <li className="font-bold text-lg">
                            <button onClick={toggleUser} className="flex items-center w-full hover:scale-105 transition-transform duration-300">
                                <span
                                    className={`mr-2 text-gray-800 transition-transform duration-300 ${isUserOpen ? 'rotate-90' : 'rotate-0'}`}
                                >
                                    ▶
                                </span>
                                {usuario.usuario || 'Usuario'}
                            </button>
                            {isUserOpen && (
                                <ul className="pl-4 space-y-2 text-gray-700 mt-2">
                                    <li className="font-normal text-base">
                                        <Link href="/user" className="block w-full font-navheader hover:text-hoverPink">
                                            Mi Cuenta
                                        </Link>
                                    </li>
                                    <li className="font-normal text-base">
                                        <button onClick={handleLogout} className="flex items-center w-full font-navheader hover:text-hoverPink">
                                            <a>Cerrar Sesión</a>             
                                            <Icon
                                                src='/logout.svg'
                                                alt='Logout'
                                                height='8'
                                                width='8'
                                                className='transition-transform transform hover:scale-125'
                                            />
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserButton;
