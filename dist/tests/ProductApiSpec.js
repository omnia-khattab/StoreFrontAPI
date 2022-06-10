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
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token = jsonwebtoken_1.default.sign({ id: 1, name: "omnia", email: "omnia@gmail.com" }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
const request = (0, supertest_1.default)(server_1.default);
describe('Product End Point Test Response', () => {
    it('Get The Home End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('Get The all products End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products');
        expect(response.status).toBe(200);
    }));
    it('Get Product By Id End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/product/1');
        expect(response.status).toBe(200);
    }));
    it('Get Product By category End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/product/category/1');
        expect(response.status).toBe(200);
    }));
    it('Create Product End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            name: "product",
            price: 100,
            pieces: 20,
            category_id: 1,
            user_id: 1
        };
        const response = yield request.post('/product/create')
            .send(service)
            .set('Authorization', `Bearer ${token}`)
            .expect(201, {
            newProduct: {
                id: 2,
                name: "product",
                price: 100,
                pieces: 20,
                category_id: '1',
                user_id: '1'
            }
        });
        expect(response.status).toBe(201);
    }));
    it('Update Product End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            name: "product",
            price: 100,
            pieces: 15,
        };
        const response = yield request.put('/product/update/2')
            .send(service)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    }));
    it('Delete Product End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/product/2')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
