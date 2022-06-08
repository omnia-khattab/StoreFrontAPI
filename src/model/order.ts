import Client from "../database";

export type Order={
    id?:number,
    order_status:string,
    user_id:number
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

}