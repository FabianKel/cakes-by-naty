import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>Oops... esta página no existe 😢</p>
      <br/>
      <a onClick={() => router.push('/')} className=' text-xl text-blue-600 hover:text-blue-900 hover:cursor-pointer'>Regresar a la Página Principal</a>
    </div>
  );
};

export default Custom404;
