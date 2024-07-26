CREATE OR REPLACE FUNCTION register(
    usuario TEXT,
    rol TEXT,
    correo TEXT,
    password TEXT
)

RETURNS INTEGER
LANGUAGE plpgsql
AS $$

DECLARE
    new_user_id INTEGER;

BEGIN

    INSERT INTO Usuarios (
        Rol,
        Nickname,
        Primer_Nombre,
        Segundo_Nombre,
        Correo,
        Telefono,
        Password
    )
    VALUES (
        rol,
        usuario,
        NULL,
        NULL,
        correo,
        NULL,
        crypt(password, gen_salt('bf'))
    )
    RETURNING UsuarioID INTO new_user_id;

    RETURN new_user_id;      
END;

$$;