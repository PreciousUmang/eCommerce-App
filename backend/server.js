import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorhandler.js';

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express()

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
console.log(`Server is running on PORT ${port}.`)
})


