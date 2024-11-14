'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import { login } from '@/utils/https';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
    <>
      <Head>
        <link rel="preload" href="/fondos/fondo.webp" as="image" />
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-[url('/fondos/fondo.webp')] bg-cover backdrop-blur-sm">
        <div className="z-10 bg-white/95 w-full max-w-lg mx-auto p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-violet-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-violet-800 mb-3">¡Bienvenido!</h1>
            <p className="text-base text-gray-500">Inicia sesión para continuar</p>

          </div>

          {alertMessage && (
            <div className={`mb-6 p-4 rounded-xl text-white text-center ${alertType === 'success'
              ? 'bg-green-500/90 shadow-lg shadow-green-500/30'
              : 'bg-red-400/90 shadow-lg shadow-red-400/30'
              }`}>
              {alertMessage}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input
                type="text"
                name="username"
                placeholder="Usuario o correo electrónico"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-6 py-4 bg-violet-50/50 border border-violet-100 rounded-xl text-base focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all duration-300"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-400 text-sm text-center">{formik.errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-6 py-4 bg-violet-50/50 border border-violet-100 rounded-xl text-base focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 flex items-center gap-1 text-violet-400 hover:text-violet-600 transition-colors duration-300"
                  aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {passwordVisible ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <span>Ocultar</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span> Mostrar</span>
                    </>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm text-center">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black border-baseLilac border-2 font-poppins rounded-xl font-medium hover:bg-buttonhoverPurple hover:text-white transition duration-300 text-base"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-10 text-center">
            <div className="flex items-center justify-center space-x-2 text-base">
              <span className="text-gray-500">¿Aún no tienes una cuenta?</span>
              <Button
                onClick={() => router.push('/register')}
                className="text-violet-600 hover:text-violet-700 font-semibold transition-colors inline-block"
              >
                Regístrate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSection;
