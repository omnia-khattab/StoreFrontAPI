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
const product_1 = require("../model/product");
const verifyToken_1 = __importDefault(require("../middlwares/verifyToken"));
const product_Model = new product_1.ProductModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_Model.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).status(201).json({ message: `${err}` });
    }
});
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield product_Model.find(id);
        res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const p = {
        name: req.body.name,
        price: req.body.price,
        pieces: req.body.pieces,
        category_id: req.body.category_id,
        user_id: req.body.user_id
    };
    try {
        const newProduct = yield product_Model.create(p);
        res.status(201).json({ newProduct });
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const price = req.body.price;
    const pieces = req.body.pieces;
    try {
        const product = yield product_Model.update(id, name, price, pieces);
        res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield product_Model.delete(id);
        res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const PRODUCT_API = (app) => {
    app.get('/products', verifyToken_1.default, index);
    app.get('/product/:id', verifyToken_1.default, find);
    app.post('/product/create', verifyToken_1.default, create);
    app.put('/product/update/:id', verifyToken_1.default, update);
    app.delete('/product/:id', verifyToken_1.default, delete_);
};
exports.default = PRODUCT_API;
