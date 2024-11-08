import useModal from '@/hooks/useModal';
import React, { useState } from 'react';
import ModalPedidos from './ModalPedidos';

const PedidosList = ({ pedidos }) => {
  const { isOpen, openModal, closeModal, agree } = useModal();
  const [currentPedido, setCurrent] = useState(undefined);
  const [productos, setProductos] = useState([]);

  const handleOpenProductDetail = (pedido) => {
    setCurrent(pedido);
    openModal();
  };

  return (
    <div className='bg-white w-full max-h-screen overflow-y-auto mx-auto p-12 py-16 rounded-lg shadow-lg border border-gray-300'>
      <p>Mis pedidos</p>

      <div className=''>
        {pedidos.map((pedido) => {
          const formattedDate = new Date(pedido.created_at).toLocaleDateString();

          return (
            <div key={pedido.pedidoid} className='bg-white p-5 pb-10 rounded shadow-md max-w-4xl mx-auto'>
              <div className='flex justify-between'>
                <h2 className='text-xl font-semibold mb-2'>Orden #{pedido.pedidoid}</h2>
                <h2 className='text-xl font-semibold mb-2'>Fecha de Orden: {formattedDate}</h2>
              </div>
              <div className='flex justify-between'>
                <div className='flex flex-col items-start gap-5'>
                  <p className='text-gray-700 text-2xl'>👤{pedido.usuario}</p>
                  <p className='text-gray-700'>
                    Estado de Orden:{' '}
                    {pedido.estado_orden === 'Sin-Entregar' ? 'Sin Entregar' : pedido.estado_orden}
                  </p>
                </div>
                <div className='flex flex-col items-end gap-5'>
                  <p className='text-gray-700'>
                    Pago Anticipado: {pedido.pago_anticipado === 'Pago Anticipado No Realizado' ? '❌' : '✔️'}
                  </p>
                  <p className='text-gray-700'>
                    Pago Completo: {pedido.pago_completo === 'Pago Completo No Realizado' ? '❌' : '✔️'}
                  </p>
                </div>
              </div>
              <button
                className='w-2/5 h-12 p-2 mt-5 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'
                onClick={() => handleOpenProductDetail(pedido)}
              >
                Ver Pedido
              </button>
            </div>
          );
        })}
      </div>

      <ModalPedidos isOpen={isOpen} onCancel={closeModal}>
        {currentPedido && (
          <div>
            <div className='flex align-middle gap-10 justify-around'>
              <p>Orden #{currentPedido.pedidoid}</p>
              <p className='font-semibold'>
                Fecha de Orden: {new Date(currentPedido.created_at).toLocaleDateString()}
              </p>
              <p>👤{currentPedido.usuario}</p>
              <p>
                Estado:{' '}
                {currentPedido.estado_orden === 'Sin-Entregar' ? 'Sin Entregar' : currentPedido.estado_orden}
              </p>
            </div>

            <div className='mt-10'>
              <p>Productos</p>
              <div className='flex w-full'>
                <tabla className='w-full border-collapse mt-3'>
                  <thead className='bg-slate-200'>
                    <tr>
                      <th className='w-20 text-left'>ID</th>
                      <th className='w-60 text-left'>Nombre</th>
                      <th className='w-40 text-left'>Ocación</th>
                      <th className='w-40 text-left'>Cantidad</th>
                      <th className='w-20 text-left'>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr>
                        <td className='w-20 text-left'>{producto.id}</td>
                        <td className='w-60 text-left'>{producto.nombre}</td>
                        <td className='w-40 text-left'>{producto.ocacion}</td>
                        <td className='w-40 text-left'>{producto.cantidad}</td>
                        <td className='w-20 text-left'>Q {producto.precio}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className='bg-slate-100'>
                    <tr>
                      <td colspan='4'>Total</td>
                      <td colspan='4'>Q {productos.reduce((acc, item) => acc + item.precio, 0)}</td>
                    </tr>
                  </tfoot>
                </tabla>
              </div>
            </div>
          </div>
        )}
      </ModalPedidos>
    </div>
  );
};

export default PedidosList;
