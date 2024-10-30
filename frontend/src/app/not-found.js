
import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <div className='grid grid-flow-col gap-5'>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>404 - Página No Encontrada</h1>
          <Link href='/'>Regresar a la Página Principal</Link>
        </div>
      </div>
    </>
  );
};

export default Custom404;
