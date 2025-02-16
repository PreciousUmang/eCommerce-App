import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import { Products } from "./utils/MockData.js";
import User from "./models/userModel.js"
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'

dotenv.config();
connectDB();

const importData = async() =>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = Products.map(p => {
            return {...p, user: adminUser}
        })
        await Product.insertMany(sampleProducts);

        console.log(`Data Imported`.green.inverse)
        process.exit()
    } catch(err){
        console.error(`Error :${err.message}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() =>{
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}