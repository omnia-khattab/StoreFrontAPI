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
const category_1 = require("../category");
const category_model = new category_1.CategoryModel();
console.log("Environment from Spec is" + process.env.ENV);
describe("Category Model", () => {
    it("Should have index method", () => {
        expect(category_model.index).toBeDefined();
    });
    it("Should have create method", () => {
        expect(category_model.create).toBeDefined();
    });
    it("Should have find method", () => {
        expect(category_model.find).toBeDefined();
    });
    it("Should have update method", () => {
        expect(category_model.update).toBeDefined();
    });
    it("Should have delete method", () => {
        expect(category_model.delete).toBeDefined();
    });
    it("Create Method should add new Category", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield category_model.create({
            name: "category1",
        });
        expect(result).toEqual({
            id: 1,
            name: "category1",
        });
    }));
    it("Index Method should Get All categories in table ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield category_model.index();
        expect(result).toEqual([
            {
                id: 1,
                name: "category1",
            },
        ]);
    }));
    it("Find Method should Get category with id=1", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield category_model.find(1);
        expect(result).toEqual({
            id: 1,
            name: "category1",
        });
    }));
    it("update Method should update category with id=1 from category1 to Category updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield category_model.update(1, "Category updated");
        expect(result).toEqual({
            id: 1,
            name: "Category updated",
        });
    }));
    /*it("Delete Method should Delete Category with Id=1 ", async () => {
      await category_model.delete(1);
      const result = await category_model.index();
      expect(result).toEqual([]);
    });*/
});
