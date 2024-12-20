'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import { getUsuario } from '@/utils/https';
import Image from 'next/image';
import Modal from '@/components/common/Modal';

function Carrito() {
  const [usuario, setUsuario] = useState(null);
  const [desserts, setDesserts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    let currentUser = getCurrentUser();

    if (token && currentUser) {
      setIsAuthenticated(true);
      const fetchData = async () => {
        try {
          const user = await getUsuario(currentUser.id);
          setUsuario(user.usuario);
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
    if (usuario && usuario.usuarioid) {
      fetch(`http://localhost:4000/carts/${usuario.usuarioid}/`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDesserts(data);
            console.log(data)
          } else {
            console.error('Formato de datos incorrecto', data);
          }
        })
        .catch((error) => {
          console.error('Error al cargar el carrito:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [usuario]);

  const handleGoBack = () => {
    router.back();
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:4000/carts/${usuario.usuarioid}/producto/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Actualizamos el estado para remover el producto del carrito
          const updatedDesserts = desserts.filter((dessert) => dessert.producto_id !== id);
          console.log('updatedDesserts: ', updatedDesserts);

          const productsInMyCart = updatedDesserts.reduce((acc, item) => acc + item.cantidad, 0);
          localStorage.setItem('productsInMyCart', productsInMyCart);
          window.dispatchEvent(new Event('storage'));

          setDesserts(updatedDesserts);
        } else {
          console.error('Error al eliminar el producto');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud DELETE:', error);
      });
  };

  const handleIncrease = async (id) => {
    const { cantidad, producto_id } = desserts.find((dessert) => dessert.producto_id === id);

    const updatedDesserts = desserts.map((dessert) =>
      dessert.producto_id === id ? { ...dessert, cantidad: dessert.cantidad + 1 } : dessert
    );

    const productsInMyCart = updatedDesserts.reduce((acc, item) => acc + item.cantidad, 0);

    if (producto_id) {
      handleUpdateProductCount(cantidad + 1, productsInMyCart, producto_id, updatedDesserts);
    }
  };

  const handleDecrease = (id) => {
    const { cantidad, producto_id } = desserts.find((dessert) => dessert.producto_id === id);

    const updatedDesserts = desserts.map((dessert) =>
      dessert.producto_id === id && dessert.cantidad > 1
        ? { ...dessert, cantidad: dessert.cantidad - 1 }
        : dessert
    );

    const productsInMyCart = updatedDesserts.reduce((acc, item) => acc + item.cantidad, 0);

    if (producto_id && cantidad > 1) {
      handleUpdateProductCount(cantidad - 1, productsInMyCart, producto_id, updatedDesserts);
    }
  };

  const handleUpdateProductCount = async (cantidad, productsInMyCart, productId, updatedDesserts) => {
    const response = await fetch('http://localhost:4000/carts/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioid: usuario.usuarioid,
        productoid: productId,
        cantidad: cantidad,
        personalizacionid: null,
      }),
    });

    if (response.ok) {
      localStorage.setItem('productsInMyCart', productsInMyCart);
      window.dispatchEvent(new Event('storage'));

      setDesserts(updatedDesserts);
    }
  };


  const handleRedirect = () => {
    window.location.href = '/user';
    router.push('/user');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {

    if (usuario.direccion1id == null && usuario.direccion2id == null && usuario.direccion3id == null){
      setModalOpen(true);
    } else {
      window.location.href = "/Resumen-de-Pedido";
      localStorage.setItem('desserts', JSON.stringify(desserts));
      router.push('/Resumen-de-Pedido');
    }

    
  };
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex flex-col min-h-screen w-2/3'>
        <div className='flex flex-col justify-center mx-auto p-4'>
          <h1 className='text-3xl md:text-4xl text-center font-bold mt-6 mb-6'>Tu Carrito</h1>

          {loading ? (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-buttonPurple'></div>
            </div>
          ) : desserts.length > 0 ? (
            <>
              <ul className='space-y-6  max-h-screen overflow-y-auto'>
                {desserts.map((dessert) => (
                  <li
                    key={dessert.producto_id}
                    className='flex flex-col sm:flex-row items-start bg-white border border-gray-300 shadow-lg rounded-lg p-6'
                  >
                    <div className='flex-shrink-0 w-full sm:w-40 h-40 relative mb-4 sm:mb-0'>
                      <Image
                        src={dessert.imagen1_producto}
                        alt={dessert.nombre_producto}
                        layout='fill'
                        objectFit='cover'
                        className='rounded-lg'
                      />
                    </div>
                    <div className='flex-1 sm:ml-6'>
                      <h3 className='text-2xl font-bold text-[#000000] mb-2'>{dessert.nombre_producto}</h3>
                      <p className='text-lg text-[#000000]'>
                        Precio: Q{parseFloat(dessert.precio).toFixed(2)}
                      </p>
                      <div className='flex items-center mt-2'>
                        <span className='text-lg text-[#000000] mr-2'>Cantidad:</span>
                        <button
                          className='bg-baseLilac text-black py-1 px-3 border border-gray-400 hover:bg-[#fdb5b5]'
                          onClick={() => handleDecrease(dessert.producto_id)}
                        >
                          -
                        </button>
                        <div className='bg-white border-t border-b border-gray-400 py-1 px-3 text-lg text-[#000000] text-center'>
                          {dessert.cantidad}
                        </div>
                        <button
                          className='bg-baseLilac text-black py-1 px-3 border border-gray-400 hover:bg-[#fdb5b5]'
                          onClick={() => handleIncrease(dessert.producto_id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className='flex flex-col items-center sm:ml-4 mt-4 sm:mt-0'>
                      <button
                        className='bg-buttonPurple text-white py-2 px-4 rounded-lg shadow-lg hover:bg-buttonhoverPurple'
                        onClick={() => handleRemove(dessert.producto_id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='p-4 flex justify-end'>
                <button
                  className='bg-buttonPurple text-white py-3 px-6 mt-4 rounded-lg shadow-lg hover:bg-buttonhoverPurple'
                  onClick={handleConfirm}
                >
                  Continuar con el pedido
                </button>
              </div>
            </>
          ) : (
            <div className='flex flex-col justify-center'>
              <p className='w-72 text-xl text-gray-700 py-11 self-center'>
                Vaya... Parece que no tienes ningún postre en tu carrito 😓
              </p>
              <a
                href='/catalog'
                className=' text-center text-blue-900 text-3xl  hover:text-gray-700 self-center'
              >
                Navegar
              </a>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onCancel={handleCloseModal}
        onAgree={handleRedirect}
        msg=  {'Vaya... parece que aún no tienes una dirección'}

      >
        <div className='flex flex-col items-center justify-center'>
          <p className='text-lg text-gray-700 py-4 self-center'>
            ¿Quieres agregar una dirección?
          </p>
          <div className='grid grid-cols-1 gap-4 mt-4 md:mt-0 md:grid-cols-2 items-center'>
            <button
              className='bg-buttonPurple text-white py-2 px-4 rounded-lg shadow-lg hover:bg-buttonhoverPurple'
              onClick={handleRedirect}
            >
              Sí, agregar dirección
            </button>
            <button
              className='bg-red-400 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600'
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default Carrito;
