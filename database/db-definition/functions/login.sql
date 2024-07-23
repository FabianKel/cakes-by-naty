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
                usuarios.UsuarioID as id,
                usuarios.rol as rol,
                usuarios.correo AS correo,
                usuarios.telefono as telefono
        INTO usuario
        FROM usuarios
        WHERE usuarios.correo = login.username
            AND usuarios.password = crypt(login.password, usuarios.contraseña);

        RETURN usuario;

    END;

    $$;
