'use client';

import React, { useEffect, useState, useRef } from 'react';
import Card from '@/components/common/Card';
import CatalogGallery from '@/components/common/CatalogGallery';

function HeroSection() {
  const [novedades, setNovedades] = useState([]);
  const [postresTemporada, setPostresTemporada] = useState([]);
  const novedadesRef = useRef(null);
  const postresTemporadaRef = useRef(null);
  const catalogRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [novedadesResponse, postresTemporadaResponse] = await Promise.all([
          fetch('http://localhost:4000/products/categoria/1/4'),
          fetch('http://localhost:4000/products/ocasion/3/4'),
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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, 
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp'); 
          entry.target.classList.remove('opacity-0'); 
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const novedadesSection = novedadesRef.current;
    const postresTemporadaSection = postresTemporadaRef.current;
    const catalogSection = catalogRef.current; 
    if (novedadesSection) observer.observe(novedadesSection);
    if (postresTemporadaSection) observer.observe(postresTemporadaSection);
    if (catalogSection) observer.observe(catalogSection); 

    return () => {
      if (novedadesSection) observer.unobserve(novedadesSection);
      if (postresTemporadaSection) observer.unobserve(postresTemporadaSection);
      if (catalogSection) observer.unobserve(catalogSection); 
    };
  }, []);

  return (
    <section className="bg-white-200 py-20 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">Bienvenido a Cakes by Naty ✨</h1>
        <p className="text-md md:text-lg mb-8 animate-fadeInUp">
          ¡Disfruta de nuestros deliciosos postres hechos con amor y los mejores ingredientes!
        </p>
        <div ref={catalogRef} className="opacity-0 mt-16"> 
          <CatalogGallery />
        </div>
        <div ref={novedadesRef} className="opacity-0">
          <h2 className="text-xl md:text-2xl font-bold mt-32 mb-8 text-left text-gray-600 font-hsubtitles">
            ¡Novedades!
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {novedades.map((product) => (
              <Card key={product.productoid} product={product} />
            ))}
          </div>
        </div>
        <div ref={postresTemporadaRef} className="opacity-0">
          <h2 className="text-xl md:text-2xl font-bold mt-16 mb-8 text-left text-gray-600 font-hsubtitles">
            ¡Postres de Temporada!
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {postresTemporada.map((product) => (
              <Card key={product.productoid} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;