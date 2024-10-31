CREATE OR REPLACE FUNCTION obtener_usuario_por_id(u_id INT)
RETURNS TABLE (
    UsuarioID INT,
    Rol TEXT,
    Usuario TEXT,
    Primer_Nombre TEXT,
    Segundo_Nombre TEXT,
    Correo TEXT,
    Telefono TEXT,
    Direccion1 TEXT,
    Direccion2 TEXT,
    Direccion3 TEXT,
    Created_at TIMESTAMP,
    Modified_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
DECLARE
    secret_key TEXT := 'my_secret_key';
BEGIN
    RETURN QUERY
    SELECT 
        u.UsuarioID,
        u.Rol,
        COALESCE(
            CASE
                WHEN u.Usuario IS NULL THEN 'No hay información'
                ELSE COALESCE(
                    pgp_sym_decrypt(u.Usuario, secret_key)::TEXT,
                    'Desencriptación fallida'
                )
            END, 
            'Desencriptación fallida'
        ) AS Usuario,

        COALESCE(
            CASE
                WHEN u.Primer_Nombre IS NULL THEN 'No hay información'
                ELSE COALESCE(
                    pgp_sym_decrypt(u.Primer_Nombre, secret_key)::TEXT,
                    'Desencriptación fallida'
                )
            END, 
            'Desencriptación fallida'
        ) AS Primer_Nombre,

        COALESCE(
            CASE
                WHEN u.Segundo_Nombre IS NULL THEN 'No hay información'
                ELSE COALESCE(
                    pgp_sym_decrypt(u.Segundo_Nombre, secret_key)::TEXT,
                    'Desencriptación fallida'
                )
            END, 
            'Desencriptación fallida'
        ) AS Segundo_Nombre,

        COALESCE(
            CASE
                WHEN u.Correo IS NULL THEN 'No hay información'
                ELSE COALESCE(
                    pgp_sym_decrypt(u.Correo, secret_key)::TEXT,
                    'Desencriptación fallida'
                )
            END, 
            'Desencriptación fallida'
        ) AS Correo,

        COALESCE(
            CASE
                WHEN u.Telefono IS NULL THEN 'No hay información'
                ELSE COALESCE(
                    pgp_sym_decrypt(u.Telefono, secret_key)::TEXT,
                    'Desencriptación fallida'
                )
            END, 
            'Desencriptación fallida'
        ) AS Telefono,

        CASE 
            WHEN d1.DireccionID IS NULL THEN 'No hay información'
            ELSE COALESCE(
                pgp_sym_decrypt(d1.Nombre, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d1.Campo1, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d1.Campo2, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d1.Ciudad, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d1.Departamento, secret_key)::TEXT,
                'Desencriptación fallida'
            )
        END AS Direccion1,

        CASE 
            WHEN d2.DireccionID IS NULL THEN 'No hay información'
            ELSE COALESCE(
                pgp_sym_decrypt(d2.Nombre, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d2.Campo1, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d2.Campo2, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d2.Ciudad, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d2.Departamento, secret_key)::TEXT,
                'Desencriptación fallida'
            )
        END AS Direccion2,

        CASE 
            WHEN d3.DireccionID IS NULL THEN 'No hay información'
            ELSE COALESCE(
                pgp_sym_decrypt(d3.Nombre, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d3.Campo1, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d3.Campo2, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d3.Ciudad, secret_key)::TEXT || ', ' || 
                pgp_sym_decrypt(d3.Departamento, secret_key)::TEXT,
                'Desencriptación fallida'
            )
        END AS Direccion3,

        u.Created_at,
        u.Modified_at
    FROM 
        Usuarios u
    LEFT JOIN Direcciones d1 ON u.Direccion1ID = d1.DireccionID
    LEFT JOIN Direcciones d2 ON u.Direccion2ID = d2.DireccionID
    LEFT JOIN Direcciones d3 ON u.Direccion3ID = d3.DireccionID
    WHERE u.UsuarioID = u_id;
END;
$$;


CREATE OR REPLACE FUNCTION insertar_usuario(
    p_rol TEXT,
    p_usuario TEXT,
    p_primer_nombre TEXT,
    p_segundo_nombre TEXT,
    p_correo TEXT,
    p_telefono TEXT,
    p_password TEXT,
    p_direccion1id INT DEFAULT NULL,
    p_direccion2id INT DEFAULT NULL,
    p_direccion3id INT DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$

DECLARE
    new_user_id INTEGER;
    secret_key TEXT := 'my_secret_key';  -- La clave de cifrado
    encrypted_usuario BYTEA;
    encrypted_primer_nombre BYTEA;
    encrypted_segundo_nombre BYTEA;
    encrypted_correo BYTEA;
    encrypted_telefono BYTEA;

BEGIN
    -- Cifrar los valores de usuario, correo y teléfono
    encrypted_usuario := pgp_sym_encrypt(p_usuario, secret_key);
    encrypted_primer_nombre := pgp_sym_encrypt(p_primer_nombre, secret_key);
    encrypted_segundo_nombre := pgp_sym_encrypt(p_segundo_nombre, secret_key);
    encrypted_correo := pgp_sym_encrypt(p_correo, secret_key);
    encrypted_telefono := pgp_sym_encrypt(p_telefono, secret_key);

    -- Insertar el nuevo usuario
    INSERT INTO Usuarios (
        Rol,
        Usuario,
        Primer_Nombre,
        Segundo_Nombre,
        Correo,
        Telefono,
        Password,
        Direccion1ID,
        Direccion2ID,
        Direccion3ID
    )
    VALUES (
        p_rol,
        encrypted_usuario,
        encrypted_primer_nombre,
        encrypted_segundo_nombre,
        encrypted_correo,
        encrypted_telefono,
        crypt(p_password, gen_salt('bf')),
        p_direccion1id,
        p_direccion2id,
        p_direccion3id
    )
    RETURNING UsuarioID INTO new_user_id;

    RETURN new_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION update_user(
    p_user_id INTEGER,
    p_rol TEXT,
    p_usuario TEXT,
    p_primer_nombre TEXT,
    p_segundo_nombre TEXT,
    p_correo TEXT,
    p_telefono TEXT,
    p_password TEXT DEFAULT NULL,
    p_direccion1id INT DEFAULT NULL,
    p_direccion2id INT DEFAULT NULL,
    p_direccion3id INT DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$

DECLARE
    secret_key TEXT := 'my_secret_key';  -- La clave de cifrado
    encrypted_usuario BYTEA;
    encrypted_correo BYTEA;
    encrypted_telefono BYTEA;

BEGIN
    -- Cifrar los valores de usuario, correo y teléfono
    encrypted_usuario := pgp_sym_encrypt(p_usuario, secret_key);
    encrypted_correo := pgp_sym_encrypt(p_correo, secret_key);
    encrypted_telefono := pgp_sym_encrypt(p_telefono, secret_key);

    -- Actualizar el usuario
    UPDATE Usuarios
    SET
        Rol = p_rol,
        Usuario = encrypted_usuario,
        Primer_Nombre = p_primer_nombre,
        Segundo_Nombre = p_segundo_nombre,
        Correo = encrypted_correo,
        Telefono = encrypted_telefono,
        Direccion1ID = p_direccion1id,
        Direccion2ID = p_direccion2id,
        Direccion3ID = p_direccion3id,
        Modified_at = CURRENT_TIMESTAMP
    WHERE UsuarioID = p_user_id;

    -- Actualizar la contraseña si se proporciona
    IF p_password IS NOT NULL THEN
        UPDATE Usuarios
        SET Password = crypt(p_password, gen_salt('bf'))
        WHERE UsuarioID = p_user_id;
    END IF;

    RETURN p_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION create_and_assign_address(
    p_user_id INT,
    p_nombre TEXT,
    p_campo1 TEXT,
    p_campo2 TEXT,
    p_ciudad TEXT,
    p_departamento TEXT,
    p_detalles TEXT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    new_address_id INT;
    secret_key TEXT := 'my_secret_key';
    encrypted_nombre BYTEA;
    encrypted_campo1 BYTEA;
    encrypted_campo2 BYTEA;
    encrypted_ciudad BYTEA;
    encrypted_departamento BYTEA;
    encrypted_detalles BYTEA;
BEGIN
    -- Cifrar los valores de la dirección
    encrypted_nombre := pgp_sym_encrypt(p_nombre, secret_key);
    encrypted_campo1 := pgp_sym_encrypt(p_campo1, secret_key);
    encrypted_campo2 := pgp_sym_encrypt(p_campo2, secret_key);
    encrypted_ciudad := pgp_sym_encrypt(p_ciudad, secret_key);
    encrypted_departamento := pgp_sym_encrypt(p_departamento, secret_key);
    encrypted_detalles := pgp_sym_encrypt(p_detalles, secret_key);

    -- Insertar la nueva dirección
    INSERT INTO Direcciones (
        Nombre,
        Campo1,
        Campo2,
        Ciudad,
        Departamento,
        Detalles
    )
    VALUES (
        encrypted_nombre,
        encrypted_campo1,
        encrypted_campo2,
        encrypted_ciudad,
        encrypted_departamento,
        encrypted_detalles
    )
    RETURNING DireccionID INTO new_address_id;

    -- Actualizar el usuario con la nueva dirección
    UPDATE Usuarios
    SET Direccion1ID = new_address_id
    WHERE UsuarioID = p_user_id;

END;
$$;
