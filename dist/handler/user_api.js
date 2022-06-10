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
const user_1 = require("../model/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = __importDefault(require("../middlwares/verifyToken"));
const user_Model = new user_1.UserModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_Model.index();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const users = yield user_Model.find(id);
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const u = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        user_role: req.body.user_role,
    };
    try {
        const newUser = yield user_Model.create(u);
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, name: newUser.first_name, email: newUser.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    try {
        const user = yield user_Model.update(id, first_name, last_name, email);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const password = req.body.password;
    try {
        const user = yield user_Model.updatePassword(id, password);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const user = yield user_Model.delete(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
//login
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    try {
        const user = yield user_Model.authenticate(email, password);
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            //save token to user
            res.status(200).json({ token });
        }
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const USER_API = (app) => {
    app.get('/users', index);
    app.get('/user/:id', find);
    app.post('/user/signup', create);
    app.post('/user/login/', authenticate);
    app.put('/user/update/:id', verifyToken_1.default, update);
    app.put('/user/updatePassword/:id', verifyToken_1.default, updatePassword);
    app.delete('/user/:id', verifyToken_1.default, delete_);
};
exports.default = USER_API;
