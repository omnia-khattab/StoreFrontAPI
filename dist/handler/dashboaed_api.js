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
const dashboard_1 = require("../services/dashboard");
const dashboardQuert = new dashboard_1.dashboardQueries();
const allOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield dashboardQuert.allOrders();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const productsInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield dashboardQuert.productsInOrders();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const usersInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dashboardQuert.usersInOrders();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const popularProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield dashboardQuert.popularProducts();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({ message: `${err}` });
    }
});
const dashboard_API = (app) => {
    app.get('/dasboard/all/orders', allOrders);
    app.get('/dasboard/products', productsInOrders);
    app.get('/dashboard/users', usersInOrders);
    app.get('/dashboard/topProducts', popularProducts);
};
exports.default = dashboard_API;
