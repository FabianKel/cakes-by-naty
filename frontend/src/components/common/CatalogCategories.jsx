import Link from 'next/link';

function CatalogCategories() {
    const categories = [
        { name: "Cupcakes", image: "Catalog/Cupcakes.png", url:"/catalog/cupcakes" },
        { name: "Cakepops", image: "Catalog/Cakepops.png", url:"/catalog/cakepops" },
        { name: "Pastel", image: "Catalog/Pasteles.png", url:"/catalog/pasteles" },
        { name: "Galletas", image: "Catalog/Galletas.png", url:"/catalog/galletas" },
        { name: "Chocolates", image: "Catalog/Chocolates.png" , url:"/catalog/chocolates"},
        { name: "Espumillas", image: "Catalog/Espumillas.png", url:"/catalog/espumillas" }
    ];

    return (
        <div className="flex justify-center space-x-6 mt-8 mb-8">
            {categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="w-28 h-28 bg-white-200 flex justify-center items-center rounded-lg transition-transform transform hover:scale-110">
                        <Link href={category.url}>
                            <img src={category.image} alt={category.name} className="w-30 h-30" />
                        </Link>
                    </div>
                    <span className="mt-2 text-sm font-medium">{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CatalogCategories;