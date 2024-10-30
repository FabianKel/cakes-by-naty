import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Detalles from '@/components/sections/Detalles';

const Producto = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <Header />
      <Detalles id={id} />
      <Footer />
    </>
  );
};

export default Producto;
