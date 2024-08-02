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