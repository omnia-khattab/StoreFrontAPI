"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var category_api_1 = __importDefault(require("./handler/category_api"));
var dashboaed_api_1 = __importDefault(require("./handler/dashboaed_api"));
var order_api_1 = __importDefault(require("./handler/order_api"));
var product_api_1 = __importDefault(require("./handler/product_api"));
var user_api_1 = __importDefault(require("./handler/user_api"));
var app = (0, express_1["default"])();
var port = 3000;
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.get('/', function (_req, res) {
    res.send('hello');
});
(0, user_api_1["default"])(app);
(0, category_api_1["default"])(app);
(0, product_api_1["default"])(app);
(0, order_api_1["default"])(app);
(0, dashboaed_api_1["default"])(app);
app.listen(port, function () {
    console.log("app start at http://localhost:".concat(port, "/"));
});
