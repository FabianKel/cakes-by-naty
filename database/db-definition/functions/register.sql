CREATE OR REPLACE FUNCTION
    register(
        nombre_usuario TEXT,
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

        INSERT INTO Usuarios(
                            usuarioid,
                            nombre_usuario,
                            rol,
                            correo,
                            contraseña
                            )
                VALUES (
                    4,
                    register.nombre_usuario,
                    register.rol,
                    register.correo,
                    crypt(register.password, gen_salt('bf'))
                )
                RETURNING usuarioid INTO new_user_id;

        RETURN new_user_id;      
    END;

    $$;