'use client';

import React from 'react';

function CatalogGallery() {
    const catalogItems = [
        { url: "/catalog/cupcakes", img: "/Catalog/catalogcupcake.png" },
        { url: "/catalog/cakepops", img: "/Catalog/catalogcakepop.png" },
        { url: "/catalog/pasteles", img: "/Catalog/catalogcake.png" },
        { url: "/catalog/galletas", img: "/Catalog/catalogcookies.png" },
        { url: "/catalog/chocolates", img: "/Catalog/catalogchocolates.png" },
        { url: "/catalog/espumillas", img: "/Catalog/catalogespumillas.png" },
    ];

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 grid-rows-2 gap-1">
                {catalogItems.map((item) => (
                    <a href={item.url} key={item.url} className="block">
                        <div className="relative overflow-hidden rounded-lg bg-white p-2 w-32 h-32 flex items-center justify-center hover:bg-white-100 transition duration-300"> 
                            <img
                                src={item.img}
                                alt=""
                                className="w-24 h-24 object-contain transition-transform duration-300 transform hover:scale-110"  
                            />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default CatalogGallery;








