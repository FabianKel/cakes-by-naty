CREATE OR REPLACE FUNCTION
    login(
        username TEXT,
        password TEXT
    )

    RETURNS login_response
    LANGUAGE plpgsql
    AS $$

    DECLARE
        usuario usuario_type;


    BEGIN

        SELECT users


    END;

    $$;
