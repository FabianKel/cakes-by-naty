'use client';
import React from 'react';

import { register } from '@/utils/https';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import Button from '@/components/Button';


function RegisterSection() {
    //Para este register se debe tomar el Rol del usuario como el predeterminado osea "Cliente"
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            registerHandler(values.username, values.email, values.password);
        },
        validationSchema: yup.object({
            username: yup.string().trim().required('Nombre de usuario es requerido'),
            email: yup.string().trim().required('Correo electrónico es requerido'),
            password: yup.string().trim().required('Contraseña es requerido'),
        }),
    });

    const registerHandler = async (username, email, password) => {
        const user = await register(username, email, password);

        if (user?.register) {
            router.push('/');
        } else {
            console.log('Error al crear usuario');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white w-full max-w-lg mx-auto p-12 py-20 rounded-lg shadow-lg border border-gray-300">
                <div className='text-center mb-8'>
                    <h1 className="text-3xl font-semibold font-poppins">Register</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-6'>
                        <input
                            type='text'
                            name='username'
                            placeholder='Usuario'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-4 border border-gray-300 rounded-md font-poppins"
                        />
                        {formik.errors.username && (
                            <span className='text-red-500 text-sm block text-center mt-2'>{formik.errors.username}</span>
                        )}
                    </div>
                    <div className='mb-6'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full p-4 border border-gray-300 rounded-md font-poppins'
                        />
                        {formik.errors.email && (
                            <span className='text-red-500 text-sm block text-center mt-2'>{formik.errors.email}</span>
                        )}
                    </div>
                    <div className='mb-6 relative'>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-4 border border-gray-300 rounded-md font-poppins"
                        />
                        <Button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                        >
                            {passwordVisible ? 'Ocultar' : 'Mostrar'}
                        </Button>
                        {formik.errors.password && (
                            <span className='text-red-500 text-sm block text-center mt-2'>{formik.errors.password}</span>
                        )}
                    </div>
                    <div className='mb-8'>
                        <Button
                            type='submit'
                            className='w-full p-4 bg-white text-black border-hoverPink border-2 rounded-md font-poppins hover:bg-hoverPink transition duration-300'
                        >
                            Regístrate
                        </Button>
                    </div>
                </form>
                <div className='text-center mt-8'>
                    <p>
                        ¿Ya tienes una cuenta?{' '}
                        <a
                            onClick={() => router.push('/login')}
                            className="text-midPink hover:text-hoverPink hover:cursor-pointer font-bold transition-colors"
                        >
                            Inicia Sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterSection;