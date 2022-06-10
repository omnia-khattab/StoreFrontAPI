# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

### Category
   
- Create Route:       '/category/create' [POST]
- Index Route:        '/categories' [GET]
- Find Route:         '/category/:id' [GET]
- Update Route:       '/category/update/:id' [PUT] => [update 'name']
- Delete Route:       '/category/:id' [DELETE]

#### Products
- Create Route:       '/product/create' [POST]
- Index Route:        '/products' [GET]
- Find By Id Route:   '/product/:id' [GET]
- Find By Id Category:'/product/category/:id' [GET]
- Update Route:       '/product/update/:id' [PUT]  => [update 'name,price,pieces']
- Delete Route:       '/product/:id' [DELETE]

#### Users
- Create Route:       '/user/signup' [POST]
- Index Route:        '/users' [GET]
- Find By Id Route:   '/user/:id' [GET]
- Update Route:       '/user/update/:id' [PUT]          => [update 'first_name,last_name,email']
- Reset Password Route:'/user/updatePassword/:id' [PUT] => [update 'password']
- Login Route:        '/user/login/' [POST]
- Delete Route:       '/user/:id' [DELETE]

#### Orders
- Create Route:                 '/order/create' [POST]
- Index Route:                  '/orders' [GET]
- Find By Id Route:             '/order/:id' [GET]
- Update Route:                 '/order/update/:id' [PUT] => [update 'order_status']
- Add Order Product To Cart:    '/cart/orders/:id/products' [POST]
- Delete Order Product from Cart:'/cart/orders/:id/products' [DELETE]
- Delete Route:                  '/order/:id' [DELETE]
- Completed Orders:              '/orders/completed'[GET]

### some Queires on Orders Products Tabel

- All Ordders:         '/dasboard/all/orders'[GET]
- Products In Orders:  '/dasboard/products'[GET]
- sers In Orders:     '/dashboard/users'[GET]
- 5 Popular Products:  '/dashboard/topProducts'[GET]

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY
- name VARCHAR(20)
- price INTEGER
- pieces INTEGER
- category_id  bigint REFERENCES categories(id) on delete cascade on update cascade,
- user_id bigint REFERENCES users(id) on delete cascade on update cascad

#### User
- id SERIAL PRIMARY KEY
- first_name VARCHAR(20)
- last_name VARCHAR(20)
- email VARCHAR(50) UNIQUE
- password VARCHAR
- user_role role (admin or user)

#### Orders
- id SERIAL PRIMARY KEY
- order_status status (active or complete)
- user_id bigint REFERENCES users(id) on delete cascade on update cascade

#### Orders-products
- id SERIAL PRIMARY KEY
- quantity INTEGER
- order_id bigint REFERENCES orders(id) on delete cascade on update cascade
- product_id bigint REFERENCES products(id) on delete cascade on update cascade


### Env 
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=store
- POSTGRES_TEST_DB=store_test
- POSTGRES_USER=store_user
- POSTGRES_PASSWORD=store_db@3475
- ENV=dev
- BCRYPT_PASSWORD=bcry-pass_sercret_$
- SALT_ROUNDS=10
- TOKEN_SECRET=user56token70secret24store
