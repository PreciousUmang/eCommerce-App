import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
<<<<<<< HEAD
     user :{
=======
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    user :{
>>>>>>> d563e6685718c79963f56ab4ea8195773f6962d0
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    name:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    Comment:{
        type: String,
        required:true
    }
} ,{
    timestamps:true
}
)

const productSchema = mongoose.Schema({
    user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : "User"
    },
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
},
{timestamps: true})

const Product = mongoose.model("Product", productSchema);

export default Product;