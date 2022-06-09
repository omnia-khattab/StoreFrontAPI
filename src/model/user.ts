import Client from "../database";
import bcrypt from "bcrypt";

export type User={
    id?:number,
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    user_role:string
};

export class UserModel{

    async index():Promise<User[]> {
        try{
            const conn = await Client.connect();
            const sql='SELECT * FROM users';
            const result= await conn.query(sql);
            const users= result.rows;
            conn.release();
            return users;
        }
        catch(err){
            throw new Error(`Can't get all users. Error: ${err}` );
        }
    }

    async find(id:number):Promise<User> {
        
        try{
            const conn = await Client.connect();
            const sql='SELECT * FROM users WHERE id=($1)';
            const result= await conn.query(sql,[id]);
            const user= result.rows[0];
            conn.release();
            return user;
        }
        catch(err){
            throw new Error(`Couldn't find user ${id}. Error: ${err}` );
        }
    }

    async create(U:User):Promise<User> {
        const saltRounds = process.env.SALT_ROUNDS as string;
        const pepper = process.env.BCRYPT_PASSWORD;
        try{
            const conn = await Client.connect();
            const sql='INSERT INTO users (first_name,last_name,email,password,user_role) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            const passHash=bcrypt.hashSync(U.password+pepper,parseInt(saltRounds));
            const result= await conn.query(sql,[U.first_name,U.last_name,U.email,passHash,U.user_role]);
            const user= result.rows[0];
            conn.release();
            return user;
        }
        catch(err){
            throw new Error(`Couldn't Create user ${U.first_name}. Error: ${err}` );
        }
    }

    async update(id:number,first_name:string,last_name:string,email:string):Promise<User> {
        
        try{
            const conn = await Client.connect();
            const sql='UPDATE users SET first_name=$2,last_name=$3,email=$4 WHERE id=$1 RETURNING *';
            const result= await conn.query(sql,[id,first_name,last_name,email]);
            const user= result.rows[0];
            conn.release();
            return user;
        }
        catch(err){
            throw new Error(`Couldn't update user ${first_name}. Error: ${err}` );
        }
    }

    async updatePassword(id:number,password:string):Promise<User> {
        const saltRounds = process.env.SALT_ROUNDS as string;
        const pepper = process.env.BCRYPT_PASSWORD;
        try{
            const conn = await Client.connect();
            const sql='UPDATE users SET password=$2 WHERE id=($1) RETURNING *';
            const passHash=bcrypt.hashSync(password+pepper,parseInt(saltRounds));
            const result= await conn.query(sql,[id,passHash]);
            const user= result.rows[0];
            conn.release();
            return user;
        }
        catch(err){
            throw new Error(`Couldn't update user ${id} password. Error: ${err}` );
        }
    }

    async delete(id:number):Promise<User>{
        try{
            const conn = await Client.connect();
            const sql='DELETE FROM users WHERE id=($1) RETURNING *';
            const result= await conn.query(sql,[id]);
            const DeletedUser= result.rows[0];
            conn.release();
            return DeletedUser;
        }
        catch(err){
            throw new Error(`Couldn't delete user ${id}. Error: ${err}` );
        }
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        const pepper = process.env.BCRYPT_PASSWORD;
        const conn = await Client.connect();
        const sql = "SELECT * FROM users WHERE email=($1)";
        const result = await conn.query(sql, [email]);
    
        if (result.rows.length) {
          const user = result.rows[0];
    
          if (bcrypt.compareSync(password + pepper, user.password)) {
            return user;
          }
          else{
            throw new Error(`password is not correct` );
          }
        }
        else{
            throw new Error(`email is not correct` );
        }
      }
}