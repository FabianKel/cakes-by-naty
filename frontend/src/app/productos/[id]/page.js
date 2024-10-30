
import Detalles from '@/components/sections/Detalles';

const Producto = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <Detalles id={id} />
    </>
  );
};

export default Producto;
