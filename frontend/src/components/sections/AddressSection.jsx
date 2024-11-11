import React, { useState } from 'react';

const AddressSection = ({ direcciones, onAddAddress, onEditAddress, onDeleteAddress }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [newAddress, setNewAddress] = useState({
        nombre: '',
        campo1: '',
        campo2: '',
        ciudad: '',
        departamento: '',
        detalles: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: value
        });
        console.log('Nuevo valor de dirección:', newAddress);
    };

    const handleAddAddress = () => {
        const requiredFields = ['nombre', 'campo1', 'ciudad'];
        const missingFields = requiredFields.filter(field => !newAddress[field]);

        if (missingFields.length > 0) {
            alert(`Por favor completa los siguientes campos: ${missingFields.join(', ')}`);
            return;
        }

        onAddAddress(newAddress);
        resetForm();
    };

    const handleEditAddress = () => {
        if (newAddress.nombre && newAddress.campo1 && newAddress.ciudad) {
            onEditAddress(editingAddressId, newAddress);
            resetForm();
        } else {
            alert("Por favor, completa todos los campos requeridos.");
        }
    };

    const startEditing = (direccion) => {
        setShowForm(true);
        setEditingAddressId(direccion.id);
        setNewAddress({
            nombre: direccion.nombre,
            campo1: direccion.campo1,
            campo2: direccion.campo2,
            ciudad: direccion.ciudad,
            departamento: direccion.departamento,
            detalles: direccion.detalles
        });
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingAddressId(null);
        setNewAddress({ nombre: '', campo1: '', campo2: '', ciudad: '', departamento: '', detalles: '' });
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Direcciones</h2>
            <ul className="space-y-3">
                {Array.isArray(direcciones) && direcciones.map((direccion) => (
                    <li key={direccion.id} className="flex flex-col md:flex-row justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-grow">
                            <h3 className="text-gray-700 font-semibold">{direccion.nombre}</h3>
                            <p className="text-gray-600">{direccion.campo1}</p>
                            <p className="text-gray-600">{direccion.campo2}</p>
                            <p className="text-gray-600">{direccion.ciudad}, {direccion.departamento}</p>
                            <p className="text-gray-500">{direccion.detalles}</p>
                        </div>
                        <div className="flex flex-row md:flex-row gap-2 mt-3 md:mt-0 md:ml-4">
                            <button
                                onClick={() => startEditing(direccion)}
                                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                <span className="text-sm font-medium">Editar</span>
                            </button>
                            <button
                                onClick={() => onDeleteAddress(direccion.id)}
                                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                                <span className="text-sm font-medium">Borrar</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {!editingAddressId && direcciones.length < 3 && (
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mt-4 flex items-center justify-center p-3 bg-purple-200 rounded-full hover:bg-purple-300 w-full md:w-auto transition-colors"
                >
                    <svg
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="ml-2 text-purple-600 font-semibold">
                        Agregar dirección
                    </span>
                </button>
            )}
            {showForm && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-md font-semibold mb-4">
                        {editingAddressId ? "Editar Dirección" : "Nueva Dirección"}
                    </h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="nombre"
                            value={newAddress.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre de la dirección (ej: Casa, Trabajo)"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                        <input
                            type="text"
                            name="campo1"
                            value={newAddress.campo1}
                            onChange={handleInputChange}
                            placeholder="Dirección línea 1"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                        <input
                            type="text"
                            name="campo2"
                            value={newAddress.campo2}
                            onChange={handleInputChange}
                            placeholder="Dirección línea 2 (opcional)"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="ciudad"
                                value={newAddress.ciudad}
                                onChange={handleInputChange}
                                placeholder="Ciudad"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                            <input
                                type="text"
                                name="departamento"
                                value={newAddress.departamento}
                                onChange={handleInputChange}
                                placeholder="Departamento"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                            />
                        </div>
                        <input
                            type="text"
                            name="detalles"
                            value={newAddress.detalles}
                            onChange={handleInputChange}
                            placeholder="Detalles adicionales (ej: código de acceso, referencias)"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300"
                        />
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={editingAddressId ? handleEditAddress : handleAddAddress}
                                className="flex-1 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                {editingAddressId ? "Guardar cambios" : "Guardar dirección"}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressSection;
