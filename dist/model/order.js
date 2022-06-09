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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderModel = void 0;
var database_1 = __importDefault(require("../database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, orders, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        orders = result.rows;
                        conn.release();
                        return [2 /*return*/, orders];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Can't get all orders. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Couldn't find order ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO orders (order_status,user_id) VALUES ($1,$2) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [o.order_status, o.user_id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Couldn't Create order of user ".concat(o.user_id, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.update = function (id, order_status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE orders SET order_status=$2 WHERE id=$1 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [id, order_status])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Couldn't update order ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //add orderProduct
    OrderModel.prototype.addOrderProduct = function (quantity, orderID, productID) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, result, order, err_5, conn, sql, result, order, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [orderID])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (order.order_status !== "active") {
                            throw new Error("Could not add product ".concat(productID, " to order ").concat(orderID, " because order status is ").concat(order.order_status));
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("".concat(err_5));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 5:
                        conn = _a.sent();
                        sql = "INSERT INTO orders_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [quantity, orderID, productID])];
                    case 6:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 7:
                        err_6 = _a.sent();
                        throw new Error("Could not add order to cart. Error: ".concat(err_6));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.removeOrderProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, deletedOrder, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM orders_products WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        deletedOrder = result.rows[0];
                        conn.release();
                        return [2 /*return*/, deletedOrder];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not delete orderproduct. Error: ".concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, DeletedOrder, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        DeletedOrder = result.rows[0];
                        conn.release();
                        return [2 /*return*/, DeletedOrder];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("Couldn't delete order ".concat(id, ". Error: ").concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.completedOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, order, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders WHERE order_status='closed' ";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        order = result.rows;
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_9 = _a.sent();
                        throw new Error("Couldn't find orders. Error: ".concat(err_9));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.OrderModel = OrderModel;
