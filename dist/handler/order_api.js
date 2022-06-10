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
const order_1 = require("../model/order");
const verifyToken_1 = __importDefault(require("../middlwares/verifyToken"));
const order_Model = new order_1.OrderModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_Model.index();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const order = yield order_Model.find(id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const o = {
        order_status: req.body.order_status,
        user_id: req.body.user_id,
    };
    try {
        const newOrder = yield order_Model.create(o);
        res.status(201).json({ newOrder });
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const order_status = req.body.order_status;
    try {
        const order = yield order_Model.update(id, order_status);
        res.status(201).json(order);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const order = yield order_Model.delete(id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quantity = parseInt(req.body.quantity);
        const order_id = parseInt(req.params.id);
        const product_id = parseInt(req.body.product_id);
        const order = yield order_Model.addOrderProduct(quantity, order_id, product_id);
        res.status(201).json(order);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield order_Model.removeOrderProduct(parseInt(req.params.id));
        res.status(200).json(deleted);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const completedOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_Model.completedOrders();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const ORDER_API = (app) => {
    app.get('/orders', index);
    app.get('/order/:id', find);
    app.post('/order/create', verifyToken_1.default, create);
    app.put('/order/update/:id', verifyToken_1.default, update);
    app.delete('/order/:id', verifyToken_1.default, delete_);
    app.post('/cart/orders/:id/products', verifyToken_1.default, addToCart);
    app.delete('/cart/orders/:id/products', verifyToken_1.default, removeFromCart);
    app.get('/orders/completed', completedOrders);
};
exports.default = ORDER_API;
