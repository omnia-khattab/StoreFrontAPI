"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                const products = result.rows;
                conn.release();
                return products;
            }
            catch (err) {
                throw new Error(`Can't get all products. Error: ${err}`);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Couldn't find product ${id}. Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name,price,pieces,category_id,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';
                const result = yield conn.query(sql, [
                    p.name,
                    p.price,
                    p.pieces,
                    p.category_id,
                    p.user_id,
                ]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Couldn't Create product ${p.name}. Error: ${err}`);
            }
        });
    }
    update(id, name, price, pieces) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE products SET name=$2, price=$3, pieces=$4 WHERE id=$1 RETURNING *';
                const result = yield conn.query(sql, [id, name, price, pieces]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Couldn't update product ${name}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                const DeletedProduct = result.rows[0];
                conn.release();
                return DeletedProduct;
            }
            catch (err) {
                throw new Error(`Couldn't delete Product ${id}. Error: ${err}`);
            }
        });
    }
    ProductByCategory(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE category_id=($1)';
                const result = yield conn.query(sql, [category_id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Couldn't find product. Error: ${err}`);
            }
        });
    }
    //Get number of pieces of product
    PiecesNo(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const piecesSQL = 'SELECT pieces FROM products WHERE id=($1)';
                const pieceResult = yield conn.query(piecesSQL, [productId]);
                const piecesNo = pieceResult.rows[0];
                //console.log(piecesNo);
                conn.release();
                return piecesNo.pieces;
            }
            catch (err) {
                throw new Error(`Couldn't find product ${productId}. Error: ${err}`);
            }
        });
    }
}
exports.ProductModel = ProductModel;
