CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    price INTEGER,
    pieces INTEGER,
    category_id bigint REFERENCES categories(id) on delete cascade on update cascade,
    user_id bigint REFERENCES users(id) on delete cascade on update cascade
    
);