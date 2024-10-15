'use client';

import React from 'react';

function CatalogGallery() {
    const catalogItems = [
        { url: "/catalog/cupcakes", img: "/Catalog/catalogcupcake.png", label: "Cupcakes" },
        { url: "/catalog/cakepops", img: "/Catalog/catalogcakepop.png", label: "Cakepops" },
        { url: "/catalog/pasteles", img: "/Catalog/catalogcake.png", label: "Pasteles" },
        { url: "/catalog/galletas", img: "/Catalog/catalogcookies.png", label: "Galletas" },
        { url: "/catalog/chocolates", img: "/Catalog/catalogchocolates.png", label: "Chocolates" },
        { url: "/catalog/espumillas", img: "/Catalog/catalogespumillas.png", label: "Espumillas" },
    ];

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 grid-rows-2 gap-1">
                {catalogItems.map((item) => (
                    <a href={item.url} key={item.url} className="block text-center">
                        <div className="relative overflow-hidden rounded-lg bg-white p-2 w-32 h-32 flex items-center justify-center hover:bg-white-100 transition duration-300">
                            <img
                                src={item.img}
                                alt={item.label}  
                                className="w-30 h-30 object-contain transition-transform duration-300 transform hover:scale-110"
                            />
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-700">{item.label}</p> 
                    </a>
                ))}
            </div>
        </div>
    );
}

export default CatalogGallery;









