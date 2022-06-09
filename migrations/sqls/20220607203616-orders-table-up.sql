DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
        create type status AS ENUM ('active','closed');
    END IF;
END
$$;

CREATE TABLE orders( 
    id SERIAL PRIMARY KEY,
    order_status status,
    user_id bigint REFERENCES users(id) on delete cascade on update cascade
    
);