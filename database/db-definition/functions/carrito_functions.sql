CREATE OR REPLACE FUNCTION agregar_producto_a_carrito(
    p_usuarioid INT,
    p_productoid INT,
    p_cantidad INT,
    p_personalizacionid INT DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
    v_carritoid INT;
    v_producto_cantidad INT;
BEGIN
    -- 1. Buscar si el usuario ya tiene un carrito abierto
    SELECT CarritoID INTO v_carritoid
    FROM Carritos
    WHERE UsuarioID = p_usuarioid
    FOR UPDATE;  -- Bloquea el carrito para evitar condiciones de carrera

    -- 2. Si no existe un carrito para este usuario, crearlo
    IF v_carritoid IS NULL THEN
        INSERT INTO Carritos (UsuarioID, Total)
        VALUES (p_usuarioid, 0.00)
        RETURNING CarritoID INTO v_carritoid;
    END IF;

    -- 3. Verificar si el producto ya está en el carrito (considerando personalización)
    SELECT Cantidad INTO v_producto_cantidad
    FROM Carrito_Producto
    WHERE CarritoID = v_carritoid
      AND ProductoID = p_productoid
      AND COALESCE(PersonalizacionID, -1) = COALESCE(p_personalizacionid, -1);  -- Maneja el NULL correctamente

    -- 4. Si el producto ya está en el carrito, actualizar la cantidad
    IF FOUND THEN
        UPDATE Carrito_Producto
        SET Cantidad = v_producto_cantidad + p_cantidad
        WHERE CarritoID = v_carritoid
          AND ProductoID = p_productoid
          AND COALESCE(PersonalizacionID, -1) = COALESCE(p_personalizacionid, -1);
    ELSE
        -- 5. Si el producto no está en el carrito, agregarlo
        INSERT INTO Carrito_Producto (CarritoID, ProductoID, PersonalizacionID, Cantidad)
        VALUES (v_carritoid, p_productoid, p_personalizacionid, p_cantidad);
    END IF;

    -- 6. Actualizar el total del carrito
    UPDATE Carritos
    SET Total = Total + (SELECT Precio FROM Productos WHERE ProductoID = p_productoid) * p_cantidad
    WHERE CarritoID = v_carritoid;

    -- Opcional: Manejar errores con EXCEPTION
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'Error al agregar producto al carrito para el usuario %', p_usuarioid;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION ver_carrito(p_carrito_id INT)
RETURNS TABLE (
    producto_id INT,
    nombre_producto VARCHAR,
    descripcion_producto TEXT,
    categoria_producto VARCHAR,
    cantidad INT,
    precio DECIMAL,
    total DECIMAL,
    relleno VARCHAR,
    masa VARCHAR,
    sabor_galleta VARCHAR,
    cobertura VARCHAR,
    tipo_chocolate VARCHAR,
    imagen1_producto VARCHAR,
    imagen2_producto VARCHAR,
    imagen3_producto VARCHAR,
    comentario_personalizacion VARCHAR,
    imagen1_personalizacion VARCHAR,
    imagen2_personalizacion VARCHAR,
    imagen3_personalizacion VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cp.ProductoID,
        p.Nombre AS nombre_producto,
        p.Descripcion AS descripcion_producto,
        cat.Nombre AS categoria_producto,
        cp.Cantidad,
        p.Precio,
        c.Total,
        r.Nombre AS relleno,
        m.Nombre AS masa,
        sg.Tipo AS sabor_galleta,
        co.Tipo AS cobertura,
        pc.Tipo_Chocolate AS tipo_chocolate,
        p.Imagen1 AS imagen1_producto,
        p.Imagen2 AS imagen2_producto,
        p.Imagen3 AS imagen3_producto,
        pc.Comentario AS comentario_personalizacion,
        pc.Imagen1 AS imagen1_personalizacion,
        pc.Imagen2 AS imagen2_personalizacion,
        pc.Imagen3 AS imagen3_personalizacion
    FROM Carritos c
    JOIN Carrito_Producto cp ON c.CarritoID = cp.CarritoID
    LEFT JOIN Productos p ON cp.ProductoID = p.ProductoID
    LEFT JOIN Categorias cat ON p.CategoriaID = cat.CategoriaID
    LEFT JOIN Personalizaciones pc ON cp.PersonalizacionID = pc.PersonalizacionID
    LEFT JOIN Rellenos r ON pc.RellenoID = r.RellenoID
    LEFT JOIN Masas m ON pc.MasaID = m.MasaID
    LEFT JOIN Sabores_Galletas sg ON pc.Sabor_GalletaID = sg.Sabor_GalletaID
    LEFT JOIN Coberturas co ON pc.CoberturaID = co.CoberturaID
    WHERE c.UsuarioID = p_carrito_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_product_count_in_chart(
    p_usuarioid INT,
    p_productoid INT,
    p_cantidad INT,
    p_personalizacionid INT DEFAULT NULL
) 

RETURNS VOID AS $$

DECLARE
    v_carritoid INT;
BEGIN
    -- 1. Buscar si el usuario ya tiene un carrito abierto
    SELECT CarritoID INTO v_carritoid
    FROM Carritos
    WHERE UsuarioID = p_usuarioid
    FOR UPDATE;  -- Bloquea el carrito para evitar condiciones de carrera

    -- 2. Actualizar la cantidad del producto
    UPDATE Carrito_Producto
    SET Cantidad = p_cantidad
    WHERE CarritoID = v_carritoid
        AND ProductoID = p_productoid
        AND COALESCE(PersonalizacionID, -1) = COALESCE(p_personalizacionid, -1);

    -- 3. Actualizar el total del carrito
    UPDATE Carritos
    SET Total = Total + (SELECT Precio FROM Productos WHERE ProductoID = p_productoid) * p_cantidad
    WHERE CarritoID = v_carritoid;

    -- Opcional: Manejar errores con EXCEPTION
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'Error al agregar producto al carrito para el usuario %', p_usuarioid;
END;
$$ LANGUAGE plpgsql;