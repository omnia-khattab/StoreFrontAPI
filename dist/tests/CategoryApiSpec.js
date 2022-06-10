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
describe('Category End Point Test Response', () => {
    it('Get The all Categories End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/categories');
        expect(response.status).toBe(200);
    }));
    it('Get category By Id End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/category/1');
        expect(response.status).toBe(200);
    }));
    it('Create category End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/category/create')
            .send({ name: "Category 2" })
            .set('Authorization', `Bearer ${token}`)
            .expect(201, {
            newCategory: {
                id: 2,
                name: "Category 2",
            }
        });
        expect(response.status).toBe(201);
    }));
    it('Update Category End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/category/update/2')
            .send({ name: "Category2 updated" })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    }));
    it('Delete Category End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/category/2')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
