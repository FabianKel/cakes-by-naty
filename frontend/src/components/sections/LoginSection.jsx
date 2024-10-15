'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import Button from '@/components/common/Button';
import { login } from '@/utils/https';

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
      password: yup.string().trim().required('Contraseña es requerido'),
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
      console.log('Usuario o contraseña no existen.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white w-full max-w-lg mx-auto p-12 py-20 rounded-lg shadow-lg border border-gray-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold font-poppins">Login</h1>
        </div>
        {alertMessage && (
          <div className={`mb-4 p-4 rounded-md text-white text-center ${alertType === 'success' ? 'bg-green-500' : 'bg-red-400'}`}>
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
              className="w-full p-4 border border-gray-300 rounded-md font-poppins mb-6"
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
              <span className="text-red-500 text-sm block text-center mt-2">{formik.errors.password}</span>
            )}
          </div>
          <div className="mb-8">
            <Button
              type="submit"
              className="w-full p-4 bg-white-600 text-black border-2 border-Purple rounded-md font-poppins hover:bg-customPink1 transition duration-300"
            >
              Inicia Sesión
            </Button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p>
            ¿Aún no tienes una cuenta?{' '}
            <a
              onClick={() => router.push('/register')}
              className="text-Purple hover:text- hover:cursor-pointer font-bold transition-colors"
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
