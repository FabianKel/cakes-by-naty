'use client';

import React, { useEffect, useState } from 'react';
import ProductGroup from '@/components/common/ProductGroup';
import { useSearchParams } from 'next/navigation';

function Catalogo() {
  const searchParams = useSearchParams();

  const [cakes, setCakes] = useState([]);
  const [cupcakes, setCupcakes] = useState([]);
  const [galletas, setGalletas] = useState([]);

  const categories = {
    cupcakes: { nombre: 'Nuestos Cupcakes', id: 1 },
    cakepops: { nombre: 'Nuestros Cakepops', id: 2 },
    pasteles: { nombre: 'Nuestros Pastel', id: 3 },
    galletas: { nombre: 'Nuestras Galletas', id: 4 },
    chocolates: { nombre: 'Nuestros Chocolates', id: 5 },
    espumillas: { nombre: 'Nuestras Espumillas', id: 6 },
  };

  const filter = searchParams.get('filter');

  const fetchProducts = (filter) => {
    if (filter) {
      fetch(`http://localhost:4000/products/categoria/${categories[filter].id}`)
        .then((response) => response.json())
        .then((data) => {
          setCakes(data.productos || []);
        })
        .catch((error) => console.error('Error fetching cakes:', error));
    } else {
      fetch('http://localhost:4000/products/categoria/1/3')
        .then((response) => response.json())
        .then((data) => {
          setCupcakes(data.productos || []);
        })
        .catch((error) => console.error('Error fetching cupcakes:', error));
      
        fetch('http://localhost:4000/products/categoria/3/3')
        .then((response) => response.json())
        .then((data) => {
          setCakes(data.productos || []);
        })
        .catch((error) => console.error('Error fetching cakes:', error));

        fetch('http://localhost:4000/products/categoria/4/3')
        .then((response) => response.json())
        .then((data) => {
          setGalletas(data.productos || []);
        })
        .catch((error) => console.error('Error fetching cupcakes:', error));
    }
  };

  useEffect(() => {
    fetchProducts(filter);
  }, [filter]);

  return (
    <div className='flex flex-col'>
      {filter ? (
        <div className='container mx-auto p-4'>
          <h1 className='text-4xl text-center font-bold mt-6 mb-6'>Catálogo</h1>
          <h2 className='text-xl font-bold mb-4'>{categories[filter].nombre}</h2>
          <ProductGroup
            products={cakes}
            showViewMore={false} 
          />
        </div>
      ) : (
        <div className='container mx-auto p-4'>
          <h1 className='text-4xl text-center font-bold mt-6 mb-16'>Catálogo</h1>
          <h2 className='text-xl font-bold mb-4'>Nuestros Cupcakes</h2>
            <ProductGroup
              products={cupcakes}
              showViewMore={true} 
              categoryUrl="cupcakes" />
            <h2 className='text-xl font-bold mb-4'>Nuestros Pasteles</h2>
            <ProductGroup
              products={cakes}
              showViewMore={true} 
              categoryUrl="pasteles" />
            <h2 className='text-xl font-bold mb-4'>Nuestras Galletas</h2>
            <ProductGroup
              products={galletas}
              showViewMore={true} 
              categoryUrl="galletas" />
        </div>
      )}
    </div>
  );
}

export default Catalogo;
