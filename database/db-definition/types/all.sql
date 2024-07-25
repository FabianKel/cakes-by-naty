CREATE TYPE usuario_type
    AS (
        id INTEGER,
        rol TEXT,
        Correo VARCHAR(255),
        Telefono VARCHAR(20),
        token TEXT,
        refresh_token TEXT,
        fingerprint TEXT
    );