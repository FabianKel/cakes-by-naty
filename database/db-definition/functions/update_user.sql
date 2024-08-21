CREATE OR REPLACE FUNCTION update_user (
    param_usuario_id INTEGER,
    param_rol TEXT,
    param_nickname TEXT,
    param_primer_nombre TEXT,
    param_segundo_nombre TEXT,
    param_correo TEXT,
    param_telefono TEXT,
    param_password TEXT,
    param_direccion1ID INT,
    param_direccion2ID INT,
    param_direccion3ID INT
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
        Direccion1ID = COALESCE(param_direccion1ID, Direccion1ID),
        Direccion2ID = COALESCE(param_direccion2ID, Direccion2ID),
        Direccion3ID = COALESCE(param_direccion3ID, Direccion3ID),
        Modified_at = CURRENT_TIMESTAMP
    WHERE UsuarioID = param_usuario_id;

END;


$$ LANGUAGE plpgsql;