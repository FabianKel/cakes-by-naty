'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { getAuthToken, getCurrentUser } from '@/utils/functions';


function ManageProductSection() {


  const [productos, setProductos] = useState([]);
  const [showOptions, setShowOptions] = useState(null);



  useEffect(() => {
    const cargarProductos = async () => {
      const response = await fetch('http://localhost:4000/products');

      const data = await response.json();
      setProductos(data.productos);
    };
    cargarProductos();
  }, []);

  const toggleOptions = (id) => {
    setShowOptions(showOptions === id ? null : id);
  };

  return (
        <div className='ml-4'>
        <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Tus Productos</h2>
        <div className="min-h-[1010px] h-auto bg-white border-2 border-gray-300 rounded-md overflow-y-auto max-h-80">
          
              <div className=" md:grid-cols-[5fr_4fr_4fr] items-center border-b border-gray-300 md:p-4 font-semibold text-gray-700 hidden md:grid">
                <span>Producto</span>
                <span className='text-center'>Precio</span>
                <span className='text-center'>Opciones</span>
              </div>

              {/* Filas de productos */}
              {productos.map((producto) => (
                <div
                  key={producto.productoid}
                  className="grid grid-cols-1 md:grid-cols-[5fr_4fr_4fr] items-center border-b border-gray-300 p-4 "
                >
                  <div className='relative pb-2 md:hidden'>
                      {/* Botón de tres puntos en modo móvil */}
                      <button
                        onClick={() => toggleOptions(producto.productoid)}
                        className="flex md:hidden items-center place-self-end justify-center w-8 h-8"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                      </button>

                      {/* Menú desplegable en modo móvil */}
                      {showOptions === producto.productoid && (
                        <div className="absolute top-10 right-2 bg-white border rounded-lg shadow-lg z-10 md:hidden">
                          <button
                            type="button"
                            className="flex items-center py-2 px-4 hover:bg-gray-100 text-gray-700 w-full"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="flex items-center py-2 px-4 hover:bg-gray-100 text-gray-700 w-full"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                            Preview
                          </button>
                          <button
                            type="button"
                            className="flex items-center py-2 px-4 hover:bg-gray-100 text-red-500 w-full"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.29922 5.70078C8.29922 5.46209 8.39404 5.23317 8.56282 5.06439C8.73161 4.8956 8.96052 4.80078 9.19922 4.80078C9.43791 4.80078 9.66683 4.8956 9.83561 5.06439C10.0044 5.23317 10.0992 5.46209 10.0992 5.70078V11.1008C10.0992 11.3395 10.0044 11.5684 9.83561 11.7372C9.66683 11.906 9.43791 12.0008 9.19922 12.0008C8.96052 12.0008 8.73161 11.906 8.56282 11.7372C8.39404 11.5684 8.29922 11.3395 8.29922 11.1008V5.70078Z"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  {/* Columna de Producto */}
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <Image
                      src={producto.imagen1}
                      alt={producto.productonombre}
                      width={100}
                      height={100}
                      className="rounded-md w-full px-4 md:w-full md:px-0"
                    />
                    <div className="ml-4 pt-2">
                      <h3 className="text-lg font-semibold">{producto.productonombre}</h3>
                      <p className="text-md text-gray-600">{producto.categoria}</p>
                    </div>
                  </div>

                  {/* Columna de Precio */}
                  <div className="ml-4 md:ml-0 md:text-center">
                    <p className="text-lg font-bold">Q{parseFloat(producto.precio).toFixed(2)}</p>
                  </div>

                  {/* Columna de Opciones */}
                  <div className="hidden md:flex  md:flex-row justify-center gap-3">
                  <Button
                    type="button"
                    className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      />
                    </svg>
                    Edit
                  </Button>
      
                    <Button
                      type="button"
                      className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Preview
                    </Button>
                    <Button
                      type="button"
                      className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="currentColor"
                          d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 5.70078C8.79922 5.46209 8.89404 5.23317 9.06282 5.06439C9.23161 4.8956 9.46052 4.80078 9.69922 4.80078C9.93791 4.80078 10.1668 4.8956 10.3356 5.06439C10.5044 5.23317 10.5992 5.46209 10.5992 5.70078V11.1008C10.5992 11.3395 10.5044 11.5684 10.3356 11.7372C10.1668 11.906 9.93791 12.0008 9.69922 12.0008C9.46052 12.0008 9.23161 11.906 9.06282 11.7372C8.89404 11.5684 8.79922 11.3395 8.79922 11.1008V5.70078Z"
                        />
                      </svg>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
  );
}

export default ManageProductSection;