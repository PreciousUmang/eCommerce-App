import dotenv from 'dotenv';
import express from 'express';
import { Products } from './utils/MockData.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express()

app.listen(port, ()=>{
console.log(`Server is running on PORT ${port}.`)
})

app.get('/api/products', (req, res) =>{
    res.json(Products)
})

app.get('/api/products/:id', (req, res) =>{
    const product = Products.find((p) => p._id === parseInt(req.params.id))
    res.json(product)
})