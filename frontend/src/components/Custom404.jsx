import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>No tienes acceso a esta página o la página no existe.</p>
      <a onClick={() => router.push('/')}>Regresar a la Página Principal</a>
    </div>
  );
};

export default Custom404;
