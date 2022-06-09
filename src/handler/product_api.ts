import express,{Request,Response} from 'express';
import { Product,ProductModel } from '../model/product';

import verifyAuthToken from '../middlwares/verifyToken';

const product_Model=new ProductModel();

const index=async(_req: Request,res: Response)=>{
    try{
         const products= await product_Model.index();
        res.json(products);
    }
     catch(err){
        res.status(400).status(201).json({message:`${err}`});
    }
}

const find=async(req: Request,res: Response)=>{
    const id=parseInt(req.params.id)
    try{
         const product= await product_Model.find(id);
        res.status(201).json(product);
    }
     catch(err){
        res.status(400).json({message:`${err}`});
    }
}

const create=async(req: Request,res: Response)=>{

    const p:Product={
         name:req.body.name,
         price:req.body.price,
         pieces:req.body.pieces,
         category_id:req.body.category_id,
         user_id:req.body.user_id
    }
    try{
         const newProduct= await product_Model.create(p);
        res.status(201).json({newProduct});
    }
    
     catch(err){
        res.status(400).json({message:`${err}`});
    }
}

const update=async(req: Request,res: Response)=>{
    const id=parseInt(req.params.id);
    const name=req.body.name;
    const price=req.body.price;
    const pieces=req.body.pieces;
    try{
         const product= await product_Model.update(id,name,price,pieces);
        res.status(201).json(product);
    }
     catch(err){
        res.status(400).json({message:`${err}`});
    }
}


const delete_=async(req: Request,res: Response)=>{
    const id=parseInt(req.params.id);
    
    try{
         const product= await product_Model.delete(id);
        res.status(201).json(product);
    }
     catch(err){
        res.status(400).json({message:`${err}`});
    }
}

const ProductByCategory=async(req: Request,res: Response)=>{
    const id=parseInt(req.params.id)
    try{
         const product= await product_Model.ProductByCategory(id);
        res.status(201).json(product);
    }
     catch(err){
        res.status(400).json({message:`${err}`});
    }
}
/*const ProductPiecesNo=async(req: Request,res: Response)=>{
    const product_id=parseInt(req.params.id)
    try{
         const product= await product_Model.PiecesNo(product_id);
        res.status(201).json(product);
    }
     catch(err){
        res.status(400).json({message:`${err}`});
    }
}*/

const PRODUCT_API=(app:express.Application)=>{
    app.get('/products',verifyAuthToken,index);
    app.get('/product/:id',verifyAuthToken,find);
    app.get('/product/category/:id',verifyAuthToken,ProductByCategory);
    app.post('/product/create',verifyAuthToken,create);
    app.put('/product/update/:id',verifyAuthToken,update);
    app.delete('/product/:id',verifyAuthToken,delete_);
    //app.get('/product/:id/pieces',verifyAuthToken,ProductPiecesNo);
};

export default PRODUCT_API;