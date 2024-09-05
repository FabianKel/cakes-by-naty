CREATE OR REPLACE FUNCTION register(
    p_rol TEXT,
    p_usuario TEXT,
    p_correo TEXT,
    p_password TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$

DECLARE
    new_user_id INTEGER;
    secret_key TEXT := 'my_secret_key';
    encrypted_usuario BYTEA;
    encrypted_correo BYTEA;

BEGIN
    -- Cifrar los valores de usuario y correo para comparación
    encrypted_usuario := pgp_sym_encrypt(p_usuario, secret_key);
    encrypted_correo := pgp_sym_encrypt(p_correo, secret_key);

    -- Insertar el nuevo usuario
    INSERT INTO Usuarios (
        Rol,
        Usuario,
        Correo,
        Password
    )
    VALUES (
        p_rol,
        encrypted_usuario,
        encrypted_correo,
        crypt(p_password, gen_salt('bf'))
    )
    RETURNING UsuarioID INTO new_user_id;

    RETURN new_user_id;
END;
$$;