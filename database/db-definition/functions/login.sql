CREATE OR REPLACE FUNCTION
    login(
        username TEXT,
        password TEXT
    )

    RETURNS usuario_type
    LANGUAGE plpgsql
    AS $$

    DECLARE
        usuario usuario_type;

    BEGIN

        SELECT 
                usuarios.UsuarioID AS id,
                usuarios.rol AS rol,
                usuarios.correo AS correo,
                usuarios.telefono AS telefono
        INTO usuario
        FROM usuarios
        WHERE usuarios.correo = login.username
            AND usuarios.contraseña = crypt(login.password, usuarios.contraseña);

        RETURN usuario;

    END;

    $$;
