'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { login } from '@/utils/https';

function LoginSection() {
  const router = useRouter();

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
      router.push('/');
    }
  };

  return (
    <div className='p-8 bg-customPink'>
      <div className='bg-white w-full max-w-md mx-auto p-8 rounded-lg shadow-md'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-semibold font-poppins'>Login</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <input
              type='text'
              name='username'
              placeholder='Usuario o correo electrónico'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full p-3 border border-gray-300 rounded-md font-poppins'
            />
            {formik.errors.username && (
              <div className='text-red-500 text-sm block text-center mt-2'>{formik.errors.username}</div>
            )}
          </div>
          <div className='mb-4'>
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full p-3 border border-gray-300 rounded-md font-poppins'
            />
            {formik.errors.password && (
              <span className='text-red-500 text-sm block text-center mt-2'>{formik.errors.password}</span>
            )}
          </div>
          <div className='mb-4'>
            <button
              type='submit'
              className='w-full p-3 bg-white text-black border-hoverPink border-2 rounded-md font-poppins hover:bg-hoverPink transition duration-300'
            >
              Login
            </button>
          </div>
        </form>
        <div className='text-center mt-4'>
          <p>
            ¿Aún no tienes una cuenta?{' '}
            <a
              onClick={() => router.push('/register')}
              className='text-midPink hover:text-hoverPink hover:cursor-pointer font-bold transition-colors'
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
