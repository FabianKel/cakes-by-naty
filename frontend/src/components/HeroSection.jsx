'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import CardClickable from '@/components/CardClickable';

function HeroSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/productos')
            .then((response) => response.json())
            .then((data) => setProducts(data.productos))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    return (
        <section className="bg-white-200 py-20 px-4 text-center">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a Cakes by Naty</h1>
                <p className="text-lg mb-8">
                    ¡Disfruta de nuestros deliciosos pasteles hechos con amor y los mejores ingredientes!
                </p>
                <p className="text-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Nulla facilisi. Duis nec justo ut magna aliquam tincidunt. Integer non ligula vitae turpis auctor consequat non non eros.
                </p>
                <p className="text-lg mb-4">
                    Suspendisse potenti. Vivamus volutpat feugiat magna, ac malesuada metus. Aenean vestibulum, purus eu sagittis viverra, neque justo pulvinar dolor, a pharetra justo est et massa.
                </p>
                <p className="text-lg mb-4">
                    Sed euismod mauris ac nisi dictum, vel ultricies ligula ultricies. Donec vel lacus vitae nisi elementum hendrerit nec euismod ex. Quisque maximus auctor neque, at lacinia eros. Cras ut lectus et sapien interdum auctor nec quis metus.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <Card key={product.productoid} product={product} />
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {products.map((product) => (
                        <CardClickable key={product.productoid} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
