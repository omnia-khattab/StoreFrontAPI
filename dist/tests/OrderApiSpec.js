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
describe('Orders End Point Test Response', () => {
    it('Get The all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders');
        expect(response.status).toBe(200);
    }));
    it('Get order By Id ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/order/1');
        expect(response.status).toBe(200);
    }));
    it('Create order ', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            order_status: "active",
            user_id: 1
        };
        const response = yield request.post('/order/create')
            .send(service)
            .set('Authorization', `Bearer ${token}`)
            .expect(201, {
            newOrder: {
                id: 2,
                order_status: 'active',
                user_id: '1',
            }
        });
        expect(response.status).toBe(201);
    }));
    it('add order product to cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            quantity: 2,
            product_id: 1
        };
        const response = yield request.post('/cart/orders/2/products')
            .send(service)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    }));
    it('remove order product from cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/cart/orders/2/products').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('Update order status ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/order/update/2')
            .send({ order_status: 'closed' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    }));
    it('get completed porducts End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders/completed');
        expect(response.status).toBe(200);
    }));
    it('Delete order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/order/2')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
