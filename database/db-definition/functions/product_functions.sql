CREATE OR REPLACE FUNCTION insertar_producto(
    p_nombre VARCHAR,
    p_descripcion TEXT,
    p_categoriaid INT,
    p_ocasionid INT,
    p_precio DECIMAL,
    p_imagen1 VARCHAR,
    p_imagen2 VARCHAR,
    p_imagen3 VARCHAR,
    p_rellenoid INT,
    p_masaid INT,
    p_sabor_galletaid INT,
    p_coberturaid INT,
    p_tipo_chocolateid INT
) 
RETURNS INT AS $$
DECLARE
    v_productoid INT;
BEGIN
    -- Insertar en la tabla Productos
    INSERT INTO Productos (Nombre, Descripcion, CategoriaID, OcasionID, Precio, Imagen1, Imagen2, Imagen3)
    VALUES (p_nombre, p_descripcion, p_categoriaid, p_ocasionid, p_precio, p_imagen1, p_imagen2, p_imagen3)
    RETURNING ProductoID INTO v_productoid;
    
    -- Insertar en la tabla Detalles_Producto
    INSERT INTO Detalles_Producto (ProductoID, RellenoID, MasaID, Sabor_GalletaID, CoberturaID, Tipo_ChocolateID)
    VALUES (v_productoid, p_rellenoid, p_masaid, p_sabor_galletaid, p_coberturaid, p_tipo_chocolateid);
    
    -- Retornar el ID del producto insertado
    RETURN v_productoid;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION eliminar_producto(p_productoid INT)
RETURNS VOID AS $$
BEGIN
    -- Eliminar primero en Detalles_Producto para evitar violaciones de clave foránea
    DELETE FROM Detalles_Producto WHERE ProductoID = p_productoid;
    
    -- Eliminar en la tabla Productos
    DELETE FROM Productos WHERE ProductoID = p_productoid;
END;
$$ LANGUAGE plpgsql;
