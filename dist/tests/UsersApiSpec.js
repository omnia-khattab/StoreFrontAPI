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
const token = jsonwebtoken_1.default.sign({ id: 2, name: "aya", email: "aya@gmail.com" }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
const request = (0, supertest_1.default)(server_1.default);
describe('User End Point Test Response', () => {
    it('Get The all users End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users');
        expect(response.status).toBe(200);
    }));
    it('Get user By Id End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/user/1');
        expect(response.status).toBe(200);
    }));
    it('Create User End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            first_name: "aya",
            last_name: "khattab",
            email: 'aya@gmail.com'.toLowerCase(),
            password: "1234",
            user_role: "user"
        };
        const response = yield request.post('/user/signup')
            .send(service);
        expect(response.status).toBe(201);
    }));
    it('Update user End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            first_name: "aya",
            last_name: "khattab",
            email: "ayak@gmail.com",
        };
        const response = yield request.put('/user/update/2')
            .send(service)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    }));
    it('Update user password End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            id: 2,
            password: "12345",
        };
        const response = yield request.put('/user/updatePassword/2')
            .send(service)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    }));
    it('User Login End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            email: 'ayak@gmail.com'.toLowerCase(),
            password: "12345"
        };
        const response = yield request.post('/user/login/')
            .send(service);
        expect(response.status).toBe(200);
    }));
    it('Delete user End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/user/2')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
