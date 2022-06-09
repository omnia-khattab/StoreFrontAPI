import Client from '../database';

export type Category = {
  id?: number;
  name: string;
};

export class CategoryModel {
  async index(): Promise<Category[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM categories';
      const result = await conn.query(sql);
      const categories = result.rows;
      conn.release();
      return categories;
    } catch (err) {
      throw new Error(`Can't get all categories. Error: ${err}`);
    }
  }

  async find(id: number): Promise<Category> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Couldn't find category ${id}. Error: ${err}`);
    }
  }

  async create(C: Category): Promise<Category> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
      const result = await conn.query(sql, [C.name]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Couldn't Create Category ${C.name}. Error: ${err}`);
    }
  }

  async update(id: number, name: string): Promise<Category> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE categories SET name=$2 WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id, name]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Couldn't update category ${name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      const DeletedCategory = result.rows[0];
      conn.release();
      return DeletedCategory;
    } catch (err) {
      throw new Error(`Couldn't delete category ${id}. Error: ${err}`);
    }
  }
}
