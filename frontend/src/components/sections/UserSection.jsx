'use client';

import Button from '../common/Button';
import PedidosList from '../common/PedidosList';
import React, { useEffect, useState } from 'react';
import { getUsuario, getUsuarioPedidos } from '@/utils/https';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import Custom404 from '../Custom404';

function UserSection() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación

  useEffect(() => {
    const token = getAuthToken();
    let currentUser = getCurrentUser();

    if (token && currentUser) {
      setIsAuthenticated(true); // Usuario autenticado
      const fetchData = async () => {
        try {
          const user = await getUsuario(currentUser.id);
          const pedidos = await getUsuarioPedidos(currentUser.id);
          setUsuario(user.usuario);
          setPedidos(pedidos);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mostramos esto mientras carga
  }

  if (!isAuthenticated) {
    return <Custom404 />; // Solo muestra Custom404 si no está autenticado
  }
  
  return (
    <div className='flex items-center justify-center min-h-screen bg-white w-full'>
      <div className='flex flex-row gap-5 sm:flex-col md:flex-row w-1/2'>
        <div className='bg-white w-full max-w-lg mx-auto p-12 py-16 rounded-lg shadow-lg border border-gray-300'>
          <h1 className='text-3xl font-semibold font-poppins text-center'>{usuario.usuario}</h1>
          <div className='mt-6 flex flex-col text-left mb-8 gap-6'>
            <div className='flex flex-col'>
              <a className=' font-bold text-xl'>Nombre:</a>
              <div className='flex flex-row justify-between'>
                <p className='text-lg '>
                  {usuario.primer_nombre} {usuario.segundo_nombre}
                </p>
                <Button
                  className='p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom'
                  onClick={() => console.log('Editar clicked')}
                >
                  Editar
                </Button>
              </div>
            </div>
            <div className='flex flex-col'>
              <a className=' font-bold text-xl'>Dirección de Correo:</a>
              <div className='flex flex-row justify-between'>
                <p className='text-lg '>{usuario.correo}</p>
                <Button
                  className='p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom'
                  onClick={() => console.log('Editar clicked')}
                >
                  Editar
                </Button>
              </div>
            </div>
            <div className='flex flex-col'>
              <a className=' font-bold text-xl'>Número de Celular:</a>
              <div className='flex flex-row justify-between'>
                <p className='text-lg '>{usuario.telefono}</p>
                <Button
                  className='p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom'
                  onClick={() => console.log('Editar clicked')}
                >
                  Editar
                </Button>
              </div>
            </div>
            <div className='flex flex-col'>
              <a className=' font-extrabold text-xl'>Contraseña:</a>
              <div className='flex flex-row justify-between'>
                <p className='text-lg '>{usuario.password}</p>
                <Button
                  className='p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom'
                  onClick={() => console.log('Editar clicked')}
                >
                  Editar
                </Button>
              </div>
            </div>
            <div>
              <a
                className='text-lg font-semibold text-blue-600 hover:text-blue-900 justify-normal'
                href='/user/direcciones'
              >
                Ver mis direcciones
              </a>
            </div>
          </div>
        </div>
        <PedidosList pedidos={pedidos}/>
      </div>
    </div>
  );
}

export default UserSection;