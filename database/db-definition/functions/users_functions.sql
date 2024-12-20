CREATE OR REPLACE FUNCTION obtener_usuario_por_id(u_id INT)
RETURNS TABLE (
    UsuarioID INT,
    Rol TEXT,
    Usuario TEXT,
    Primer_Nombre TEXT,
    Segundo_Nombre TEXT,
    Correo TEXT,
    Telefono TEXT,
    Direccion1ID INT,
    Direccion1_Nombre TEXT,
    Direccion1_Campo1 TEXT,
    Direccion1_Campo2 TEXT,
    Direccion1_Ciudad TEXT,
    Direccion1_Departamento TEXT,
    Direccion1_Detalles TEXT,
    Direccion2ID INT,
    Direccion2_Nombre TEXT,
    Direccion2_Campo1 TEXT,
    Direccion2_Campo2 TEXT,
    Direccion2_Ciudad TEXT,
    Direccion2_Departamento TEXT,
    Direccion2_Detalles TEXT,
    Direccion3ID INT,
    Direccion3_Nombre TEXT,
    Direccion3_Campo1 TEXT,
    Direccion3_Campo2 TEXT,
    Direccion3_Ciudad TEXT,
    Direccion3_Departamento TEXT,
    Direccion3_Detalles TEXT,
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

        d1.DireccionID AS Direccion1ID,
        pgp_sym_decrypt(d1.Nombre, secret_key)::TEXT AS Direccion1_Nombre,
        pgp_sym_decrypt(d1.Campo1, secret_key)::TEXT AS Direccion1_Campo1,
        pgp_sym_decrypt(d1.Campo2, secret_key)::TEXT AS Direccion1_Campo2,
        pgp_sym_decrypt(d1.Ciudad, secret_key)::TEXT AS Direccion1_Ciudad,
        pgp_sym_decrypt(d1.Departamento, secret_key)::TEXT AS Direccion1_Departamento,
        pgp_sym_decrypt(d1.Detalles, secret_key)::TEXT AS Direccion1_Detalles,

        d2.DireccionID AS Direccion2ID,
        pgp_sym_decrypt(d2.Nombre, secret_key)::TEXT AS Direccion2_Nombre,
        pgp_sym_decrypt(d2.Campo1, secret_key)::TEXT AS Direccion2_Campo1,
        pgp_sym_decrypt(d2.Campo2, secret_key)::TEXT AS Direccion2_Campo2,
        pgp_sym_decrypt(d2.Ciudad, secret_key)::TEXT AS Direccion2_Ciudad,
        pgp_sym_decrypt(d2.Departamento, secret_key)::TEXT AS Direccion2_Departamento,
        pgp_sym_decrypt(d2.Detalles, secret_key)::TEXT AS Direccion2_Detalles,

        d3.DireccionID AS Direccion3ID,
        pgp_sym_decrypt(d3.Nombre, secret_key)::TEXT AS Direccion3_Nombre,
        pgp_sym_decrypt(d3.Campo1, secret_key)::TEXT AS Direccion3_Campo1,
        pgp_sym_decrypt(d3.Campo2, secret_key)::TEXT AS Direccion3_Campo2,
        pgp_sym_decrypt(d3.Ciudad, secret_key)::TEXT AS Direccion3_Ciudad,
        pgp_sym_decrypt(d3.Departamento, secret_key)::TEXT AS Direccion3_Departamento,
        pgp_sym_decrypt(d3.Detalles, secret_key)::TEXT AS Direccion3_Detalles,

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



--EDITAR USUARIO

CREATE OR REPLACE FUNCTION edit_user(
    p_usuario_id INT,
    p_usuario TEXT,
    p_primer_nombre TEXT,
    p_segundo_nombre TEXT,
    p_correo TEXT,
    p_telefono TEXT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    secret_key TEXT := 'my_secret_key';
    encrypted_usuario BYTEA;
    encrypted_primer_nombre BYTEA;
    encrypted_segundo_nombre BYTEA;
    encrypted_correo BYTEA;
    encrypted_telefono BYTEA;
BEGIN
    -- Cifrar los valores
    encrypted_usuario := pgp_sym_encrypt(p_usuario, secret_key);
    encrypted_primer_nombre := pgp_sym_encrypt(p_primer_nombre, secret_key);
    encrypted_segundo_nombre := pgp_sym_encrypt(p_segundo_nombre, secret_key);
    encrypted_correo := pgp_sym_encrypt(p_correo, secret_key);
    encrypted_telefono := pgp_sym_encrypt(p_telefono, secret_key);

    -- Actualizar el usuario
    UPDATE Usuarios
    SET 
        Usuario = encrypted_usuario,
        Primer_Nombre = encrypted_primer_nombre,
        Segundo_Nombre = encrypted_segundo_nombre,
        Correo = encrypted_correo,
        Telefono = encrypted_telefono,
        Modified_at = CURRENT_TIMESTAMP
    WHERE UsuarioID = p_usuario_id;
END;
$$;


CREATE OR REPLACE FUNCTION create_and_assign_address(
    p_user_id INT,
    p_nombre TEXT,
    p_campo1 TEXT,
    p_campo2 TEXT,
    p_ciudad TEXT,
    p_departamento TEXT,
    p_detalles TEXT,
    p_direccion_numero INT  -- 1, 2 o 3 para determinar cuál campo de dirección se va a actualizar
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
    direccion_field TEXT;
BEGIN
    -- Cifrar los valores de la dirección
    encrypted_nombre := pgp_sym_encrypt(p_nombre, secret_key);
    encrypted_campo1 := pgp_sym_encrypt(p_campo1, secret_key);
    encrypted_campo2 := pgp_sym_encrypt(p_campo2, secret_key);
    encrypted_ciudad := pgp_sym_encrypt(p_ciudad, secret_key);
    encrypted_departamento := pgp_sym_encrypt(p_departamento, secret_key);
    encrypted_detalles := pgp_sym_encrypt(p_detalles, secret_key);

    -- Insertar la nueva dirección
    INSERT INTO Direcciones (Nombre, Campo1, Campo2, Ciudad, Departamento, Detalles)
    VALUES (encrypted_nombre, encrypted_campo1, encrypted_campo2, encrypted_ciudad, encrypted_departamento, encrypted_detalles)
    RETURNING DireccionID INTO new_address_id;

    -- Determinar el campo de dirección a actualizar en Usuarios
    IF p_direccion_numero = 1 THEN
        direccion_field := 'direccion1id';
    ELSIF p_direccion_numero = 2 THEN
        direccion_field := 'direccion2id';
    ELSE
        direccion_field := 'direccion3id';
    END IF;

    -- Actualizar el campo de dirección especificado
    EXECUTE format('UPDATE Usuarios SET %I = $1 WHERE UsuarioID = $2', direccion_field)
    USING new_address_id, p_user_id;

END;
$$;

CREATE OR REPLACE FUNCTION edit_dir(
    p_direccion_id INT,
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

    -- Actualizar la dirección
    UPDATE Direcciones
    SET 
        Nombre = encrypted_nombre,
        Campo1 = encrypted_campo1,
        Campo2 = encrypted_campo2,
        Ciudad = encrypted_ciudad,
        Departamento = encrypted_departamento,
        Detalles = encrypted_detalles
    WHERE DireccionID = p_direccion_id;
END;
$$;

CREATE OR REPLACE FUNCTION delete_dir(
    p_usuario_id INT,
    p_direccion_id INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    direccion_field TEXT;
BEGIN
    -- Determinar cuál campo de dirección en la tabla Usuarios tiene la dirección a eliminar
    IF EXISTS (SELECT 1 FROM Usuarios WHERE UsuarioID = p_usuario_id AND Direccion1ID = p_direccion_id) THEN
        direccion_field := 'direccion1id';
    ELSIF EXISTS (SELECT 1 FROM Usuarios WHERE UsuarioID = p_usuario_id AND Direccion2ID = p_direccion_id) THEN
        direccion_field := 'direccion2id';
    ELSE
        direccion_field := 'direccion3id';
    END IF;

    -- Establecer el campo correspondiente en NULL en la tabla Usuarios
    EXECUTE format('UPDATE Usuarios SET %I = NULL WHERE UsuarioID = $1', direccion_field)
    USING p_usuario_id;

    -- Eliminar la dirección
    DELETE FROM Direcciones WHERE DireccionID = p_direccion_id;
END;
$$;


CREATE OR REPLACE FUNCTION edit_password(
    p_usuario_id INT,
    p_password_actual TEXT,
    p_nueva_password TEXT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    password_correcta BOOLEAN;
BEGIN
    SELECT Password = crypt(p_password_actual, Password)
    INTO password_correcta
    FROM Usuarios
    WHERE UsuarioID = p_usuario_id;

    IF NOT password_correcta THEN
        RAISE EXCEPTION 'La contraseña actual no es correcta';
    END IF;

    UPDATE Usuarios
    SET 
        Password = crypt(p_nueva_password, gen_salt('bf')),
        Modified_at = CURRENT_TIMESTAMP
    WHERE UsuarioID = p_usuario_id;
END;
$$;


CREATE OR REPLACE FUNCTION edit_user_admin(
    p_usuario_id INT,
    p_rol TEXT,
    p_usuario TEXT,
    p_primer_nombre TEXT,
    p_segundo_nombre TEXT,
    p_correo TEXT,
    p_telefono TEXT,
    p_password TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    secret_key TEXT := 'my_secret_key';
    encrypted_usuario BYTEA;
    encrypted_primer_nombre BYTEA;
    encrypted_segundo_nombre BYTEA;
    encrypted_correo BYTEA;
    encrypted_telefono BYTEA;
BEGIN
    -- Cifrar los valores
    encrypted_usuario := pgp_sym_encrypt(p_usuario, secret_key);
    encrypted_primer_nombre := pgp_sym_encrypt(p_primer_nombre, secret_key);
    encrypted_segundo_nombre := pgp_sym_encrypt(p_segundo_nombre, secret_key);
    encrypted_correo := pgp_sym_encrypt(p_correo, secret_key);
    encrypted_telefono := pgp_sym_encrypt(p_telefono, secret_key);

    -- Actualizar los datos del usuario
    UPDATE Usuarios
    SET 
        Rol = p_rol,
        Usuario = encrypted_usuario,
        Primer_Nombre = encrypted_primer_nombre,
        Segundo_Nombre = encrypted_segundo_nombre,
        Correo = encrypted_correo,
        Telefono = encrypted_telefono,
        Modified_at = CURRENT_TIMESTAMP,
        Password = COALESCE(crypt(p_password, gen_salt('bf')), Password)
    WHERE UsuarioID = p_usuario_id;
END;
$$;
