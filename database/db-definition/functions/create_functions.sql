--Productos y Detalles_producto
CREATE OR REPLACE FUNCTION agregar_producto(
    nombre TEXT,
    categoria_id INT,
    ocasion TEXT,
    precio DECIMAL(10, 2),
    imagen1 TEXT,
    imagen2 TEXT,
    imagen3 TEXT
)
RETURNS TABLE (productoid INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Productos (
        Nombre,
        CategoriaID,
        Ocasion,
        Precio,
        Imagen1,
        Imagen2,
        Imagen3
    )
    VALUES (
        nombre,
        categoria_id,
        ocasion,
        precio,
        imagen1,
        imagen2,
        imagen3
    )
    RETURNING ProductoID INTO productoid;
END;
$$;

CREATE OR REPLACE FUNCTION agregar_detalles_producto(
    productoid INT,
    relleno_id INT,
    masa_id INT,
    sabor_galleta_id INT,
    cobertura_id INT,
    tipo_chocolate_id INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Detalles_Producto (
        ProductoID,
        RellenoID,
        MasaID,
        Sabor_GalletaID,
        CoberturaID,
        Tipo_ChocolateID
    )
    VALUES (
        productoid,
        relleno_id,
        masa_id,
        sabor_galleta_id,
        cobertura_id,
        tipo_chocolate_id
    );
END;
$$;
