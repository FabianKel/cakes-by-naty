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
        tmp_token text;
        tmp_refresh_token text;
        tmp_fingerprint text;
        tmp_fingerprint_hashed text;

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

        -- Create session fingerprints
        tmp_fingerprint = substr(md5(random()::text), 0, 64);
        tmp_fingerprint_hashed = crypt(tmp_fingerprint, gen_salt('bf'));

        -- Create JWT Token
        SELECT sign(row_to_json(r), current_setting('app.jwt_secret')) AS token
        FROM (
            SELECT  usuario.id AS id,
                    usuario.rol AS rol,
                    usuario.correo AS correo,
                    usuario.telefono AS telefono,
                    tmp_fingerprint_hashed AS fingerprint,
                    extract(epoch from now())::integer + 60*6 as exp
        ) r
        INTO tmp_token;

        -- Create JWT Refresh Token
        SELECT sign(row_to_json(r), current_setting('app.jwt_refresh_secret')) AS token
        FROM (
            SELECT login.username AS username,
                    tmp_fingerprint_hashed AS fingerprint,
                    extract(epoch from now())::integer + 60*60*12 as exp
        ) r
        INTO tmp_refresh_token;

        usuario.token = tmp_token;
        usuario.refresh_token = tmp_refresh_token;
        usuario.fingerprint = tmp_fingerprint;

        RETURN usuario;

    END;

    $$;
