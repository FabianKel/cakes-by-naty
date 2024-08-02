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
        o.Nombre, 
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
        Ocasiones o ON p.OcasionID = o.OcasionID
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
        o.Nombre AS Ocasion, 
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
        Ocasiones o ON p.OcasionID = o.OcasionID
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

--PRODUCTS BY CATEGORY
CREATE OR REPLACE FUNCTION obtener_producto_por_categoria(c_id INT)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
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
        o.Nombre AS Ocasion, 
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
        Ocasiones o ON p.OcasionID = o.OcasionID
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
    WHERE p.CategoriaID = c_id;
END;
$$;

--PRODUCTS BY OCCASION
CREATE OR REPLACE FUNCTION obtener_producto_por_ocasion(ocasion_id INT)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    Categoria VARCHAR,
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
    WHERE p.OcasionID = ocasion_id;
END;
$$;

------------------ ORDERS ------------------

--ALL ORDERS (Info para el menú de pedidos)
CREATE OR REPLACE FUNCTION obtener_pedidos()
RETURNS TABLE (
    CarritoID INT,
    Usuario VARCHAR,
    Pago_Anticipado TEXT,
    Pago_Completo TEXT,
    Estado_Orden VARCHAR,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
    c.CarritoID,
    u.Usuario,
    CASE 
        WHEN p.Pago_Anticipado THEN 'Pago Anticipado Realizado'
        ELSE 'Pago Anticipado No Realizado'
    END AS Pago_Anticipado,
    CASE 
        WHEN p.Pago_Completo THEN 'Pago Completo Realizado'
        ELSE 'Pago Completo No Realizado'
    END AS Pago_Completo,
    p.Estado_Orden,
    p.created_at,
    p.modified_at
FROM 
    Usuarios u
JOIN 
    Carritos c ON u.UsuarioID = c.UsuarioID
JOIN 
    Pedidos p ON c.CarritoID = p.CarritoID
ORDER BY 
    p.Created_at DESC;
END;
$$;


-----BY STATE-----
--ENTREGADO O SIN ENTREGAR
CREATE OR REPLACE FUNCTION obtener_pedidos_por_estado(estado VARCHAR)
RETURNS TABLE (
    CarritoID INT,
    Usuario VARCHAR,
    Pago_Anticipado TEXT,
    Pago_Completo TEXT,
    Estado_Orden VARCHAR,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.CarritoID,
        u.Usuario,
        CASE 
            WHEN p.Pago_Anticipado THEN 'Pago Anticipado Realizado'
            ELSE 'Pago Anticipado No Realizado'
        END AS Pago_Anticipado,
        CASE 
            WHEN p.Pago_Completo THEN 'Pago Completo Realizado'
            ELSE 'Pago Completo No Realizado'
        END AS Pago_Completo,
        p.Estado_Orden,
        p.Created_at,
        p.Modified_at
    FROM 
        Usuarios u
    JOIN 
        Carritos c ON u.UsuarioID = c.UsuarioID
    JOIN 
        Pedidos p ON c.CarritoID = p.CarritoID
    WHERE 
        p.Estado_Orden = estado
    ORDER BY 
        p.Created_at DESC;
END;
$$;
