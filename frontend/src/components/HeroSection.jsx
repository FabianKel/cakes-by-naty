'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { getProductos } from '@/utils/https';

function HeroSection() {
  const [products, setProducts] = useState([]);

  const fetchProductos = async () => {
    const productos = await getProductos();
    setProducts(productos.productos);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <section className='bg-white-200 py-20 px-4 text-center'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-4'>Bienvenido a Cakes by Naty ✨</h1>
        <p className='text-lg mb-8'>
          ¡Disfruta de nuestros deliciosos postres hechos con amor y los mejores ingredientes!
        </p>
        <h2 className='text-3xl font-bold mt-16 mb-8 text-gray-500'>¡Novedades!</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {products.slice(0, 3).map((product) => (
            <Card key={product.productoid} product={product} />
          ))}
        </div>
        <h2 className='text-3xl font-bold mt-16 mb-8 text-gray-500'>¡De Temporada!</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {products.slice(0, 3).map((product) => (
            <Card key={product.productoid} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
