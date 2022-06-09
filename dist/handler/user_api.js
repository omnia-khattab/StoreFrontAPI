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
var user_1 = require("../model/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken_1 = __importDefault(require("../middlwares/verifyToken"));
var user_Model = new user_1.UserModel();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res
                    .status(400)
                    .status(201)
                    .json({ message: "".concat(err_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var find = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_Model.find(id)];
            case 2:
                users = _a.sent();
                res.status(201).json(users);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400).json({ message: "".concat(err_2) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var u, newUser, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                u = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                    user_role: req.body.user_role
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_Model.create(u)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ id: newUser.id, name: newUser.first_name, email: newUser.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                res.status(201).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json({ message: "".concat(err_3) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, first_name, last_name, email, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                first_name = req.body.first_name;
                last_name = req.body.last_name;
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_Model.update(id, first_name, last_name, email)];
            case 2:
                user = _a.sent();
                res.status(201).json(user);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json({ message: "".concat(err_4) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, password, user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_Model.updatePassword(id, password)];
            case 2:
                user = _a.sent();
                res.status(201).json(user);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400).json({ message: "".concat(err_5) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var delete_ = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_Model["delete"](id)];
            case 2:
                user = _a.sent();
                res.status(201).json(user);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400).json({ message: "".concat(err_6) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//login
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, token, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email.toLowerCase();
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_Model.authenticate(email, password)];
            case 2:
                user = _a.sent();
                if (user) {
                    token = jsonwebtoken_1["default"].sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                    //save token to user
                    res.status(201).json({ token: token });
                }
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.status(400).json({ message: "".concat(err_7) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var USER_API = function (app) {
    app.get('/users', verifyToken_1["default"], index);
    app.get('/user/:id', verifyToken_1["default"], find);
    app.post('/user/signup', create);
    app.post('/user/login/', authenticate);
    app.put('/user/update/:id', verifyToken_1["default"], update);
    app.put('/user/updatePassword/:id', verifyToken_1["default"], updatePassword);
    app["delete"]('/user/:id', verifyToken_1["default"], delete_);
};
exports["default"] = USER_API;
