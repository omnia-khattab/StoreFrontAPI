import Client from "../database";
//import { ProductModel } from "./product";

//const product_model=new ProductModel();

export type Order={
    id?:number,
    order_status:string,
    user_id:number|string
};

export class OrderModel{

    async index():Promise<Order[]> {
        try{
            const conn = await Client.connect();
            const sql='SELECT * FROM orders';
            const result= await conn.query(sql);
            const orders= result.rows;
            conn.release();
            return orders;
        }
        catch(err){
            throw new Error(`Can't get all orders. Error: ${err}` );
        }
    }

    async find(id:number):Promise<Order> {
        
        try{
            const conn = await Client.connect();
            const sql='SELECT * FROM orders WHERE id=($1)';
            const result= await conn.query(sql,[id]);
            const order= result.rows[0];
            conn.release();
            return order;
        }
        catch(err){
            throw new Error(`Couldn't find order ${id}. Error: ${err}` );
        }
    }

    async create(o:Order):Promise<Order> {
        
        try{
            const conn = await Client.connect();
            const sql='INSERT INTO orders (order_status,user_id) VALUES ($1,$2) RETURNING *';
            const result= await conn.query(sql,[o.order_status,o.user_id]);
            const order= result.rows[0];
            conn.release();
            return order;
        }
        catch(err){
            throw new Error(`Couldn't Create order of user ${o.user_id}. Error: ${err}` );
        }
    }

    async update(id:number,order_status:string):Promise<Order> {
        
        try{
            const conn = await Client.connect();
            const sql='UPDATE orders SET order_status=$2 WHERE id=$1 RETURNING *';
            const result= await conn.query(sql,[id,order_status]);
            const order= result.rows[0];
            conn.release();
            return order;
        }
        catch(err){
            throw new Error(`Couldn't update order ${id}. Error: ${err}` );
        }
    }

    //add orderProduct
    async addOrderProduct(quantity:number,orderID:number,productID:number):Promise<{id:number,quantity:number,order_id:string,product_id:string}>{
        try{
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
    
            const conn = await Client.connect();
            const result = await conn.query(ordersql, [orderID])
    
            const order = result.rows[0];
    
            if (order.order_status !== "active") {
              throw new Error(`Could not add product ${productID} to order ${orderID} because order status is ${order.order_status}`);
            }
    
          conn.release();
        } catch (err) {
          throw new Error(`${err}`)
        }
        try {
          const conn = await Client.connect();
          const sql = "INSERT INTO orders_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *";
          const result = await conn.query(sql, [quantity,orderID,productID]);
    
          const order= result.rows[0];
          conn.release();
          
          return order;
    
        } catch (err) {
          throw new Error(`Could not add order to cart. Error: ${err}`);
        }
      }

      
    async removeOrderProduct(id: number): Promise<{id:number,quantity:number,order_id:string,product_id:string}> {
        try {
          const conn = await Client.connect();
          const sql = "DELETE FROM orders_products WHERE id=($1) RETURNING *";
          const result = await conn.query(sql, [id]);
          const deletedOrder=result.rows[0];
          conn.release();
    
          return deletedOrder;
        } catch (err) {
          throw new Error(`Could not delete orderproduct. Error: ${err}`);
        }
      }


    async delete(id:number):Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql='DELETE FROM orders WHERE id=($1) RETURNING *';
            const result= await conn.query(sql,[id]);
            const DeletedOrder= result.rows[0];
            conn.release();
            return DeletedOrder;
        }
        catch(err){
            throw new Error(`Couldn't delete order ${id}. Error: ${err}` );
        }
    }

    async completedOrders():Promise<Order[]> {
        try{
            const conn = await Client.connect();
            const sql="SELECT * FROM orders WHERE order_status='closed' ";
            const result= await conn.query(sql);
            const order= result.rows;
            conn.release();
            return order;
        }
        catch(err){
            throw new Error(`Couldn't find orders. Error: ${err}` );
        }
    }
}