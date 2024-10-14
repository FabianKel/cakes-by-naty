'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import CatalogGallery from '@/components/common/CatalogGallery';

function HeroSection() {
  const [novedades, setNovedades] = useState([]);
  const [postresTemporada, setPostresTemporada] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [novedadesResponse, postresTemporadaResponse] = await Promise.all([
          fetch('http://localhost:4000/products/categoria/1/4'),
          fetch('http://localhost:4000/products/ocasion/3/4')
        ]);

        const novedadesData = await novedadesResponse.json();
        const postresTemporadaData = await postresTemporadaResponse.json();

        setNovedades(novedadesData.productos || []);
        setPostresTemporada(postresTemporadaData.productos || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white-200 py-20 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Bienvenido a Cakes by Naty ✨</h1>
        <p className="text-md md:text-lg mb-8">
          ¡Disfruta de nuestros deliciosos postres hechos con amor y los mejores ingredientes!
        </p>
        <CatalogGallery />
        <h2 className="text-xl md:text-2xl font-bold mt-10 mb-8 text-left text-gray-600">
          ¡Novedades!
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {novedades.map((product) => (
            <Card key={product.productoid} product={product} />
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-16 mb-8 text-left text-gray-600">
          ¡Postres de Temporada!
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {postresTemporada.map((product) => (
            <Card key={product.productoid} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
