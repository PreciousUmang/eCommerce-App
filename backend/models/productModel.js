import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    image : {
        type: String,
        required:true
    },
    brand : {
        type: String, 
        required:true
    },
    category:{
        required:true,
        type:String
    },
    reviews:[reviewSchema],
    rating:{
        type: Number,
        required:true,
        default:0
    },
    numReviews: {
        type: Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true
    }, 
    countInStock:{
        type: Number,
        default:0,
        required:true
    }
})