DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
        create type role AS ENUM ('admin','seller','user');
    END IF;
END
$$;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    password VARCHAR,
    token VARCHAR,
    user_role role
    
);