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
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                const orders = result.rows;
                conn.release();
                return orders;
            }
            catch (err) {
                throw new Error(`Can't get all orders. Error: ${err}`);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Couldn't find order ${id}. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (order_status,user_id) VALUES ($1,$2) RETURNING *';
                const result = yield conn.query(sql, [o.order_status, o.user_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Couldn't Create order of user ${o.user_id}. Error: ${err}`);
            }
        });
    }
    update(id, order_status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders SET order_status=$2 WHERE id=$1 RETURNING *';
                const result = yield conn.query(sql, [id, order_status]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Couldn't update order ${id}. Error: ${err}`);
            }
        });
    }
    //add orderProduct
    addOrderProduct(quantity, orderID, productID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordersql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(ordersql, [orderID]);
                const order = result.rows[0];
                if (order.order_status !== 'active') {
                    throw new Error(`Could not add product ${productID} to order ${orderID} because order status is ${order.order_status}`);
                }
                conn.release();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *';
                const result = yield conn.query(sql, [quantity, orderID, productID]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add order to cart. Error: ${err}`);
            }
        });
    }
    removeOrderProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders_products WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                const deletedOrder = result.rows[0];
                conn.release();
                return deletedOrder;
            }
            catch (err) {
                throw new Error(`Could not delete orderproduct. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                const DeletedOrder = result.rows[0];
                conn.release();
                return DeletedOrder;
            }
            catch (err) {
                throw new Error(`Couldn't delete order ${id}. Error: ${err}`);
            }
        });
    }
    completedOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE order_status='closed' ";
                const result = yield conn.query(sql);
                const order = result.rows;
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Couldn't find orders. Error: ${err}`);
            }
        });
    }
}
exports.OrderModel = OrderModel;
