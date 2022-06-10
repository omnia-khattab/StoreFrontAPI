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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const order_model = new order_1.OrderModel();
describe('Order Model', () => {
    it('Should have index method', () => {
        expect(order_model.index).toBeDefined();
    });
    it('Should have create method', () => {
        expect(order_model.create).toBeDefined();
    });
    it('Should have find method', () => {
        expect(order_model.find).toBeDefined();
    });
    it('Should have update method', () => {
        expect(order_model.update).toBeDefined();
    });
    it('Should have delete method', () => {
        expect(order_model.delete).toBeDefined();
    });
    it('Should have add order product method', () => {
        expect(order_model.addOrderProduct).toBeDefined();
    });
    it('Should have remove order product method', () => {
        expect(order_model.removeOrderProduct).toBeDefined();
    });
    it('Create Method should add new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.create({
            order_status: 'active',
            user_id: 1,
        });
        expect(result).toEqual({
            id: 1,
            order_status: 'active',
            user_id: '1',
        });
    }));
    it('Index Method should Get All orders in table ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.index();
        expect(result).toEqual([
            {
                id: 1,
                order_status: 'active',
                user_id: '1',
            },
        ]);
    }));
    it('Find Method should Get order with id=1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.find(1);
        expect(result).toEqual({
            id: 1,
            order_status: 'active',
            user_id: '1',
        });
    }));
    it('add products to order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.addOrderProduct(5, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            order_id: '1',
            product_id: '1',
        });
    }));
    it('update Method should update order_status with id=1 from active to closed updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.update(1, 'closed');
        expect(result).toEqual({
            id: 1,
            order_status: 'closed',
            user_id: '1',
        });
    }));
    it('get all completed orders ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.completedOrders();
        expect(result).toEqual([
            {
                id: 1,
                order_status: 'closed',
                user_id: '1',
            },
        ]);
    }));
    it('Delete order products whose Id=1 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_model.removeOrderProduct(1);
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            order_id: '1',
            product_id: '1',
        });
    }));
    /*it("Delete Method should Delete order with Id=1 ", async () => {
      await order_model.delete(1);
      const result = await order_model.index();
      expect(result).toEqual([]);
    });*/
});
