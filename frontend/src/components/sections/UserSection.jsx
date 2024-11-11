"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react';
import UserDataSection from '@/components/sections/UserDataSection';
import PedidosList from '@/components/common/PedidosList';
import { getUsuario, getUsuarioPedidos, addAddress, editAddress, deleteAddress } from '@/utils/https';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import LoginSection from './LoginSection';
import AddressSection from '@/components/sections/AddressSection';

function UserSection() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [direcciones, setDirecciones] = useState([]); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [option, setOption] = useState('general');
  const [key, setKey] = useState(0); 
  const sectionRef = useRef(null);

  const fetchUserData = useCallback(async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    try {
      const user = await getUsuario(currentUser.id);
      const pedidosData = await getUsuarioPedidos(currentUser.id);
      
      const direccionesArray = [];
      
      if (user.usuario.direccion1_nombre) {
        direccionesArray.push({
          id: user.usuario.direccion1id,
          slot: 1,
          nombre: user.usuario.direccion1_nombre,
          campo1: user.usuario.direccion1_campo1,
          campo2: user.usuario.direccion1_campo2,
          ciudad: user.usuario.direccion1_ciudad,
          departamento: user.usuario.direccion1_departamento,
          detalles: user.usuario.direccion1_detalles
        });
      }
      
      if (user.usuario.direccion2_nombre) {
        direccionesArray.push({
          id: user.usuario.direccion2id,
          slot: 2,
          nombre: user.usuario.direccion2_nombre,
          campo1: user.usuario.direccion2_campo1,
          campo2: user.usuario.direccion2_campo2,
          ciudad: user.usuario.direccion2_ciudad,
          departamento: user.usuario.direccion2_departamento,
          detalles: user.usuario.direccion2_detalles
        });
      }
      
      if (user.usuario.direccion3_nombre) {
        direccionesArray.push({
          id: user.usuario.direccion3id,
          slot: 3,
          nombre: user.usuario.direccion3_nombre,
          campo1: user.usuario.direccion3_campo1,
          campo2: user.usuario.direccion3_campo2,
          ciudad: user.usuario.direccion3_ciudad,
          departamento: user.usuario.direccion3_departamento,
          detalles: user.usuario.direccion3_detalles
        });
      }

      setUsuario(user.usuario);
      setPedidos(pedidosData);
      setDirecciones(direccionesArray);
      setKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    setToken(token);
    let currentUser = getCurrentUser();

    if (token && currentUser) {
      setIsAuthenticated(true);
      fetchUserData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchUserData]);

  const handleDeleteAddress = async (id) => {
    try {
      const deleted = await deleteAddress(id);
      if (deleted) {
        setDirecciones(prevDirecciones => 
          prevDirecciones.filter(direccion => direccion.id !== id)
        );
        await fetchUserData(); 
      }
    } catch (error) {
      console.error('Error al borrar dirección:', error);
    }
  };

  const handleAddAddress = async (newAddressData) => {
    if (direcciones.length >= 3) {
      alert('No puedes agregar más de 3 direcciones.');
      return;
    }

    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      const user = await getUsuario(currentUser.id);
      
      const slotsOcupados = [];
      if (user.usuario.direccion1_nombre) slotsOcupados.push(1);
      if (user.usuario.direccion2_nombre) slotsOcupados.push(2);
      if (user.usuario.direccion3_nombre) slotsOcupados.push(3);

      console.log('Slots ocupados:', slotsOcupados); 

      let availableSlot = 1;
      while (slotsOcupados.includes(availableSlot) && availableSlot <= 3) {
        availableSlot++;
      }

      console.log('Slot seleccionado para nueva dirección:', availableSlot); 

      if (availableSlot > 3) {
        alert('No hay slots disponibles para nuevas direcciones.');
        return;
      }

      await addAddress(newAddressData, currentUser.id, availableSlot);
      await fetchUserData(); 
    } catch (error) {
      console.error('Error al agregar la dirección:', error.message);
      alert('Hubo un problema al agregar la dirección. Inténtalo de nuevo.');
    }
  };

  const handleEditAddress = async (id, updatedAddress) => {
    try {
      await editAddress(id, updatedAddress);
      await fetchUserData(); 
    } catch (error) {
      console.error('Error al actualizar la dirección:', error);
      alert('Hubo un problema al actualizar la dirección. Inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    if (sectionRef.current && window.innerWidth <= 768) {
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
        {option === 'direcciones' && (
          <AddressSection
            key={key}
            direcciones={direcciones}
            onAddAddress={handleAddAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        )}
        {option === 'pedidos' && <PedidosList pedidos={pedidos} />}
      </div>
    </div>
  );
}

export default UserSection;