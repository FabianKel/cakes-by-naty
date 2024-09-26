import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Detalles from '@/components/sections/Detalles';
// import { getProductos } from '@/utils/https';

const Producto = async ({ params }) => {
  const { id } = params;

  // const fetchProducts = async () => {
  //   console.log('Fetch Products, ', id);
  //   const products = await getProductos();
  //   // setProduct(products.find((product) => product.productoid === +id));
  //   const product = products.find((product) => product.productoid === +id);

  //   console.log('products: ', products);

  //   return product;
  // };

  return (
    <>
      <Header />
      <Detalles id={id} />
      <Footer />
    </>
  );
};

export default Producto;
