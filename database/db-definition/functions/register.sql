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
        Usuario,
        Primer_Nombre,
        Segundo_Nombre,
        Correo,
        Telefono,
        Password
    )
    VALUES (
        crypt(rol, gen_salt('bf')),
        crypt(usuario, gen_salt('bf')),
        NULL,
        NULL,
        crypt(correo, gen_salt('bf')),
        NULL,
        crypt(password, gen_salt('bf'))
    )
    RETURNING UsuarioID INTO new_user_id;

    RETURN new_user_id;      
END;

$$;