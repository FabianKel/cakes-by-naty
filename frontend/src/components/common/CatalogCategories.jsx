'use client';

import { useRouter } from 'next/navigation'; // Nueva API para la estructura de rutas `app/`

const CatalogCategories = () => {
  const router = useRouter(); // Nueva versión del hook

  const handleFilterChange = (filter) => {
    console.log('filter: ', filter);
    router.push(`/catalog?filter=${filter}`);
  };

  const categories = [
    { name: 'Cupcakes', image: 'Catalog/cupcakes.jpg', url: 'cupcakes' },
    { name: 'Cakepops', image: 'Catalog/cakepops.jpg', url: 'cakepops' },
    { name: 'Pastel', image: 'Catalog/cakes.jpg', url: 'pasteles' },
    { name: 'Galletas', image: 'Catalog/cookies.jpg', url: 'galletas' },
    { name: 'Chocolates', image: 'Catalog/chocolates.jpg', url: 'chocolates' },
    { name: 'Espumillas', image: 'Catalog/espumillas.jpg', url: 'espumillas' },
  ];

  return (
    <div className='flex justify-center space-x-6 mt-8 mb-8'>
      {categories.map((category, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div className='w-28 h-28 bg-white-200 flex justify-center items-center rounded-lg transition-transform transform hover:scale-110'>
            <button onClick={() => handleFilterChange(category.url)}>
              <img src={category.image} alt={category.name} className='w-30 h-30' />
            </button>
          </div>
          <span className='mt-2 text-sm font-medium'>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CatalogCategories;
