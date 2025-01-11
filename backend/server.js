import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express()

app.listen(port, ()=>{
console.log(`Server is running on PORT ${port}.`)
})

app.use('/api/products', productRoutes)
