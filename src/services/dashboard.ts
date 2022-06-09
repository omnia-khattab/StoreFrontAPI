import client from "../database";


export class dashboardQueries{
    //get All orders in orders-products
    async allOrders(): Promise<{quantity: number, order_id: string, category_id: string}[]> {
        try {
          
          const conn = await client.connect()
          const sql = 'SELECT * FROM orders_products ';
    
          const result = await conn.query(sql);
    
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get products and orders: ${err}`)
        } 
    }

    // Get all products that have been included in orders
    async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
        try {
          
          const conn = await client.connect()
          const sql = 'SELECT name, price, order_id FROM products INNER JOIN orders_products ON products.id = orders_products.id';
    
          const result = await conn.query(sql);
    
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`unable get products and orders: ${err}`)
        } 
    }

     // Get all user that have been included in orders
     async usersInOrders(): Promise<{name: string, user_id: string}[]> {
      try {
        
        const conn = await client.connect();
        const sql = 'SELECT first_name, user_id FROM users INNER JOIN orders ON users.id = orders.id';
  
        const result = await conn.query(sql);
  
        conn.release();
  
        return result.rows;
      } catch (err) {
        throw new Error(`unable get products and orders: ${err}`)
      } 
  }

    //Get the most five popular products
    async popularProducts(): Promise<{name: string, price: number, order_id: string}[]> {
      try {
        
        const conn = await client.connect()
        const sql = `SELECT SUM(product_id) as sum, name
                        FROM products
                        INNER JOIN orders_products
                        ON products.id = orders_products.id
                        GROUP BY(name)
                        ORDER BY SUM(product_id) DESC
                        LIMIT 5
                        `;
        const result = await conn.query(sql)
  
        conn.release()
  
        return result.rows;
      } catch (err) {
        throw new Error(`unable to get products: ${err}`)
      } 
  }

 
}