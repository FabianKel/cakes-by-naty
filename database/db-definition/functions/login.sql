CREATE OR REPLACE FUNCTION login(
    p_username  TEXT,
    p_password  TEXT
)
RETURNS usuario_type
LANGUAGE plpgsql
AS $$

DECLARE
    usuario usuario_type;
    tmp_token TEXT;
    tmp_refresh_token TEXT;
    tmp_fingerprint TEXT;
    tmp_fingerprint_hashed TEXT;
    is_email BOOLEAN;
    secret_key TEXT := 'my_secret_key';

BEGIN
    -- Verifica si el input es un correo electrónico
    is_email := p_username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$';

    IF is_email THEN
        -- Autenticación usando correo electrónico
        SELECT 
            u.UsuarioID AS id,
            u.Rol AS rol,
            u.Correo AS correo,
            u.Telefono AS telefono
        INTO usuario
        FROM usuarios u
        WHERE pgp_sym_decrypt(u.Correo::bytea, secret_key) = p_username
          AND u.Password = crypt(p_password, u.Password);
    ELSE
        -- Autenticación usando nombre de usuario
        SELECT 
            u.UsuarioID AS id,
            u.Rol AS rol,
            u.Correo AS correo,
            u.Telefono AS telefono
        INTO usuario
        FROM usuarios u
        WHERE pgp_sym_decrypt(u.Usuario::bytea, secret_key) = p_username
          AND u.Password = crypt(p_password, u.Password);
    END IF;

    IF usuario.id IS NOT NULL THEN
        -- Crear el fingerprint de sesión
        tmp_fingerprint := substr(md5(random()::text), 0, 64);
        tmp_fingerprint_hashed := crypt(tmp_fingerprint, gen_salt('bf'));

        -- Crear el token JWT
        SELECT sign(row_to_json(r), current_setting('app.jwt_secret')) AS token
        FROM (
            SELECT 
                tmp_fingerprint_hashed AS fingerprint,
                extract(epoch from now())::integer + 60*6 AS exp,
                usuario.id,
                usuario.Correo,
                usuario.Rol
        ) r
        INTO tmp_token;

        -- Crear el JWT Refresh Token
        SELECT sign(row_to_json(r), current_setting('app.jwt_refresh_secret')) AS token
        FROM (
            SELECT p_username AS username,
                   tmp_fingerprint_hashed AS fingerprint,
                   extract(epoch from now())::integer + 60*60*12 AS exp,
                   usuario.id,
                   usuario.Correo,
                   usuario.Rol
        ) r
        INTO tmp_refresh_token;

        usuario.token := tmp_token;
        usuario.refresh_token := tmp_refresh_token;
        usuario.fingerprint := tmp_fingerprint;
    ELSE
        -- Manejo de errores en caso de autenticación fallida
        RAISE EXCEPTION 'Invalid username or password';
    END IF;

    RETURN usuario;

END;
$$;