--ALL PRODUCTS
CREATE OR REPLACE FUNCTION obtener_productos(p_limit INT DEFAULT NULL)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    Descripcion TEXT,
    Ocasion VARCHAR,
    Precio DECIMAL,
    Imagen1 TEXT,
    Imagen2 TEXT,
    Imagen3 TEXT,
    RellenoNombre VARCHAR,
    MasaNombre VARCHAR,
    SaborGalletaTipo VARCHAR,
    CoberturaTipo VARCHAR,
    TipoChocolate VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_limit IS NOT NULL THEN
        RETURN QUERY
        SELECT 
            p.ProductoID, 
            p.Nombre AS ProductoNombre, 
            p.Descripcion,
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
        LIMIT 
            p_limit;
    ELSE
        RETURN QUERY
        SELECT 
            p.ProductoID, 
            p.Nombre AS ProductoNombre, 
            p.Descripcion,
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
            Tipo_Chocolate tc ON dp.Tipo_ChocolateID = tc.Tipo_ChocolateID;
    END IF;
END;
$$;

--PRODUCT BY ID
CREATE OR REPLACE FUNCTION obtener_producto_por_id(p_id INT)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    Descripcion TEXT,
    CategoriaNombre VARCHAR,
    Ocasion VARCHAR,
    Precio DECIMAL,
    Imagen1 TEXT,
    Imagen2 TEXT,
    Imagen3 TEXT,
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
        p.Descripcion,
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
CREATE OR REPLACE FUNCTION obtener_producto_por_categoria(c_id INT, p_limit INT DEFAULT NULL)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    Descripcion TEXT,
    Ocasion VARCHAR,
    Precio DECIMAL,
    Imagen1 TEXT,
    Imagen2 TEXT,
    Imagen3 TEXT,
    RellenoNombre VARCHAR,
    MasaNombre VARCHAR,
    SaborGalletaTipo VARCHAR,
    CoberturaTipo VARCHAR,
    TipoChocolate VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_limit IS NOT NULL THEN
        RETURN QUERY
        SELECT 
            p.ProductoID, 
            p.Nombre AS ProductoNombre, 
            p.Descripcion,
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
        WHERE 
            p.CategoriaID = c_id
        LIMIT 
            p_limit;
    ELSE
        RETURN QUERY
        SELECT 
            p.ProductoID, 
            p.Nombre AS ProductoNombre, 
            p.Descripcion,
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
        WHERE 
            p.CategoriaID = c_id;
    END IF;
END;
$$;

--PRODUCTS BY OCCASION
CREATE OR REPLACE FUNCTION obtener_producto_por_ocasion(ocasion_id INT, p_limit INT DEFAULT NULL)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    Descripcion TEXT,
    Categoria VARCHAR,
    Precio DECIMAL,
    Imagen1 TEXT,
    Imagen2 TEXT,
    Imagen3 TEXT,
    RellenoNombre VARCHAR,
    MasaNombre VARCHAR,
    SaborGalletaTipo VARCHAR,
    CoberturaTipo VARCHAR,
    TipoChocolate VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_limit IS NOT NULL THEN
        RETURN QUERY
        SELECT 
            p.ProductoID, 
            p.Nombre AS ProductoNombre, 
            p.Descripcion,
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
        WHERE p.OcasionID = ocasion_id
        LIMIT p_limit;
    ELSE
        RETURN QUERY
        SELECT 
            p.ProductoID, 
            p.Nombre AS ProductoNombre, 
            p.Descripcion,
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
        END IF;
END;
$$;

------------------ ORDERS ------------------

--ALL ORDERS (Info para el menú de pedidos)
CREATE OR REPLACE FUNCTION obtener_pedidos()
RETURNS TABLE (
    PedidoID INT,
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
    p.PedidoID,
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

--POR MES--
CREATE OR REPLACE FUNCTION obtener_pedidos_por_mes(mes INT)
RETURNS TABLE (
    PedidoID INT,
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
    p.PedidoID,
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
WHERE 
    EXTRACT(MONTH FROM p.created_at) = mes
ORDER BY 
    p.Created_at DESC;
END;
$$;



-----BY STATE-----
--ENTREGADO O SIN ENTREGAR
CREATE OR REPLACE FUNCTION obtener_pedidos_por_estado(estado VARCHAR)
RETURNS TABLE (
    PedidoID INT,
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
        p.PedidoID,
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

-- READ USER BY ID
CREATE OR REPLACE FUNCTION obtener_usuario_por_id(u_id INT)
RETURNS TABLE (
    UsuarioID INT,
    Rol VARCHAR,
    Usuario VARCHAR,
    Primer_Nombre VARCHAR,
    Segundo_Nombre VARCHAR,
    Correo VARCHAR,
    Telefono VARCHAR,
    Direccion1 TEXT,
    Direccion2 TEXT,
    Direccion3 TEXT,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.UsuarioID,
        u.Rol,
        u.Usuario,
        u.Primer_Nombre,
        u.Segundo_Nombre,
        u.Correo,
        u.Telefono,
        d1.Nombre || ', ' || d1.Campo1 || ', ' || d1.Campo2 || ', ' || d1.Ciudad || ', ' || d1.Departamento AS Direccion1,
        d2.Nombre || ', ' || d2.Campo1 || ', ' || d2.Campo2 || ', ' || d2.Ciudad || ', ' || d2.Departamento AS Direccion2,
        d3.Nombre || ', ' || d3.Campo1 || ', ' || d3.Campo2 || ', ' || d3.Ciudad || ', ' || d3.Departamento AS Direccion3,
        u.Created_at,
        u.Modified_at
    FROM 
        Usuarios u
    LEFT JOIN Direcciones d1 ON u.Direccion1ID = d1.DireccionID
    LEFT JOIN Direcciones d2 ON u.Direccion2ID = d2.DireccionID
    LEFT JOIN Direcciones d3 ON u.Direccion3ID = d3.DireccionID
    WHERE u.UsuarioID = u_id;
END;
$$;
