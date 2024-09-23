-- DELETE ORDERS BY ID
CREATE OR REPLACE FUNCTION eliminar_pedido(p_id INT)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    filas_eliminadas INT;
BEGIN
    DELETE 
    FROM Pedidos
    WHERE pedidoID = p_id
    RETURNING 1 INTO filas_eliminadas;

    RETURN COALESCE(filas_eliminadas, 0);
END;
$$;

CREATE OR REPLACE FUNCTION eliminar_producto_carrito(c_id INT, p_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE 
    FROM Carrito_Producto
    WHERE CarritoID = c_id
    AND ProductoID = p_id;
END;
$$;