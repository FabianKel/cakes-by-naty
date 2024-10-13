'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import { login } from '@/utils/https';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('@/components/common/Button'), { ssr: false });

function LoginSection() {
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
      password: '',
    },
    onSubmit: (values) => {
      loginHandler(values.username, values.password);
    },
    validationSchema: yup.object({
      username: yup.string().trim().required('Nombre de usuario o correo es requerido'),
      password: yup.string().trim().required('La contraseña es requerida'),
    }),
  });

  const loginHandler = async (username, password) => {
    const user = await login(username, password);

    if (user?.token) {
      setAlertType('success');
      setAlertMessage('¡Inicio de sesión exitoso!');
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/');
    } else {
      setAlertType('error');
      setAlertMessage('Nombre de usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/fondos/fondo.webp')] bg-cover backdrop-blur-sm">
      <div className="z-10 bg-white/80 w-full max-w-sm md:max-w-lg mx-auto p-6 md:p-12 py-12 md:py-20 rounded-lg shadow-lg border border-pink-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold font-cursive text-pink-800">¡Bienvenido!</h1>
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
              placeholder="Usuario o correo electrónico"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 md:p-4 border border-pink-300 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink mb-6"
            />
            {formik.errors.username && (
              <div className="text-red-500 text-sm block text-center mt-2">{formik.errors.username}</div>
            )}
          </div>
          <div className="mb-8 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 md:p-4 border border-pink-300 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink"
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-pink-600"
            >
              {passwordVisible ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
          {formik.errors.password && (
              <span className="text-red-500 text-sm block text-center mt-2">{formik.errors.password}</span>
            )}
          <div className="mb-8 mt-6">
            <Button
              type="submit"
              className="w-full p-3 md:p-4 bg-white text-black border-pink-200 border-2 rounded-md font-poppins hover:bg-hoverPink transition duration-300"
            >
              Iniciar Sesión
            </Button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p className="text-sm md:text-base">
            ¿Aún no tienes una cuenta?{' '}
            <a
              onClick={() => router.push('/register')}
              className="text-pink-600 hover:text-pink-800 hover:cursor-pointer font-bold transition-colors"
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;

