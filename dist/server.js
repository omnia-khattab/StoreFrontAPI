"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const category_api_1 = __importDefault(require("./handler/category_api"));
const order_api_1 = __importDefault(require("./handler/order_api"));
const product_api_1 = __importDefault(require("./handler/product_api"));
const user_api_1 = __importDefault(require("./handler/user_api"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (_req, res) => {
    res.send("hello");
});
(0, user_api_1.default)(app);
(0, category_api_1.default)(app);
(0, product_api_1.default)(app);
(0, order_api_1.default)(app);
app.listen(port, () => {
    console.log(`app start at http://localhost:${port}/`);
});
