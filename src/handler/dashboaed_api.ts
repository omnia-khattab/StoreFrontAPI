import express, { Request, Response } from 'express';
import { dashboardQueries } from '../services/dashboard';

import verifyAuthToken from '../middlwares/verifyToken';

const dashboardQuert = new dashboardQueries();

const allOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await dashboardQuert.allOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await dashboardQuert.productsInOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const usersInOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboardQuert.usersInOrders();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const popularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboardQuert.popularProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const dashboard_API = (app: express.Application) => {
  app.get('/dasboard/all/orders',  allOrders);
  app.get('/dasboard/products', productsInOrders);
  app.get('/dashboard/users',  usersInOrders);
  app.get('/dashboard/topProducts', popularProducts);
};

export default dashboard_API;
