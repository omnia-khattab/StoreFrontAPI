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
exports.CategoryModel = void 0;
const database_1 = __importDefault(require("../database"));
class CategoryModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM categories';
                const result = yield conn.query(sql);
                const categories = result.rows;
                conn.release();
                return categories;
            }
            catch (err) {
                throw new Error(`Can't get all categories. Error: ${err}`);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM categories WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                const category = result.rows[0];
                conn.release();
                return category;
            }
            catch (err) {
                throw new Error(`Couldn't find category ${id}. Error: ${err}`);
            }
        });
    }
    create(C) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
                const result = yield conn.query(sql, [C.name]);
                const category = result.rows[0];
                conn.release();
                return category;
            }
            catch (err) {
                throw new Error(`Couldn't Create Category ${C.name}. Error: ${err}`);
            }
        });
    }
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE categories SET name=$2 WHERE id=$1 RETURNING *';
                const result = yield conn.query(sql, [id, name]);
                const category = result.rows[0];
                conn.release();
                return category;
            }
            catch (err) {
                throw new Error(`Couldn't update category ${name}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                const DeletedCategory = result.rows[0];
                conn.release();
                return DeletedCategory;
            }
            catch (err) {
                throw new Error(`Couldn't delete category ${id}. Error: ${err}`);
            }
        });
    }
}
exports.CategoryModel = CategoryModel;
