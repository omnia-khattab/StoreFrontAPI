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
exports.dashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class dashboardQueries {
    //get All orders in orders-products
    allOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders_products ';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    // Get all products that have been included in orders
    productsInOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price, order_id FROM products INNER JOIN orders_products ON products.id = orders_products.id';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    // Get all user that have been included in orders
    usersInOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT first_name, user_id FROM users INNER JOIN orders ON users.id = orders.id';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    //Get the most five popular products
    popularProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT SUM(product_id) as sum, name
                        FROM products
                        INNER JOIN orders_products
                        ON products.id = orders_products.id
                        GROUP BY(name)
                        ORDER BY SUM(product_id) DESC
                        LIMIT 5
                        `;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable to get products: ${err}`);
            }
        });
    }
}
exports.dashboardQueries = dashboardQueries;
