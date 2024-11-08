'use client';
import React, { useEffect, useRef, useState } from 'react';

import UserDataSection from '@/components/sections/UserDataSection';
import PedidosList from '@/components/common/PedidosList';
import { getUsuario, getUsuarioPedidos } from '@/utils/https';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import LoginSection from './LoginSection';

function UserSection() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [option, setOption] = useState('general');

  const sectionRef = useRef(null); // Referencia para la sección seleccionada

  useEffect(() => {
    const token = getAuthToken();
    setToken(token)
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

  useEffect(() => {
    if (sectionRef.current && window.innerWidth <= 768) { // Solo en dispositivos móviles
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [option]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <LoginSection />;
  }

  return (
    <div className="flex flex-col mb-20 md:flex-row md:mx-32 lg:mx-52 md:mt-20">
      <div className="flex flex-col self-center md:self-auto w-64 h-fit my-8 md:my-0 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <a className="px-4 pb-4">{usuario.usuario}</a>
        <hr />
        <div className="flex flex-col self-center md:self-auto w-full h-auto">
          <button
            className={`bg-white hover:bg-neutral-100 text-left px-4 py-2 rounded-lg ${
              option === 'general' && 'font-semibold'
            }`}
            onClick={() => setOption('general')}
          >
          General
          </button>
          <button
            className={`bg-white hover:bg-neutral-100 text-left px-4 py-2 rounded-lg ${
              option === 'direcciones' && 'font-semibold'
            }`}
            onClick={() => setOption('direcciones')}
          >
            Direcciones
          </button>
          <button
            className={`bg-white hover:bg-neutral-100 text-left px-4 py-2 rounded-lg ${
              option === 'pedidos' && 'font-semibold'
            }`}
            onClick={() => setOption('pedidos')}
          >
            Ver Pedidos
          </button>
          <button
            className={`bg-white hover:bg-neutral-100 text-left px-4 py-2 mb-2 rounded-lg ${
              option === 'contraseña' && 'font-semibold'
            }`}
            onClick={() => setOption('contraseña')}
          >
            Contraseña
          </button>
          <hr />
          <button className="bg-white hover:bg-neutral-100 text-center px-4 py-2 mt-2 rounded-lg">
            Cerrar Sesión
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 mt-2 md:my-4 rounded-lg">
            Borrar Cuenta
          </button>
        </div>
      </div>

      <hr />

      <div ref={sectionRef} className="md:ml-16 md:border-l-[1px] md:border-gray-700 px-6 md:px-0 md:mx-0 flex flex-col self-center w-full bg-white">
        {option === 'general' && <UserDataSection usuario={usuario} token={token} />}
        {option === 'pedidos' && <PedidosList pedidos={pedidos} />}
      </div>
    </div>
  );
}

export default UserSection;
