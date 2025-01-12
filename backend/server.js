import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
<<<<<<< HEAD
import { errorHandler, notFound } from './middleware/errorhandler.js';
=======
>>>>>>> d563e6685718c79963f56ab4ea8195773f6962d0

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

<<<<<<< HEAD

=======
app.use('/api/products', productRoutes)
>>>>>>> d563e6685718c79963f56ab4ea8195773f6962d0
