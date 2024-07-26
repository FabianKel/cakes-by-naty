CREATE OR REPLACE FUNCTION updateProducto(
    producto_id INT,
    nombre_ VARCHAR,
    Categoria_ID INT,
    Ocasion_ID INT,
    precio_ DECIMAL,
    imagen1_ VARCHAR,
    imagen2_ VARCHAR,
    imagen3_ VARCHAR,
    Relleno_ID INT,
    Masa_ID INT,
    Sabor_Galleta_ID INT,
    Cobertura_ID INT,
    Tipo_Chocolate_ID INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Productos
    SET
        Nombre = COALESCE(nombre_, Nombre),
        CategoriaID = COALESCE(Categoria_ID, CategoriaID),
        OcasionID = COALESCE(Ocasion_ID, OcasionID),
        Precio = COALESCE(precio_, Precio),
        Imagen1 = COALESCE(imagen1_, Imagen1),
        Imagen2 = COALESCE(imagen2_, Imagen2),
        Imagen3 = COALESCE(imagen3_, Imagen3)
    WHERE ProductoID = producto_id;

    UPDATE Detalles_Producto
    SET
        RellenoID = COALESCE(Relleno_ID, RellenoID),
        MasaID = COALESCE(Masa_ID, MasaID),
        Sabor_GalletaID = COALESCE(Sabor_Galleta_ID, Sabor_GalletaID),
        CoberturaID = COALESCE(Cobertura_ID, CoberturaID),
        Tipo_ChocolateID = COALESCE(Tipo_Chocolate_ID, Tipo_ChocolateID)
    WHERE ProductoID = producto_id;
END;
$$;
