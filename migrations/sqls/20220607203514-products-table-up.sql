CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    price INTEGER,
    pieces INTEGER,
    category_id bigint REFERENCES categories(id),
    user_id bigint REFERENCES users(id)
    
);