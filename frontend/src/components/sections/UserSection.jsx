'use client';

import Button from '../common/Button';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function UserSection() {
    const [usuario, setUsuario] = useState(null);
    const router = useRouter();

    useEffect(() => {

        fetch('http://localhost:4000/usuarios/2')
            .then((response) => response.json())
            .then((data) => setUsuario(data.usuario))
            .catch((error) => console.error('Error obteniendo datos de usuario:', error));
    }, []);

    if (!usuario) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className='flex flex-row gap-5 sm:flex-col md:flex-row'>
                <div className="bg-white w-full max-w-lg mx-auto p-12 py-16 rounded-lg shadow-lg border border-gray-300">
                    <h1 className="text-3xl font-semibold font-poppins text-center">
                            {usuario.usuario}
                    </h1>
                    <div className="mt-6 flex flex-col text-left mb-8 gap-6">
                        <div className='flex flex-col'>
                            <a className=' font-bold text-xl'>Nombre:</a>
                            <div className='flex flex-row justify-between'>
                            <p className="text-lg ">{usuario.primer_nombre} {usuario.segundo_nombre}</p>
                            <Button
                                className="p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom"
                                onClick={() => console.log('Editar clicked')}
                            >
                                Editar
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <a className=' font-bold text-xl'>Dirección de Correo:</a>
                            <div className='flex flex-row justify-between'>
                                <p className="text-lg ">{usuario.correo}</p>
                                <Button
                                    className="p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom"
                                    onClick={() => console.log('Editar clicked')}
                                >
                                    Editar
                                    </Button>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                        <a className=' font-bold text-xl'>Número de Celular:</a>
                            <div className='flex flex-row justify-between'>
                                <p className="text-lg ">{usuario.telefono}</p>
                            <Button
                                className="p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom"
                                onClick={() => console.log('Editar clicked')}
                            >
                                Editar
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <a className=' font-extrabold text-xl'>Contraseña:</a>
                            <div className='flex flex-row justify-between'>
                            <p className="text-lg ">*********</p>
                            <Button
                                className="p-2 bg-gray-100 text-gray-800 border-black border-2 rounded-3xl hover:bg-gray-300 transition duration-300 font-navheader w-32 h-8 align-bottom"
                                onClick={() => console.log('Editar clicked')}
                            >
                                Editar
                                </Button>
                            </div>
                        </div>
                        <div>
                            <a className="text-lg font-semibold text-blue-600 hover:text-blue-900 justify-normal" href='/user/direcciones'>Ver mis direcciones</a>       
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full max-w-lg overflow-scroll mx-auto p-12 py-16 rounded-lg shadow-lg border border-gray-300">
                    <h1 className="text-3xl font-semibold font-poppins">
                        Tus Pedidos
                    </h1>
                    <div>
                        <div className="bg-white w-full max-w-lg p-4 mt-4  rounded-lg shadow-lg border border-gray-300">
                            <h2>Pedido #1</h2>
                            <p>cocococococococococococo cocococococococo cocococo cocococococococo</p>
                        </div>
                        <div className="bg-white w-full max-w-lg p-4 mt-4  rounded-lg shadow-lg border border-gray-300">
                            <h2>Pedido #2</h2>
                            <p>cocococococococococococo cocococococococo cocococo cocococococococo</p>
                        </div>
                        <div className="bg-white w-full max-w-lg p-4 mt-4  rounded-lg shadow-lg border border-gray-300">
                            <h2>Pedido #3</h2>
                            <p>cocococococococococococo cocococococococo cocococo cocococococococo</p>
                        </div>
                        <div className="bg-white w-full max-w-lg p-4 mt-4  rounded-lg shadow-lg border border-gray-300">
                            <h2>Pedido #4</h2>
                            <p>cocococococococococococo cocococococococo cocococo cocococococococo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSection;