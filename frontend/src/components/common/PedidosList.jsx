import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineCheckCircle } from 'react-icons/ai';


const PedidosList = ({ pedidos }) => {
  return (
    <section className='flex flex-row w-full justify-center md:justify-end'>
      <div className='max-h-screen w-full overflow-y-auto  md:w-10/12 rounded-lg shadow-lg border border-gray-300'>
        <div className='flex flex-col gap-1 md:gap-2'>
          {pedidos.map((pedido) => {
            const formattedDate = new Date(pedido.created_at).toLocaleDateString();

            return (
              <div key={pedido.pedidoid} className='flex flex-col gap-2 bg-white px-4 py-2 md:px-10 md:py-10 border-b-2 w-full'>
                <div className='flex justify-between'>
                  <h2 className='text-base font-bold'>Orden #{pedido.pedidoid}</h2>
                  <p className="flex flex-col text-gray-700 text-sm md:text-base ">
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
                <a className="flex items-center justify-end text-sm md:text-base space-x-2 text-gray-700">
                  {pedido.estado_orden === 'Sin-Entregar' ? (
                    <>
                      <CiDeliveryTruck className="size-5 md:size-7 text-gray-500" aria-hidden="true" />
                      <span>Sin Entregar</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineCheckCircle className="size-5 md:size-7 text-green-500" aria-hidden="true" />
                      <span>Entregado</span>
                    </>
                  )}
                </a>
                </div>
                <div className='flex justify-center my-2'>
                  <button className='w-40 px-4 py-2  bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'>
                    Ver Pedido
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </section>
  );
};

export default PedidosList;