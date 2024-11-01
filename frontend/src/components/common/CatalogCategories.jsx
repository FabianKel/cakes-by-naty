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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 gap-4 place-items-center justify-center md:flex md:justify-center md:space-x-6 max-w-3xl mx-auto">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center w-24"
          >
            <div className="w-24 h-24 bg-white-200 flex justify-center items-center rounded-lg shadow-md transition-transform hover:scale-110">
              <button 
                onClick={() => handleFilterChange(category.url)}
                className="w-full h-full"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
            <span className="mt-2 text-sm font-medium text-center">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CatalogCategories;
