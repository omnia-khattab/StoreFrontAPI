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
const product_1 = require("../product");
const product_model = new product_1.ProductModel();
describe('Product Model', () => {
    it('Should have index method', () => {
        expect(product_model.index).toBeDefined();
    });
    it('Should have create method', () => {
        expect(product_model.create).toBeDefined();
    });
    it('Should have find method', () => {
        expect(product_model.find).toBeDefined();
    });
    it('Should have update method', () => {
        expect(product_model.update).toBeDefined();
    });
    it('Should have delete method', () => {
        expect(product_model.delete).toBeDefined();
    });
    it('Should have Product by category method', () => {
        expect(product_model.ProductByCategory).toBeDefined();
    });
    it('Create Method should add new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_model.create({
            name: 'product',
            price: 150,
            pieces: 20,
            category_id: 1,
            user_id: 1,
        });
        expect(result).toEqual({
            id: 1,
            name: 'product',
            price: 150,
            pieces: 20,
            category_id: '1',
            user_id: '1',
        });
    }));
    it('Index Method should Get All products in table ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_model.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'product',
                price: 150,
                pieces: 20,
                category_id: '1',
                user_id: '1',
            },
        ]);
    }));
    it('Find Method should Get product with id=1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_model.find(1);
        expect(result).toEqual({
            id: 1,
            name: 'product',
            price: 150,
            pieces: 20,
            category_id: '1',
            user_id: '1',
        });
    }));
    it('Get Product by Category Id=1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_model.ProductByCategory(1);
        expect(result).toEqual({
            id: 1,
            name: 'product',
            price: 150,
            pieces: 20,
            category_id: '1',
            user_id: '1',
        });
    }));
    /*it("Get number of pieces of product with id=1", async () => {
      const result = await product_model.PiecesNo(1);
      
      expect(result).toEqual(20);
    });*/
    it('update Method should update product name to product updated , price to 100 , pieces to 3', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_model.update(1, 'product updated', 100, 3);
        expect(result).toEqual({
            id: 1,
            name: 'product updated',
            price: 100,
            pieces: 3,
            category_id: '1',
            user_id: '1',
        });
    }));
    /*it("Delete Method should Delete product with Id=1 ", async () => {
      product_model.delete(1);
      const result = await product_model.index();
      expect(result).toEqual([]);
    });*/
});
