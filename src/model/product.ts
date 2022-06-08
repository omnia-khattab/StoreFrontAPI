import Client from "../database";

export type Product={
    id?:number,
    name:string,
    price:number,
    pieces:number,
    category_id:number|string,
    user_id:number|string
};

export class ProductModel{

    async index():Promise<Product[]> {
        try{
            const conn = await Client.connect();
            const sql='SELECT * FROM products';
            const result= await conn.query(sql);
            const products= result.rows;
            conn.release();
            return products;
        }
        catch(err){
            throw new Error(`Can't get all products. Error: ${err}` );
        }
    }

    async find(id:number):Promise<Product> {
        
        try{
            const conn = await Client.connect();
            const sql='SELECT * FROM products WHERE id=($1)';
            const result= await conn.query(sql,[id]);
            const product= result.rows[0];
            conn.release();
            return product;
        }
        catch(err){
            throw new Error(`Couldn't find product ${id}. Error: ${err}` );
        }
    }

    async create(p:Product):Promise<Product> {
        
        try{
            const conn = await Client.connect();
            const sql='INSERT INTO products (name,price,pieces,category_id,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            const result= await conn.query(sql,[p.name,p.price,p.pieces,p.category_id,p.user_id]);
            const product= result.rows[0];
            conn.release();
            return product;
        }
        catch(err){
            throw new Error(`Couldn't Create product ${p.name}. Error: ${err}` );
        }
    }

    async update(id:number,name:string,price:number,pieces:number):Promise<Product> {
        
        try{
            const conn = await Client.connect();
            const sql='UPDATE products SET name=$2, price=$3, pieces=$4 WHERE id=$1 RETURNING *';
            const result= await conn.query(sql,[id,name,price,pieces]);
            const product= result.rows[0];
            conn.release();
            return product;
        }
        catch(err){
            throw new Error(`Couldn't update product ${name}. Error: ${err}` );
        }
    }

    async delete(id:number):Promise<Product>{
        try{
            const conn = await Client.connect();
            const sql='DELETE FROM products WHERE id=($1) RETURNING *';
            const result= await conn.query(sql,[id]);
            const DeletedProduct= result.rows[0];
            conn.release();
            return DeletedProduct;
        }
        catch(err){
            throw new Error(`Couldn't delete Product ${id}. Error: ${err}` );
        }
    }

}