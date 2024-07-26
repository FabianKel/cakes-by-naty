--ALL PRODUCTS
CREATE OR REPLACE FUNCTION obtener_productos()
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    CategoriaNombre VARCHAR,
    Ocasion VARCHAR,
    Precio DECIMAL,
    Imagen1 VARCHAR,
    Imagen2 VARCHAR,
    Imagen3 VARCHAR,
    RellenoNombre VARCHAR,
    MasaNombre VARCHAR,
    SaborGalletaTipo VARCHAR,
    CoberturaTipo VARCHAR,
    TipoChocolate VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.ProductoID, 
        p.Nombre AS ProductoNombre, 
        c.Nombre AS CategoriaNombre, 
        p.Ocasion, 
        p.Precio, 
        p.Imagen1, 
        p.Imagen2, 
        p.Imagen3, 
        r.Nombre AS RellenoNombre, 
        m.Nombre AS MasaNombre, 
        sg.Tipo AS SaborGalletaTipo, 
        co.Tipo AS CoberturaTipo, 
        tc.Tipo AS TipoChocolate
    FROM 
        Productos p
    LEFT JOIN 
        Categorias c ON p.CategoriaID = c.CategoriaID
    LEFT JOIN 
        Detalles_Producto dp ON p.ProductoID = dp.ProductoID
    LEFT JOIN 
        Rellenos r ON dp.RellenoID = r.RellenoID
    LEFT JOIN 
        Masas m ON dp.MasaID = m.MasaID
    LEFT JOIN 
        Sabores_Galletas sg ON dp.Sabor_GalletaID = sg.Sabor_GalletaID
    LEFT JOIN 
        Coberturas co ON dp.CoberturaID = co.CoberturaID
    LEFT JOIN 
        Tipo_Chocolate tc ON dp.Tipo_ChocolateID = tc.Tipo_ChocolateID;
END;
$$;

--PRODUCT BY ID
CREATE OR REPLACE FUNCTION obtener_producto_por_id(p_id INT)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    CategoriaNombre VARCHAR,
    Ocasion VARCHAR,
    Precio DECIMAL,
    Imagen1 VARCHAR,
    Imagen2 VARCHAR,
    Imagen3 VARCHAR,
    RellenoNombre VARCHAR,
    MasaNombre VARCHAR,
    SaborGalletaTipo VARCHAR,
    CoberturaTipo VARCHAR,
    TipoChocolate VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.ProductoID, 
        p.Nombre AS ProductoNombre, 
        c.Nombre AS CategoriaNombre, 
        p.Ocasion, 
        p.Precio, 
        p.Imagen1, 
        p.Imagen2, 
        p.Imagen3, 
        r.Nombre AS RellenoNombre, 
        m.Nombre AS MasaNombre, 
        sg.Tipo AS SaborGalletaTipo, 
        co.Tipo AS CoberturaTipo, 
        tc.Tipo AS TipoChocolate
    FROM 
        Productos p
    LEFT JOIN 
        Categorias c ON p.CategoriaID = c.CategoriaID
    LEFT JOIN 
        Detalles_Producto dp ON p.ProductoID = dp.ProductoID
    LEFT JOIN 
        Rellenos r ON dp.RellenoID = r.RellenoID
    LEFT JOIN 
        Masas m ON dp.MasaID = m.MasaID
    LEFT JOIN 
        Sabores_Galletas sg ON dp.Sabor_GalletaID = sg.Sabor_GalletaID
    LEFT JOIN 
        Coberturas co ON dp.CoberturaID = co.CoberturaID
    LEFT JOIN 
        Tipo_Chocolate tc ON dp.Tipo_ChocolateID = tc.Tipo_ChocolateID
    WHERE p.ProductoID = p_id;
END;
$$;
