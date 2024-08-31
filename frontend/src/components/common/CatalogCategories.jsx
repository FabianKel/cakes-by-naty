function CatalogCategories() {
    const categories = [
        { name: "Cupcakes", image: "/Catalog/catalogcupcake.png" },
        { name: "Cakepops", image: "/Catalog/catalogcakepop.png" },
        { name: "Pastel", image: "/Catalog/catalogcake.png" },
        { name: "Galletas", image: "/Catalog/catalogcookies.png" },
        { name: "Chocolates", image: "/Catalog/catalogchocolates.png" },
        { name: "Espumillas", image: "/Catalog/catalogespumillas.png" }
    ];

    return (
        <div className="flex justify-center space-x-6 mt-8 mb-8">
            {categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="w-28 h-28 bg-white-200 flex justify-center items-center rounded-lg transition-transform transform hover:scale-110">
                        <img src={category.image} alt={category.name} className="w-30 h-30" />
                    </div>
                    <span className="mt-2 text-sm font-medium">{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CatalogCategories;
