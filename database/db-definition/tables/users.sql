CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,    
    last_name VARCHAR(100) NOT NULL,     
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    -- role VARCHAR(50) DEFAULT 'user',
    -- status BOOLEAN DEFAULT TRUE, 
    -- phone VARCHAR(20),
    -- address TEXT,
    CONSTRAINT unique_email UNIQUE (email)
);