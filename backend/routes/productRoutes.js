import express from "express"
import Product from "../models/productModel.js"
import { Products } from '../utils/MockData.js';
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router()


router.get('/', asyncHandler(async (req, res, next) =>{
    const products = await Product.find({})
    res.status(200).json(products)
}))   

router.get('/:id', asyncHandler(async (req, res, next) =>{
    const product = await Product.findById(req.params.id);
<<<<<<< HEAD
    if(product) return res.status(200).json(product)
        else{
    res.status(404);
    throw new Error ('This is no work')
        }
=======
    if(product) return res.status(200).json(product);
    res.status(404).json({message: 'Product Not Found!'})


>>>>>>> d563e6685718c79963f56ab4ea8195773f6962d0

}))

export default router;