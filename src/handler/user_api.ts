import express, { Request, Response } from 'express';
import { User, UserModel } from '../model/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlwares/verifyToken';

const user_Model = new UserModel();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await user_Model.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const find = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const users = await user_Model.find(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  const u: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    user_role: req.body.user_role,
  };
  try {
    const newUser = await user_Model.create(u);
    const token = jwt.sign(
      { id: newUser.id, name: newUser.first_name, email: newUser.email },
      process.env.TOKEN_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  try {
    const user = await user_Model.update(id, first_name, last_name, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const password = req.body.password;

  try {
    const user = await user_Model.updatePassword(id, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

const delete_ = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const user = await user_Model.delete(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};
//login
const authenticate = async (req: Request, res: Response) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    const user = await user_Model.authenticate(email, password);

    if (user) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.TOKEN_SECRET as string,
        { expiresIn: '1h' }
      );
      //save token to user
      res.status(200).json({token});
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};
const USER_API = (app: express.Application) => {
  app.get('/users',index);
  app.get('/user/:id',find);
  app.post('/user/signup', create);
  app.post('/user/login/', authenticate);
  app.put('/user/update/:id', verifyAuthToken, update);
  app.put('/user/updatePassword/:id', verifyAuthToken, updatePassword);
  app.delete('/user/:id', verifyAuthToken, delete_);
};

export default USER_API;
