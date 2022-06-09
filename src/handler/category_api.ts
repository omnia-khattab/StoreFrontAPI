import express, { Request, Response } from 'express';
import { Category, CategoryModel } from '../model/category';

import verifyAuthToken from '../middlwares/verifyToken';

const category_Model = new CategoryModel();

const index = async (_req: Request, res: Response) => {
  try {
    const categories = await category_Model.index();
    res.json(categories);
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
    const categories = await category_Model.find(id);
    res.status(201).json(categories);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  const c: Category = {
    name: req.body.name,
  };
  try {
    const newCategory = await category_Model.create(c);
    res.status(201).json({ newCategory });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  try {
    const category = await category_Model.update(id, name);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const delete_ = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const category = await category_Model.delete(id);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const CATEGORY_API = (app: express.Application) => {
  app.get('/categories', verifyAuthToken, index);
  app.get('/category/:id', verifyAuthToken, find);
  app.post('/category/create', verifyAuthToken, create);
  app.put('/category/update/:id', verifyAuthToken, update);
  app.delete('/category/:id', verifyAuthToken, delete_);
};

export default CATEGORY_API;
