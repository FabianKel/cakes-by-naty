--FUNCIONES SQL PARA EL CRUD DE PRODUCTOS
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
RETURNS VOID AS $$
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
    
END;
$$ LANGUAGE plpgsql;
