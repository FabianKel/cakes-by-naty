--DELETE ORDERS BY ID
CREATE OR REPLACE FUNCTION eliminar_pedido(p_id INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE 
    FROM Pedidos
    WHERE pedidoID = p_id;
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