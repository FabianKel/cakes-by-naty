CREATE TYPE usuario_type
    AS (
        id INTEGER,
        rol TEXT,
        Correo TEXT,
        Telefono TEXT,
        token TEXT,
        refresh_token TEXT,
        fingerprint TEXT
    );