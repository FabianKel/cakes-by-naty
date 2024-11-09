--ALL PRODUCTS
CREATE OR REPLACE FUNCTION obtener_productos(p_limit INT DEFAULT NULL)
RETURNS TABLE (
    ProductoID INT,
    ProductoNombre VARCHAR,
    Descripcion TEXT,
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
    Usuario TEXT,
    id_usuario INT,
    Pago_Anticipado TEXT,
    Pago_Completo TEXT,
    Estado_Orden VARCHAR,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
DECLARE
    secret_key TEXT := 'my_secret_key';
BEGIN
    RETURN QUERY
    SELECT 
        p.PedidoID,
        pgp_sym_decrypt(u.Usuario::BYTEA, secret_key)::TEXT AS Usuario,  -- Desencriptar el nombre de usuario
        u.UsuarioID AS id_usuario,
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


CREATE OR REPLACE FUNCTION obtener_productos_por_pedido(pedido_id INT)
RETURNS TABLE(
    productoid INT,
    nombre VARCHAR,
    descripcion TEXT,
    categoriaid INT,
    ocasion TEXT,
    precio DECIMAL(10, 2),
    imagen1 VARCHAR,
    imagen2 VARCHAR,
    imagen3 VARCHAR,
    cantidad INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pr.ProductoID,
        pr.Nombre,
        pr.Descripcion,
        pr.CategoriaID,
        (SELECT Ocasiones.Nombre::TEXT FROM Ocasiones WHERE Ocasiones.OcasionID = pr.OcasionID LIMIT 1) AS ocasion,
        pr.Precio,
        pr.Imagen1,
        pr.Imagen2,
        pr.Imagen3,
        cp.cantidad
    FROM
        productos pr
    JOIN
        carrito_producto cp ON pr.ProductoID = cp.productoid
    JOIN
        pedidos p ON cp.carritoid = p.carritoid
    WHERE
        p.pedidoid = pedido_id;
END;
$$ LANGUAGE plpgsql;

--POR MES--
CREATE OR REPLACE FUNCTION obtener_pedidos_por_mes(mes INT)
RETURNS TABLE (
    PedidoID INT,
    Usuario TEXT,
    Pago_Anticipado TEXT,
    Pago_Completo TEXT,
    Estado_Orden VARCHAR,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
DECLARE
    secret_key TEXT := 'my_secret_key';
BEGIN
    RETURN QUERY
    SELECT 
        p.PedidoID,
        pgp_sym_decrypt(u.Usuario::BYTEA, secret_key)::TEXT AS Usuario,  -- Desencriptar el nombre de usuario
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
    Usuario TEXT,
    Pago_Anticipado TEXT,
    Pago_Completo TEXT,
    Estado_Orden VARCHAR,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
DECLARE
    secret_key TEXT := 'my_secret_key';
BEGIN
    RETURN QUERY
    SELECT 
        p.PedidoID,
        pgp_sym_decrypt(u.Usuario::BYTEA, secret_key)::TEXT AS Usuario,  -- Desencriptar el nombre de usuario
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