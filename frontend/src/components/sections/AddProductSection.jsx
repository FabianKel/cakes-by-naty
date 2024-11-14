'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';


function AddProductSection() {
  const [productData, setProductData] = useState({
    nombre: ' ',
    descripcion: ' ',
    categoria_id: 1,
    ocasion_id: 1,
    precio: ' ',
    imagen1: '/placeholder1.png',
    imagen2: null,
    imagen3: null,
    detalles: {
      relleno_id: 1,
      masa_id: 1,
      sabor_galleta_id: null,
      cobertura_id: 1,
      tipo_chocolate_id: 1,
    },
  });


  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [productos, setProductos] = useState([]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setProductData({
      nombre: '',
      descripcion: '',
      categoria_id: 1,
      ocasion_id: 1,
      precio: '',
      imagen1: '/../placeholder1.png',
      imagen2: null,
      imagen3: null,
      detalles: {
        relleno_id: 1,
        masa_id: 1,
        sabor_galleta_id: 1,
        cobertura_id: 1,
        tipo_chocolate_id: 1,
      },
    });
  };

  useEffect(() => {
    const cargarProductos = async () => {
      const response = await fetch('http://localhost:4000/products');

      const data = await response.json();
      setProductos(data.productos);
    };
    cargarProductos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'precio' && value < 0) {
      return;
    }
    if (name in productData.detalles) {
      setProductData({
        ...productData,
        detalles: {
          ...productData.detalles,
          [name]: value,
        },
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = (e) => {
    setProductData({ ...productData, imagen: e.target.files[0] });
  };

  const agregarProducto = async () => {
    console.log('Función agregarProducto ejecutada...');
    const producto = {
      nombre: productData.nombre,
      descripcion: productData.descripcion,
      categoria_id: productData.categoria_id ? parseInt(productData.categoria_id) : null,
      ocasion_id: productData.ocasion_id ? parseInt(productData.ocasion_id) : null,
      precio: productData.precio,
      imagen1: productData.imagen1,
      imagen2: productData.imagen2,
      imagen3: productData.imagen3,
      detalles: {
        relleno_id: productData.detalles.relleno_id ? parseInt(productData.detalles.relleno_id) : null,
        masa_id: productData.detalles.masa_id ? parseInt(productData.detalles.masa_id) : null,
        sabor_galleta_id: productData.detalles.sabor_galleta_id
          ? parseInt(productData.detalles.sabor_galleta_id)
          : null,
        cobertura_id: productData.detalles.cobertura_id ? parseInt(productData.detalles.cobertura_id) : null,
        tipo_chocolate_id: productData.detalles.tipo_chocolate_id
          ? parseInt(productData.detalles.tipo_chocolate_id)
          : null,
      },
    };
    console.log('Producto a enviar:', producto);
    try {
      const response = await fetch('http://localhost:4000/product/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        console.error('Error al crear el producto:', data.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado, comenzando proceso de agregar producto...');
    agregarProducto();
  };

  return (
        <div className='ml-4'>
          <div className='p-8 bg-white border border-gray-300 rounded-md shadow-inner'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block font-semibold mb-2'>Nombre:</label>
                  <input
                    type='text'
                    name='nombre'
                    value={productData.nombre}
                    onChange={handleInputChange}
                    placeholder='Ej: Pastel de Cumpleaños'
                    className='w-full p-2 border rounded-md mb-4'
                  />

                  <label className='block font-semibold mb-2'>Categoría:</label>
                  <select
                    name='categoria_id'
                    value={productData.categoria_id}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-md mb-4'
                  >
                    <option  className='' value=''>Selecciona una categoría</option>
                    <option value='1'>Cupcakes</option>
                    <option value='2'>Chocolates</option>
                    <option value='3'>Espumillas</option>
                    <option value='4'>Galletas</option>
                    <option value='5'>Pasteles</option>
                  </select>

                  <label className='block font-semibold mb-2'>Descripción:</label>
                  <textarea
                    name='descripcion'
                    value={productData.descripcion}
                    onChange={handleInputChange}
                    placeholder='Escribe una descripción del producto'
                    className='w-full p-2 border rounded-md mb-4 h-32'
                  ></textarea>
                </div>
                <div>
                  <label className='block font-semibold mb-2'>Precio:</label>
                  <input
                    type='number'
                    name='precio'
                    value={productData.precio}
                    onChange={handleInputChange}
                    placeholder='Q 0.00'
                    className='w-full p-2 border rounded-md mb-4'
                  />

                  <label className='block font-semibold mb-2'>Ocasión:</label>
                  <select
                    name='ocasion_id'
                    value={productData.ocasion_id}
                    onChange={handleInputChange}
                className='w-full p-2 border rounded-md mb-4 max-h-32 overflow-y-auto md:max-h-full'
                  >
                    <option value=''>Selecciona una ocasión</option>
                    <option value='1'>Indefinida</option>
                    <option value='2'>Verano</option>
                    <option value='3'>Otoño</option>
                    <option value='4'>Invierno</option>
                    <option value='5'>Primavera</option>
                    <option value='6'>Día del Niño</option>
                    <option value='7'>Navidad</option>
                    <option value='8'>San Valentin</option>
                    <option value='9'>Aniversario</option>
                    <option value='10'>Año nuevo</option>
                    <option value='11'>Halloween</option>
                    <option value='12'>15 años</option>
                    <option value='13'>Boda</option>
                    <option value='14'>Bautizo</option>
                    <option value='15'>Primera comunion</option>
                    <option value='16'>Confirmacion</option>
                    <option value='17'>Día de la madre</option>
                    <option value='18'>Día del padre</option>
                    <option value='19'>Día de los abuelitos</option>
                  </select>

                  <label className='block font-semibold mb-2'>Relleno:</label>
                  <select
                    name='relleno_id'
                    value={productData.relleno_id}
                    onChange={handleInputChange}
                    placeholder='Ej: Chocolate'
                    className='w-full p-2 border rounded-md mb-4'
                  >
                    <option value=''>Selecciona un relleno</option>
                    <option value='1'>Cajeta</option>
                    <option value='5'>Cream Cheese</option>
                    <option value='3'>Jalea de Fresa</option>
                    <option value='4'>Jalea de Mora</option>
                    <option value='2'>Nutella</option>
                  </select>

                  <label className='block font-semibold mb-2'>Chocolate:</label>
                  <select
                    name='tipo_chocolate_id'
                    value={productData.tipo_chocolate_id}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-md mb-4'
                  >
                    <option value=''>Selecciona el tipo de chocolate</option>
                    <option value='2'>Blanco</option>
                    <option value='1'>Leche</option>
                    <option value='3'>Oscuro</option>
                  </select>
                  <label className='block font-semibold mb-2'>Masa:</label>
                  <select
                    name='masa_id'
                    value={productData.masa_id}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-md mb-4'
                  >
                    <option value=''>Selecciona una masa</option>
                    <option value='3'>Amapola</option>
                    <option value='7'>Arandanos</option>
                    <option value='1'>Chocolate</option>
                    <option value='5'>Red Velvet</option>
                    <option value='2'>Vainilla</option>
                    <option value='4'>Veteado</option>
                    <option value='6'>Zanahoria</option>
                  </select>
                  <label className='block font-semibold mb-2'>Sabor de Galleta:</label>
                  <select
                    name='sabor_galleta_id'
                    value={productData.sabor_galleta_id}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-md mb-4'
                  >
                    <option value=''>Selecciona el tipo de galleta</option>
                    <option value='4'>Arandanos</option>
                    <option value='3'>Chocolate</option>
                    <option value='2'>Jengibre</option>
                    <option value='1'>Mantequilla</option>
                    <option value='5'>Matcha</option>
                    <option value='6'>Pecanas</option>
                  </select>

                  <label className='block font-semibold mb-2'>Cobertura:</label>
                  <select
                    name='cobertura_id'
                    value={productData.cobertura_id}
                    onChange={handleInputChange}
                    placeholder='Ej: Fondant'
                    className='w-full p-2 border rounded-md mb-4'
                  >
                    <option value=''>Selecciona una cobertura</option>
                    <option value='5'>Cream Cheese</option>
                    <option value='3'>Crema de Mantequilla</option>
                    <option value='1'>Fondant</option>
                    <option value='2'>Fruta</option>
                    <option value='4'>Turron</option>
                  </select>
                </div>
                <div className='md:col-span-2'>
                  <label className='block font-semibold mb-2 mt-2'>Imagen:</label>
                  <div className='border-dashed border-2 border-gray-300 p-10 h-64 w-full text-center mt-4 mb-4 flex justify-center items-center relative'>
                    <input
                      type='file'
                      name='imagen'
                      onChange={handleImageUpload}
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                    <div className='relative z-10 flex flex-col justify-center items-center'>
                      <p className='text-gray-500 text-sm mb-4'>Selecciona una imagen</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex justify-end'>
                <Button type='submit' className='p-4 bg-green-500 hover:scale-105 text-white rounded-md'>
                  Agregar Producto
                </Button>
              </div>
            </form>
          </div>
          <Modal
        isOpen={showSuccessModal}
        onCancel={handleCloseSuccessModal}
        onAgree={handleCloseSuccessModal}
        msg="¡Producto agregado exitosamente!"
        type="success"
      >
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-4 text-buttonPurple">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Button
            onClick={handleCloseSuccessModal}
            className="bg-buttonPurple text-white px-8 py-2 rounded-lg hover:bg-buttonhoverPurple transition-colors duration-300 font-semibold text-lg shadow-md"
          >
            Entendido
          </Button>
        </div>
      </Modal>
      </div>
  );
}

export default AddProductSection;