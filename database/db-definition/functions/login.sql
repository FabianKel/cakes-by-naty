CREATE OR REPLACE FUNCTION login(
    username  TEXT,
    password  TEXT
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
    is_email boolean;
    secret_key TEXT := 'my_secret_key';

BEGIN

    is_email := username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$';

    IF is_email THEN
        SELECT 
            usuarios.UsuarioID AS id,
            usuarios.Rol AS rol,
            usuarios.Correo AS Correo,
            usuarios.Telefono AS Telefono
        INTO usuario
        FROM usuarios
        WHERE pgp_sym_decrypt(usuarios.Correo::bytea, secret_key) = username
            AND usuarios.Password = crypt(login.password, usuarios.Password);
    ELSE
        SELECT 
            usuarios.UsuarioID AS id,
            usuarios.Rol AS rol,
            usuarios.Correo AS Correo,
            usuarios.Telefono AS Telefono
        INTO usuario
        FROM usuarios
        WHERE pgp_sym_decrypt(usuarios.Usuario::bytea, secret_key) = username
            AND usuarios.Password = crypt(login.password, usuarios.Password);
    END IF;

    
    IF usuario.id IS NOT NULL THEN
        -- Create session fingerprints
        tmp_fingerprint = substr(md5(random()::text), 0, 64);
        tmp_fingerprint_hashed = crypt(tmp_fingerprint, gen_salt('bf'));

        -- Create JWT Token
        SELECT sign(row_to_json(r), current_setting(secret_key)) AS token
        FROM (
            SELECT 
                    tmp_fingerprint_hashed AS fingerprint,
                    extract(epoch from now())::integer + 60*6 as exp,
                    usuario.id,
                    usuario.Correo,
                    usuario.Rol
        ) r
        INTO tmp_token;

        -- Create JWT Refresh Token
        SELECT sign(row_to_json(r), current_setting('app.jwt_refresh_secret')) AS token
        FROM (
            SELECT username AS username,
                    tmp_fingerprint_hashed AS fingerprint,
                    extract(epoch from now())::integer + 60*60*12 as exp,
                    usuario.id,
                    usuario.Correo,
                    usuario.Rol
        ) r
        INTO tmp_refresh_token;

        usuario.token = tmp_token;
        usuario.refresh_token = tmp_refresh_token;
        usuario.fingerprint = tmp_fingerprint;
    END IF;



    RETURN usuario;

END;

$$;