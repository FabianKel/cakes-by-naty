'use client';

import PedidosList from '../common/PedidosList';

import { getPedidos } from '@/utils/https';
import React, { useEffect, useState } from 'react';
import Custom404 from '../Custom404';
import { getAuthToken } from '@/utils/functions';

function PedidosMenu() {
  const [pedidos, setPedidos] = useState([]);
  const [estado, setEstado] = useState('');

  const token = getAuthToken();

  if (!token) {
    return <Custom404 />;
  }

  const fetchData = async () => {
    const pedidos = await getPedidos(estado);
    setPedidos(pedidos.Pedidos);
  };

  useEffect(() => {
    fetchData();
  }, [estado]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setEstado(value);
    } else {
      setEstado('');
    }
  };

  return (
    <section className='bg-white-200 py-10 px-4 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Pedidos</h1>

      <div className='container flex mx-auto justify-center'>
        <div className='flex flex-col mx-auto items-center w-full'>
          <div className='flex gap-4 mb-8'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                value='Sin-Entregar'
                checked={estado === 'Sin-Entregar'}
                onChange={handleCheckboxChange}
                className='mr-2'
              />
              Sin Entregar
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                value='Entregado'
                checked={estado === 'Entregado'}
                onChange={handleCheckboxChange}
                className='mr-2'
              />
              Entregado
            </label>
          </div>
            <PedidosList pedidos={pedidos}/>
        </div>
      </div>
    </section>
  );
}

export default PedidosMenu;
