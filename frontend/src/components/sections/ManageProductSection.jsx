'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

function ManageProductSection() {
  const [productos, setProductos] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nombre: null,
    descripcion: null,
    categoriaid: null,
    ocasionid: null,
    precio: null,
    imagen1: null,
    imagen2: null,
    imagen3: null,
    rellenoid: null,
    masaid: null,
    saborgalletaid: null,
    coberturaid: null,
    tipochocolateid: null,
  });

  const categorias = [
    { id: 1, nombre: "cupcake" },
    { id: 2, nombre: "cakepop" },
    { id: 3, nombre: "pastel" },
    { id: 4, nombre: "galleta" },
    { id: 5, nombre: "chocolate" },
    { id: 6, nombre: "espumilla" },
  ];

  const ocasiones = [
    { id: '1', nombre: 'Indefinida' },
    { id: '2', nombre: 'Verano' },
    { id: '3', nombre: 'Otoño' },
    { id: '4', nombre: 'Invierno' },
    { id: '5', nombre: 'Primavera' },
    { id: '6', nombre: 'Día del Niño' },
    { id: '7', nombre: 'Navidad' },
    { id: '8', nombre: 'San Valentin' },
    { id: '9', nombre: 'Aniversario' },
    { id: '10', nombre: 'Año nuevo' },
    { id: '11', nombre: 'Halloween' },
    { id: '12', nombre: '15 años' },
    { id: '13', nombre: 'Boda' },
    { id: '14', nombre: 'Bautizo' },
    { id: '15', nombre: 'Primera comunion' },
    { id: '16', nombre: 'Confirmacion' },
    { id: '17', nombre: 'Día de la madre' },
    { id: '18', nombre: 'Día del padre' },
    { id: '19', nombre: 'Día de los abuelitos' },
  ];

  const rellenos = [
    { id: '1', nombre: 'Cajeta' },
    { id: '2', nombre: 'Nutella' },
    { id: '3', nombre: 'Jalea de Fresa' },
    { id: '4', nombre: 'Jalea de Mora' },
    { id: '5', nombre: 'Cream Cheese' },
  ];

  const masas = [
    { id: '1', nombre: 'Chocolate' },
    { id: '2', nombre: 'Vainilla' },
    { id: '3', nombre: 'Amapola' },
    { id: '4', nombre: 'Veteado' },
    { id: '5', nombre: 'Red Velvet' },
    { id: '6', nombre: 'Zanahoria' },
    { id: '7', nombre: 'Arandanos' },
  ];

  const sabores = [
    { id: '1', nombre: 'Mantequilla' },
    { id: '2', nombre: 'Jengibre' },
    { id: '3', nombre: 'Chocolate' },
    { id: '4', nombre: 'Arandanos' },
    { id: '5', nombre: 'Matcha' },
    { id: '6', nombre: 'Pecanas' },
  ];

  const coberturas = [
    { id: '1', nombre: 'Fondant' },
    { id: '2', nombre: 'Fruta' },
    { id: '3', nombre: 'Crema de mantequilla' },
    { id: '4', nombre: 'Turron' },
    { id: '5', nombre: 'Cream Cheese' },
  ];

  const tipochocolates = [
    { id: '1', nombre: 'Leche' },
    { id: '2', nombre: 'Blanco' },
    { id: '3', nombre: 'Oscuro' },
  ];

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

  const handlePreview = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = async (producto) => {
    const data = {
      nombre: producto.productonombre || null,
      descripcion: producto.descripcion || null,
      categoriaid: producto.categoria || null,
      ocasionid: producto.ocasion || null,
      precio: producto.precio || null,
      imagen1: producto.imagen1 || null,
      imagen2: producto.imagen2 || null,
      imagen3: producto.imagen3 || null,
      rellenoid: producto.rellenonombre || null,
      masaid: producto.masanombre || null,
      saborgalletaid: producto.saborgalletatipo || null,
      coberturaid: producto.coberturatipo || null,
      tipochocolateid: producto.tipochocolate || null,
      productoid: producto.productoid,
    };
    setEditFormData(data);
    setInitialFormData(data);
    setIsEditModalOpen(true);
    setIsModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    const numberFields = [
      'categoriaid',
      'ocasionid',
      'rellenoid',
      'masaid',
      'saborgalletaid',
      'coberturaid',
      'tipochocolateid',
      'precio',
      'productoid'
    ];

    setEditFormData(prev => ({
      ...prev,
      [name]: numberFields.includes(name) ?
        // Si el valor está vacío o es null, lo mantenemos como null
        value === '' || value === null ? null : Number(value)
        : value
    }));
  };

  const dataToSubmit = Object.fromEntries(
    Object.entries(editFormData)
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => {
        const numberFields = [
          'categoriaid',
          'ocasionid',
          'rellenoid',
          'masaid',
          'saborgalletaid',
          'coberturaid',
          'tipochocolateid',
          'precio',
          'productoid'
        ];

        // Si es un campo numérico, asegurarse de que sea número
        if (numberFields.includes(key)) {
          return [key, Number(value)];
        }
        return [key, value];
      })
  );

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const hasChanges = Object.keys(editFormData).some(
      (key) => editFormData[key] !== initialFormData[key]
    );

    if (!hasChanges) {
      alert("No se han realizado cambios.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/product/${editFormData.productoid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      console.log('Edit Form Data:', editFormData);

      if (response.ok) {
        const updatedProducts = await fetch('http://localhost:4000/products');
        const data = await updatedProducts.json();
        setProductos(data.productos);

        setIsEditModalOpen(false);
        setShowSuccessModal(true);
        setEditFormData({
          nombre: null,
          descripcion: null,
          categoriaid: null,
          ocasionid: null,
          precio: null,
          imagen1: null,
          imagen2: null,
          imagen3: null,
          rellenoid: null,
          masaid: null,
          saborgalletaid: null,
          coberturaid: null,
          tipochocolateid: null,
        });
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleDelete = (producto) => {
    setProductToDelete(producto);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`http://localhost:4000/product/${productToDelete.productoid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedProducts = await fetch('http://localhost:4000/products');
        const data = await updatedProducts.json();
        setProductos(data.productos);
        setShowDeleteModal(false);
        setShowDeleteSuccessModal(true);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };


  return (
    <div className='ml-4'>
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Tus Productos</h2>
        <div className="min-h-[1010px] h-auto bg-white border-2 border-gray-300 rounded-md overflow-y-auto max-h-80">

          <div className="md:grid-cols-[5fr_4fr_4fr] items-center border-b border-gray-300 md:p-4 font-semibold text-gray-700 hidden md:grid">
            <span>Producto</span>
            <span className='text-center'>Precio</span>
            <span className='text-center'>Opciones</span>
          </div>
          {productos.map((producto) => (
            <div
              key={producto.productoid}
              className="grid grid-cols-1 md:grid-cols-[5fr_4fr_4fr] items-center border-b border-gray-300 p-4 "
            >
              <div className='relative pb-2 md:hidden'>
                {/* Botón de tres puntos en celular */}
                <button
                  onClick={() => toggleOptions(producto.productoid)}
                  className="flex md:hidden items-center place-self-end justify-center w-8 h-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>

                {/* Menú desplegable en modo móvil */}
                {showOptions === producto.productoid && (
                  <div className="absolute top-10 right-2 bg-white border rounded-lg shadow-lg z-10 md:hidden">
                    <button
                      type="button"
                      className="flex items-center py-2 px-4 hover:bg-gray-100 text-gray-700 w-full"
                      onClick={() => handlePreview(producto)}
                    >
                      <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Ver más
                    </button>
                    <button
                      type="button"
                      className="flex items-center py-2 px-4 hover:bg-gray-100 text-gray-700 w-full"
                      onClick={() => handleEdit(producto)}
                    >
                      <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="flex items-center py-2 px-4 hover:bg-red-100 text-red-500 w-full"
                      onClick={() => handleDelete(producto)}
                    >
                      <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922Z" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
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
              <div className="ml-4 md:ml-0 md:text-center">
                <p className="text-lg font-bold">Q{parseFloat(producto.precio).toFixed(2)}</p>
              </div>

              {/* Columna de Opciones en escritorio */}
              <div className="hidden md:flex md:flex-row justify-center gap-3">
                <Button
                  type="button"
                  className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                  onClick={() => handlePreview(producto)}
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Detalles
                </Button>
                <Button
                  type="button"
                  className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                  onClick={() => handleEdit(producto)}
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  Editar
                </Button>
                <Button
                  type="button"
                  className="flex w-full items-center py-2 px-4 hover:bg-red-100 text-red-500"
                  onClick={() => handleDelete(producto)}
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922Z" />
                  </svg>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Preview */}
      {isModalOpen && selectedProduct && (
        <Modal isOpen={isModalOpen} onCancel={closeModal} type="success">
          <div className="w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProduct.productonombre}
                </h2>
                <p className="text-xl font-medium text-baseLavender mt-1">
                  Q{parseFloat(selectedProduct.precio).toFixed(2)}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-800 font-bold uppercase">Categoría</h3>
                <p className="mt-1 text-gray-800">{selectedProduct.categoria}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase">Descripción</h3>
                <p className="mt-1 text-gray-800 leading-relaxed">
                  {selectedProduct.descripcion}
                </p>
              </div>

              {selectedProduct.ocasion && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase">Ocasión</h3>
                  <p className="mt-1 text-gray-800">{selectedProduct.ocasion}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <Button
                type="button"
                className="flex items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                onClick={() => handleEdit(selectedProduct)}
              >
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                Editar
              </Button>
              <Button
                type="button"
                className="flex items-center py-2 px-4 hover:bg-red-100 text-red-500"
                onClick={() => handleDelete(selectedProduct)}
              >
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922Z" />
                </svg>
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de Edición */}
      {isEditModalOpen && editFormData && (
        <Modal isOpen={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} type="success">
          <div className="w-full max-w-3xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Editar Producto
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={editFormData.nombre}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio:</label>
                  <input
                    type="number"
                    name="precio"
                    value={editFormData.precio}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría:</label>
                  <select
                    name="categoriaid"
                    value={editFormData.categoriaid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.categoriaid || ''}>
                      {editFormData.categoriaid}
                    </option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ocasión:</label>
                  <select
                    name="ocasionid"
                    value={editFormData.ocasionid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.ocasionid || ''}>
                      {editFormData.ocasionid}
                    </option>
                    {ocasiones.map((ocasion) => (
                      <option key={ocasion.id} value={ocasion.id}>
                        {ocasion.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Relleno:</label>
                  <select
                    name="rellenoid"
                    value={editFormData.rellenoid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.rellenoid || ''}>
                      {editFormData.rellenoid}
                    </option>
                    {rellenos.map((relleno) => (
                      <option key={relleno.id} value={relleno.id}>
                        {relleno.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Masa:</label>
                  <select
                    name="masaid"
                    value={editFormData.masaid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.masaid || ''}>
                      {editFormData.masaid}
                    </option>
                    {masas.map((masa) => (
                      <option key={masa.id} value={masa.id}>
                        {masa.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sabor Galleta:</label>
                  <select
                    name="saborgalletaid"
                    value={editFormData.saborgalletaid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.saborgalletaid || ''}>
                      {editFormData.saborgalletaid}
                    </option>
                    {sabores.map((sabor) => (
                      <option key={sabor.id} value={sabor.id}>
                        {sabor.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cobertura:</label>
                  <select
                    name="coberturaid"
                    value={editFormData.coberturaid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.coberturaid || ''}>
                      {editFormData.coberturaid}
                    </option>
                    {coberturas.map((cobertura) => (
                      <option key={cobertura.id} value={cobertura.id}>
                        {cobertura.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Chocolate:</label>
                  <select
                    name="tipochocolateid"
                    value={editFormData.masaid}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                    <option value={editFormData.tipochocolateid || ''}>
                      {editFormData.tipochocolateid}
                    </option>
                    {tipochocolates.map((tipochocolate) => (
                      <option key={tipochocolate.id} value={tipochocolate.id}>
                        {tipochocolate.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Descripción:</label>
                  <textarea
                    name="descripcion"
                    value={editFormData.descripcion}
                    onChange={handleEditFormChange}
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex items-center py-2 px-4 bg-violet-600 text-white hover:bg-violet-700"
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onCancel={handleCloseSuccessModal}
          onAgree={handleCloseSuccessModal}
          msg="¡Producto actualizado exitosamente!"
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
      )}
      {/* Modal de eliminación */}
      {showDeleteModal && productToDelete && (
        <Modal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          type="success"
        >
          <div className="flex flex-col items-center justify-center p-6">
            <div className="mb-6 text-red-500">
              <svg
                className="w-20 h-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-800">¿Estás seguro?</h3>
            <p className="mb-6 text-gray-600 text-center">
              Esta acción eliminará permanentemente el producto "{productToDelete.productonombre}".
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {showDeleteSuccessModal && (
        <Modal
          isOpen={showDeleteSuccessModal}
          onCancel={() => setShowDeleteSuccessModal(false)}
          type="success"
        >
          <div className="flex flex-col items-center justify-center p-8">
            <div className="mb-6 text-buttonPurple">
              <svg
                className="w-20 h-20"
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              ¡Producto eliminado exitosamente!
            </h3>
            <Button
              onClick={() => setShowDeleteSuccessModal(false)}
              className="bg-buttonPurple text-white px-10 py-3 rounded-lg hover:bg-buttonhoverPurple transition-colors duration-300 font-semibold text-base shadow-lg"
            >
              Entendido
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ManageProductSection;
