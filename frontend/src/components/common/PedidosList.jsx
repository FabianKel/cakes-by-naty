import React from 'react';

const PedidosList = ({ pedidos }) => {
  return (
    <div className='bg-white w-full max-h-screen overflow-y-auto mx-auto p-12 py-16 rounded-lg shadow-lg border border-gray-300'>
      <div className=''>
        {pedidos.map((pedido) => {
          const formattedDate = new Date(pedido.created_at).toLocaleDateString();

          return (
            <div key={pedido.CarritoID} className='bg-white p-5 pb-10 rounded shadow-md max-w-4xl mx-auto'>
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
                    Pago Anticipado:{' '}
                    {pedido.pago_anticipado === 'Pago Anticipado No Realizado' ? '❌' : '✔️'}
                  </p>
                  <p className='text-gray-700'>
                    Pago Completo: {pedido.pago_completo === 'Pago Completo No Realizado' ? '❌' : '✔️'}
                  </p>
                </div>
              </div>
              <button className='w-2/5 h-12 p-2 mt-5 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'>
                Ver Pedido
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PedidosList;
