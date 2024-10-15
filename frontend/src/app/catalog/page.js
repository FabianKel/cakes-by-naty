import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Catalog from '@/components/sections/Catalog';
import CatalogCategories from '@/components/common/CatalogCategories';
import Sidebar from '@/components/common/Sidebar';

export default function Register() {
  return (
    <>
      <Header />
      <div className='grid grid-flow-col gap-5'>
        <div>
          <Sidebar />
        </div>
        <div className=''>
          <CatalogCategories />
          <Catalog />
        </div>
      </div>

      <Footer />
    </>
  );
}
