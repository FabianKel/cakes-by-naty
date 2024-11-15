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
    FOR UPDATE;

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
      AND COALESCE(PersonalizacionID, -1) = COALESCE(p_personalizacionid, -1);

    -- 4. Si el producto ya está en el carrito, actualizar la cantidad
    IF FOUND THEN
        UPDATE Carrito_Producto
        SET Cantidad = v_producto_cantidad + p_cantidad
        WHERE CarritoID = v_carritoid
          AND ProductoID = p_productoid
          AND COALESCE(PersonalizacionID, -1) = COALESCE(p_personalizacionid, -1);
    ELSE
        -- Si el producto no está en el carrito, agregarlo
        INSERT INTO Carrito_Producto (CarritoID, ProductoID, PersonalizacionID, Cantidad)
        VALUES (v_carritoid, p_productoid, p_personalizacionid, p_cantidad);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al agregar producto al carrito para el usuario %', p_usuarioid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION eliminar_producto_carrito(c_id INT, p_id INT)
RETURNS VOID LANGUAGE plpgsql
AS $$
DECLARE
    v_nuevo_total DECIMAL(10, 2);
BEGIN
    -- 1. Eliminar el producto del carrito
    DELETE FROM Carrito_Producto
    WHERE CarritoID = c_id AND ProductoID = p_id;

    -- 2. Recalcular el total del carrito
    SELECT COALESCE(SUM(cp.Cantidad * p.Precio), 0)
    INTO v_nuevo_total
    FROM Carrito_Producto cp
    JOIN Productos p ON cp.ProductoID = p.ProductoID
    WHERE cp.CarritoID = c_id;

    -- 3. Actualizar el total en la tabla Carritos
    UPDATE Carritos
    SET Total = v_nuevo_total
    WHERE CarritoID = c_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al eliminar producto del carrito para el carrito %', c_id;
END;
$$;



CREATE OR REPLACE FUNCTION update_product_count_in_chart(
    p_usuarioid INT,
    p_productoid INT,
    p_cantidad INT,
    p_personalizacionid INT DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
    v_carritoid INT;
BEGIN
    -- 1. Buscar si el usuario ya tiene un carrito abierto
    SELECT CarritoID INTO v_carritoid
    FROM Carritos
    WHERE UsuarioID = p_usuarioid
    FOR UPDATE;

    -- 2. Actualizar la cantidad del producto en Carrito_Producto
    UPDATE Carrito_Producto
    SET Cantidad = p_cantidad
    WHERE CarritoID = v_carritoid
      AND ProductoID = p_productoid
      AND COALESCE(PersonalizacionID, -1) = COALESCE(p_personalizacionid, -1);

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al actualizar la cantidad de producto en el carrito para el usuario %', p_usuarioid;
END;
$$ LANGUAGE plpgsql;


--FUNCION DE ACTUALIZAR TOTAL DE CARRITO
CREATE OR REPLACE FUNCTION actualizar_total_carrito()
RETURNS TRIGGER AS $$
DECLARE
    v_nuevo_total DECIMAL(10, 2);
BEGIN
    -- Recalcular el total sumando (Cantidad * Precio) para todos los productos del carrito actual
    SELECT COALESCE(SUM(cp.Cantidad * p.Precio), 0)
    INTO v_nuevo_total
    FROM Carrito_Producto cp
    JOIN Productos p ON cp.ProductoID = p.ProductoID
    WHERE cp.CarritoID = NEW.CarritoID;

    -- Actualizar el total en la tabla Carritos
    UPDATE Carritos
    SET Total = v_nuevo_total
    WHERE CarritoID = NEW.CarritoID;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


--TRIGGER al cambiar las tablas
-- Verificar y eliminar el trigger si ya existe
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'recalcular_total_carrito'
    ) THEN
        DROP TRIGGER recalcular_total_carrito ON Carrito_Producto;
    END IF;
END $$;

-- Crear el trigger después de eliminarlo (si existía)
CREATE TRIGGER recalcular_total_carrito
AFTER INSERT OR UPDATE OR DELETE ON Carrito_Producto
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_carrito();






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