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
const user_1 = require("../user");
//import jwt from 'jsonwebtoken';
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model = new user_1.UserModel();
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
const passHash = bcrypt_1.default.hashSync("1234" + pepper, parseInt(saltRounds));
describe("User Model", () => {
    it("Should have index method", () => {
        expect(user_model.index).toBeDefined();
    });
    it("Should have create method", () => {
        expect(user_model.create).toBeDefined();
    });
    it("Should have find method", () => {
        expect(user_model.find).toBeDefined();
    });
    it("Should have update method", () => {
        expect(user_model.update).toBeDefined();
    });
    it("Should have update password method", () => {
        expect(user_model.updatePassword).toBeDefined();
    });
    it("Should have authenticate method", () => {
        expect(user_model.authenticate).toBeDefined();
    });
    it("Should have delete method", () => {
        expect(user_model.delete).toBeDefined();
    });
    it("Create Method should add new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model.create({
            first_name: "omnia",
            last_name: "mohamed",
            email: "omnia@gmail.com",
            password: "1234",
            user_role: "user",
        });
        result.password = passHash;
        //const token=jwt.sign({id:result.id,name:result.first_name,email:result.email},process.env.TOKEN_SECRET as string,{expiresIn:"1h"});
        expect(result).toEqual({
            id: 1,
            first_name: "omnia",
            last_name: "mohamed",
            email: "omnia@gmail.com",
            password: `${passHash}`,
            user_role: "user",
        });
    }));
    it("Index Method should Get All users in table ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model.index();
        result[0].password = passHash;
        expect(result).toEqual([
            {
                id: 1,
                first_name: "omnia",
                last_name: "mohamed",
                email: "omnia@gmail.com",
                password: `${passHash}`,
                user_role: "user",
            },
        ]);
    }));
    it("Find Method should Get user with id=1", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model.find(1);
        result.password = passHash;
        expect(result).toEqual({
            id: 1,
            first_name: "omnia",
            last_name: "mohamed",
            email: "omnia@gmail.com",
            password: `${passHash}`,
            user_role: "user",
        });
    }));
    it("authenticate Method should dind user email and password to login", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model.authenticate("omnia@gmail.com", "1234");
        if (result) {
            result.password = passHash;
        }
        expect(result).toEqual({
            id: 1,
            first_name: "omnia",
            last_name: "mohamed",
            email: "omnia@gmail.com",
            password: `${passHash}`,
            user_role: "user",
        });
    }));
    it("update Method should update user name to omniak", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model.update(1, "omniak", "mohamed", "omnia@gmail.com");
        result.password = passHash;
        expect(result).toEqual({
            id: 1,
            first_name: "omniak",
            last_name: "mohamed",
            email: "omnia@gmail.com",
            password: `${passHash}`,
            user_role: "user",
        });
    }));
    const passHash2 = bcrypt_1.default.hashSync("12345" + pepper, parseInt(saltRounds));
    it("update Method should update user password", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model.updatePassword(1, "12345");
        result.password = passHash2;
        expect(result).toEqual({
            id: 1,
            first_name: "omniak",
            last_name: "mohamed",
            email: "omnia@gmail.com",
            password: `${passHash2}`,
            user_role: "user",
        });
    }));
    /*it("Delete Method should Delete user with Id=1 ", async () => {
      await user_model.delete(1);
      const result = await user_model.index();
  
      expect(result).toEqual([]);
  
    });*/
});
