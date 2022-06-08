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
const category_1 = require("../model/category");
const verifyToken_1 = __importDefault(require("../middlwares/verifyToken"));
const category_Model = new category_1.CategoryModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_Model.index();
        res.json(categories);
    }
    catch (err) {
        res.status(400).status(201).json({ message: `${err}` });
    }
});
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const categories = yield category_Model.find(id);
        res.status(201).json(categories);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const c = {
        name: req.body.name,
    };
    try {
        const newCategory = yield category_Model.create(c);
        res.status(201).json({ newCategory });
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    try {
        const category = yield category_Model.update(id, name);
        res.status(201).json(category);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const category = yield category_Model.delete(id);
        res.status(201).json(category);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const CATEGORY_API = (app) => {
    app.get('/categories', verifyToken_1.default, index);
    app.get('/category/:id', verifyToken_1.default, find);
    app.post('/category/create', verifyToken_1.default, create);
    app.put('/category/update/:id', verifyToken_1.default, update);
    app.delete('/category/:id', verifyToken_1.default, delete_);
};
exports.default = CATEGORY_API;
