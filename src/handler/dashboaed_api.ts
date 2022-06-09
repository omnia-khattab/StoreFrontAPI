import express,{Request,Response} from 'express';
import { dashboardQueries } from '../services/dashboard';

import verifyAuthToken from '../middlwares/verifyToken';

const dashboardQuert= new dashboardQueries()

const allOrders=async(_req: Request,res: Response)=>{
    try{
         const orders= await dashboardQuert.allOrders();
        res.json(orders);
    }
     catch(err){
        res.status(400).status(201).json({message:`${err}`});
    }
}

const productsInOrders=async(_req: Request,res: Response)=>{
    try{
         const orders= await dashboardQuert.productsInOrders();
        res.json(orders);
    }
     catch(err){
        res.status(400).status(201).json({message:`${err}`});
    }
}

const usersInOrders=async(_req: Request,res: Response)=>{
    try{
         const users= await dashboardQuert.usersInOrders();
        res.json(users);
    }
     catch(err){
        res.status(400).status(201).json({message:`${err}`});
    }
}

const popularProducts=async(_req: Request,res: Response)=>{
    try{
         const products= await dashboardQuert.popularProducts();
        res.json(products);
    }
     catch(err){
        res.status(400).status(201).json({message:`${err}`});
    }
}

const dashboard_API=(app:express.Application)=>{
    app.get('/dasboard/all/orders',verifyAuthToken,allOrders);
    app.get('/dasboard/products',verifyAuthToken,productsInOrders);
    app.get('/dashboard/users',verifyAuthToken,usersInOrders);
    app.get('/dashboard/topProducts',verifyAuthToken,popularProducts);
};

export default dashboard_API;