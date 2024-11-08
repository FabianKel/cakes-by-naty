'use client';
import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import { register } from '@/utils/https';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Button = dynamic(() => import('@/components/common/Button'), { ssr: false });

function RegisterSection() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
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
            email: yup.string().email().required('Correo electrónico es requerido'),
            password: yup.string().trim().required('Contraseña es requerida'),
        }),
    });

    const registerHandler = async (username, email, password) => {
        const user = await register(username, email, password);

        if (user?.register) {
            setAlertType('success');
            setAlertMessage('¡Registro exitoso!');
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push('/login');
        } else {
            setAlertType('error');
            setAlertMessage('El nombre de usuario o correo electrónico ya está en uso.');
            console.log('Error al crear usuario');
        }
    };

    return (
        <>
            <Head>
                <link rel="preload" href="/fondos/fondo.webp" as="image" />
            </Head>

            <div className="flex items-center justify-center min-h-screen bg-[url('/fondos/fondo.webp')] bg-cover backdrop-blur-sm">
                <div className="z-10 bg-white/80 w-full max-w-sm md:max-w-lg mx-auto p-6 md:p-12 py-12 md:py-20 rounded-lg shadow-lg border border-baseLilac">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-4xl font-semibold font-cursive text-titlesPurple1">Registro</h1>
                    </div>
                    {alertMessage && (
                        <div className={`mb-6 p-4 rounded-md text-white text-center ${alertType === 'success' ? 'bg-green-500' : 'bg-red-400'}`}>
                            {alertMessage}
                        </div>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="username"
                                placeholder="Usuario"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 md:p-4 border border-borderPurple rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-borderPurple focus:border-borderPurple"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <span className="text-red-500 text-sm block text-center mb-6 mt-4">{formik.errors.username}</span>
                            )}
                        </div>
                        <div className="mb-6">
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 md:p-4 border border-borderPurple rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-borderPurple focus:border-borderPurple"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-red-500 text-sm block text-center mb-6 mt-4">{formik.errors.email}</span>
                            )}
                        </div>
                        <div className="mb-6 relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Contraseña"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 md:p-4 border border-borderPurple rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-borderPurple focus:border-borderPurple"
                            />
                            <Button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-buttonhoverPurple"
                            >
                                {passwordVisible ? 'Ocultar' : 'Mostrar'}
                            </Button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 text-sm block text-center mb-2">{formik.errors.password}</span>
                        )}
                        <div className="mb-8 mt-12">
                            <Button
                                type="submit"
                                className="w-full p-3 md:p-4 bg-white text-black border-baseLilac border-2 rounded-md font-poppins hover:bg-buttonhoverPurple transition duration-300"
                            >
                                Regístrate
                            </Button>
                        </div>
                    </form>
                    <div className="text-center mt-8">
                        <p className="text-sm md:text-base">
                            ¿Ya tienes una cuenta?{' '}
                            <a
                                onClick={() => router.push('/login')}
                                className="text-buttonhoverPurple hover:buttonhoverPurple1 hover:cursor-pointer font-bold transition-colors"
                            >
                                Inicia Sesión
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterSection;
