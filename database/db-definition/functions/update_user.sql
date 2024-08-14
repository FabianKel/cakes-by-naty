CREATE OR REPLACE FUNCTION update_user (
    param_usuario_id INTEGER,
    param_rol TEXT,
    param_nickname TEXT,
    param_primer_nombre TEXT,
    param_segundo_nombre TEXT,
    param_correo TEXT,
    param_telefono TEXT,
    param_password TEXT,
    param_direccion1 TEXT,
    param_direccion2 TEXT,
    param_direccion3 TEXT
)

RETURNS VOID AS $$

BEGIN
    UPDATE Usuarios
    SET
        Rol = COALESCE(param_rol, Rol),
        Nickname = COALESCE(param_nickname, Nickname),
        Primer_Nombre = COALESCE(param_primer_nombre, Primer_Nombre),
        Segundo_Nombre = COALESCE(param_segundo_nombre, Segundo_Nombre),
        Correo = COALESCE(param_correo, Correo),
        Telefono = COALESCE(param_telefono, Telefono),
        Password = COALESCE(param_password, Password),
        Direccion1 = COALESCE(param_direccion1, Direccion1),
        Direccion2 = COALESCE(param_direccion2, Direccion2),
        Direccion3 = COALESCE(param_direccion3, Direccion3),
        Modified_at = CURRENT_TIMESTAMP
    WHERE UsuarioID = param_usuario_id;

END;


$$ LANGUAGE plpgsql;