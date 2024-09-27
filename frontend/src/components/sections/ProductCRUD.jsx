'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

function ProductCRUD() {
    const [productData, setProductData] = useState({
        nombre: '',
        categoria: '',
        descripcion: '',
        precio: '',
        imagen: null,
        ocasion: '',
        relleno: '',
        chocolate: '',
        masa: '',
        saborGalleta: '',
        cobertura: ''
    });

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Simulando la carga de productos desde un archivo JSON
        const cargarProductos = async () => {
            const response = await fetch('http://localhost:4000/productos/6');
            const data = await response.json();
            setProductos(data.productos);
        };
        cargarProductos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setProductData({ ...productData, imagen: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productData);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white w-full max-w-6xl p-8 rounded-md shadow-lg mt-4 mb-4">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-8 rounded-md shadow-inner">
                        <h2 className="text-2xl font-bold mb-4 text-center">Tus productos</h2>
                        <div className="min-h-[750px] h-auto bg-white border-2 border-gray-300 rounded-md flex flex-col items-left justify-start overflow-y-auto max-h-80">
                            {productos.map((producto) => (
                                <div key={producto.productoid} className="relative flex items-center border-b border-gray-300 p-4">
                                    <Image 
                                        src={producto.imagen1}
                                        alt={producto.productonombre}
                                        width={100}
                                        height={100}
                                        className="rounded-md"
                                    />
                                    <div className="ml-4 flex-grow">
                                        <h3 className="text-xl font-semibold">{producto.productonombre}</h3>
                                        <p className="text-sm text-gray-600">{producto.categoria}</p>
                                        <p className="text-sm text-gray-600">{producto.ocasion}</p>
                                        <p className="text-lg font-bold">Q{parseFloat(producto.precio).toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <Button 
                                            //onClick={() => handleEdit(producto)}
                                            className="mb-2 p-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            //onClick={() => handleDelete(producto.productoid)}
                                            className="p-2 bg-red-500 text-white rounded-md"
                                        >
                                            Borrar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-300 rounded-md shadow-inner">
                        <h2 className="text-2xl font-bold mb-6 text-center">Agregar Producto</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-semibold mb-2">Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={productData.nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Pastel de Cumpleaños"
                                        className="w-full p-2 border rounded-md mb-4"
                                    />

                                    <label className="block font-semibold mb-2">Categoría:</label>
                                    <select
                                        name="categoria"
                                        value={productData.categoria}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md mb-4"
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        <option value="cupcake">Cupcakes</option>
                                        <option value="chocolate">Chocolates</option>
                                        <option value="espumilla">Espumillas</option>
                                        <option value="galleta">Galletas</option>
                                        <option value="pastel">Pasteles</option>
                                    </select>

                                    <label className="block font-semibold mb-2">Descripción:</label>
                                    <textarea
                                        name="descripcion"
                                        value={productData.descripcion}
                                        onChange={handleInputChange}
                                        placeholder="Escribe una descripción del producto"
                                        className="w-full p-2 border rounded-md mb-4 h-32"
                                    ></textarea>

                                    <label className="block font-semibold mb-2">Imagen:</label>
                                    <div className="border-dashed border-2 border-gray-300 p-10 h-64 w-96 text-center mt-4 ml-10 mb-4 flex justify-center items-center relative">
                                        <input
                                            type="file"
                                            name="imagen"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="relative z-10 flex flex-col justify-center items-center">
                                            <p className="text-gray-500 text-sm mb-4">Arrastra o selecciona una imagen</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2">Ocasión:</label>
                                    <input
                                        type="text"
                                        name="ocasion"
                                        value={productData.ocasion}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Cumpleaños"
                                        className="w-full p-2 border rounded-md mb-4"
                                    />

                                    <label className="block font-semibold mb-2">Precio:</label>
                                    <input
                                        type="number"
                                        name="precio"
                                        value={productData.precio}
                                        onChange={handleInputChange}
                                        placeholder="Q."
                                        className="w-full p-2 border rounded-md mb-4"
                                    />

                                    <label className="block font-semibold mb-2">Relleno:</label>
                                    <input
                                        type="text"
                                        name="relleno"
                                        value={productData.relleno}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Chocolate"
                                        className="w-full p-2 border rounded-md mb-4"
                                    />

                                    <label className="block font-semibold mb-2">Cobertura:</label>
                                    <input
                                        type="text"
                                        name="cobertura"
                                        value={productData.cobertura}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Fondant"
                                        className="w-full p-2 border rounded-md mb-4"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button
                                    type="submit"
                                    className="p-4 bg-green-500 text-white rounded-md"
                                >
                                    Agregar Producto
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCRUD;