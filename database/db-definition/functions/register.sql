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
    secret_key TEXT := 'my_secret_key';

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
        rol,
        pgp_sym_encrypt(usuario, secret_key),
        NULL,
        NULL,
        pgp_sym_encrypt(correo, secret_key),
        NULL,
        crypt(password, gen_salt('bf'))
    )
    RETURNING UsuarioID INTO new_user_id;

    RETURN new_user_id;      
END;

$$;