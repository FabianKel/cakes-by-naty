
import Catalog from '@/components/sections/Catalog';
import CatalogCategories from '@/components/common/CatalogCategories';
import Sidebar from '@/components/common/Sidebar';

export default function CatalogPage() {
    return (
        <div className="container mx-auto">
            <div className='grid grid-cols-1 md:grid-cols-[auto,1fr] gap-5'>
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <div className='px-4 w-full'>
                    <CatalogCategories />
                    <Catalog />
                </div>
            </div>
        </div>
    );
}