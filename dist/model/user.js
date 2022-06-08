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
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                const users = result.rows;
                conn.release();
                return users;
            }
            catch (err) {
                throw new Error(`Can't get all users. Error: ${err}`);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Couldn't find user ${id}. Error: ${err}`);
            }
        });
    }
    create(U) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = process.env.SALT_ROUNDS;
            const pepper = process.env.BCRYPT_PASSWORD;
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (first_name,last_name,email,password,user_role) VALUES ($1,$2,$3,$4,$5) RETURNING *';
                const passHash = bcrypt_1.default.hashSync(U.password + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [U.first_name, U.last_name, U.email, passHash, U.user_role]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Couldn't Create user ${U.first_name}. Error: ${err}`);
            }
        });
    }
    update(id, first_name, last_name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET first_name=$2,last_name=$3,email=$4 WHERE id=$1 RETURNING *';
                const result = yield conn.query(sql, [id, first_name, last_name, email]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Couldn't update user ${first_name}. Error: ${err}`);
            }
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = process.env.SALT_ROUNDS;
            const pepper = process.env.BCRYPT_PASSWORD;
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET password=$2 WHERE id=($1) RETURNING *';
                const passHash = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [id, passHash]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Couldn't update user ${id} password. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                const DeletedUser = result.rows[0];
                conn.release();
                return DeletedUser;
            }
            catch (err) {
                throw new Error(`Couldn't delete user ${id}. Error: ${err}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pepper = process.env.BCRYPT_PASSWORD;
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM users WHERE email=($1)";
            const result = yield conn.query(sql, [email]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
                else {
                    throw new Error(`password is not correct`);
                }
            }
            else {
                throw new Error(`email is not correct`);
            }
        });
    }
}
exports.UserModel = UserModel;
