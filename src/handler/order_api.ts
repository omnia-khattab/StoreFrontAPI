import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../model/order';

import verifyAuthToken from '../middlwares/verifyToken';

const order_Model = new OrderModel();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await order_Model.index();
    res.json(orders);
  } catch (err) {
    res
      .status(400)
      .status(201)
      .json({ message: `${err}` });
  }
};

const find = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const order = await order_Model.find(id);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  const o: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id,
  };
  try {
    const newOrder = await order_Model.create(o);
    res.status(201).json({ newOrder });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const order_status = req.body.order_status;
  try {
    const order = await order_Model.update(id, order_status);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const delete_ = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const order = await order_Model.delete(id);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const quantity: number = parseInt(req.body.quantity as string);
    const order_id: number = parseInt(req.params.id);
    const product_id: number = parseInt(req.body.product_id);

    const order = await order_Model.addOrderProduct(
      quantity,
      order_id,
      product_id
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  try {
    const deleted = await order_Model.removeOrderProduct(
      parseInt(req.params.id)
    );

    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const completedOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await order_Model.completedOrders();
    res.json(orders);
  } catch (err) {
    res
      .status(400)
      .status(201)
      .json({ message: `${err}` });
  }
};
const ORDER_API = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/order/:id', verifyAuthToken, find);
  app.post('/order/create', verifyAuthToken, create);
  app.put('/order/update/:id', verifyAuthToken, update);
  app.delete('/order/:id', verifyAuthToken, delete_);
  app.post('/orders/:id/products', verifyAuthToken, addToCart);
  app.delete('/orders/:id/products', verifyAuthToken, removeFromCart);
  app.get('/orders/completed', verifyAuthToken, completedOrders);
};

export default ORDER_API;
