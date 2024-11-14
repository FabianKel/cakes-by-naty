import React, { useEffect, useState } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import useModal from '@/hooks/useModal';
import ModalPedidos from './ModalPedidos';

const PedidosList = ({ pedidos }) => {
  const { isOpen, openModal, closeModal, agree } = useModal();
  const [currentPedido, setCurrent] = useState(undefined);
  const [productos, setProductos] = useState([]);

  const handleOpenProductDetail = (pedido) => {
    setCurrent(pedido);
    openModal();
  };

  useEffect(() => {
    if (currentPedido) {
      console.log('currentPedido: ', currentPedido);
      fetch(`http://localhost:4000/orders/${currentPedido.pedidoid}`)
        .then((response) => response.json())
        .then((data) => {
          setProductos(data.Productos);
        });
    }
  }, [currentPedido]);

  return (
    <section className='flex flex-row w-full justify-center md:justify-end'>
      <div className='max-h-screen w-full overflow-y-auto  md:w-10/12 rounded-lg shadow-lg border border-gray-300'>
        <div className='flex flex-col gap-1 md:gap-2'>
          {pedidos.map((pedido) => {
            const formattedDate = new Date(pedido.created_at).toLocaleDateString();
            return (
              <div
                key={pedido.pedidoid}
                className='flex flex-col gap-2 bg-white px-4 py-2 md:px-10 md:py-10 border-b-2 w-full'
              >
                <div className='flex justify-between'>
                  <h2 className='text-base font-bold'>Orden #{pedido.pedidoid}</h2>
                  <p className='flex flex-col text-gray-700 text-sm md:text-base '>
                    <span
                      className={`inline-block py-1 px-3 rounded-full text-sm font-semibold mb-4 ${
                        pedido.pago_completo === 'Pago Completo No Realizado'
                          ? pedido.pago_anticipado === 'Pago Anticipado No Realizado'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {pedido.pago_completo === 'Pago Completo No Realizado'
                        ? pedido.pago_anticipado === 'Pago Anticipado No Realizado'
                          ? 'Pago Pendiente'
                          : 'Pago Incompleto'
                        : 'Pagado'}
                    </span>
                  </p>
                </div>
                <p className='text-gray-700 text-sm md:text-base'>3 artículos por Q173.00</p>
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-col md:flex-row md:gap-1'>
                    <h2 className='text-sm md:text-base font-medium '>Fecha de Pedido: </h2>
                    <a className='text-sm md:text-base font-medium '>{formattedDate}</a>
                  </div>
                  <a className='flex items-center justify-end text-sm md:text-base space-x-2 text-gray-700'>
                    {pedido.estado_orden === 'Sin-Entregar' ? (
                      <>
                        <CiDeliveryTruck className='size-5 md:size-7 text-gray-500' aria-hidden='true' />
                        <span>Sin Entregar</span>
                      </>
                    ) : (
                      <>
                        <AiOutlineCheckCircle
                          className='size-5 md:size-7 text-green-500'
                          aria-hidden='true'
                        />
                        <span>Entregado</span>
                      </>
                    )}
                  </a>
                </div>
                <div className='flex justify-center my-2'>
                  <button
                    className='w-40 px-4 py-2  bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'
                    onClick={() => handleOpenProductDetail(pedido)}
                  >
                    Ver Pedido
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ModalPedidos isOpen={isOpen} onCancel={closeModal} singleButton={true}>
  {currentPedido && (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Detalles del Pedido #{currentPedido.pedidoid}</h2>
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentPedido.estado_orden === 'Sin-Entregar'
                ? 'bg-gray-100 text-gray-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {currentPedido.estado_orden === 'Sin-Entregar' ? 'Sin Entregar' : 'Entregado'}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentPedido.pago_completo === 'Pago Completo No Realizado'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {currentPedido.pago_completo === 'Pago Completo No Realizado' ? 'Pendiente' : 'Pagado'}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">Fecha de Orden: {new Date(currentPedido.created_at).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">{productos.length} artículos</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ocasión</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.map((producto) => (
              <tr key={producto.productoid} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{producto.productoid}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{producto.nombre}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{producto.ocasion}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{producto.cantidad}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">Q {Number(producto.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-900">Total</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                Q {productos.reduce((acc, item) => acc + Number(item.precio), 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )}
</ModalPedidos>
    </section>
  );
};

export default PedidosList;
