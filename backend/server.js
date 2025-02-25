import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorhandler.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
console.log(`Server is running on PORT ${port}.`)
})

