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
exports.CategoryModel = void 0;
var database_1 = __importDefault(require("../database"));
var CategoryModel = /** @class */ (function () {
    function CategoryModel() {
    }
    CategoryModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, categories, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM categories';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        categories = result.rows;
                        conn.release();
                        return [2 /*return*/, categories];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Can't get all categories. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, category, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM categories WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        category = result.rows[0];
                        conn.release();
                        return [2 /*return*/, category];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Couldn't find category ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.create = function (C) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, category, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [C.name])];
                    case 2:
                        result = _a.sent();
                        category = result.rows[0];
                        conn.release();
                        return [2 /*return*/, category];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Couldn't Create Category ".concat(C.name, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.update = function (id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, category, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE categories SET name=$2 WHERE id=$1 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [id, name])];
                    case 2:
                        result = _a.sent();
                        category = result.rows[0];
                        conn.release();
                        return [2 /*return*/, category];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Couldn't update category ".concat(name, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, DeletedCategory, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        DeletedCategory = result.rows[0];
                        conn.release();
                        return [2 /*return*/, DeletedCategory];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Couldn't delete category ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryModel;
}());
exports.CategoryModel = CategoryModel;
