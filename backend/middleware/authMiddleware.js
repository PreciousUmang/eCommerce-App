import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js"
import User from "../models/userModel.js"

// Protected Routes
export const protect = asyncHandler(async(req, res, next)=>{
    let token;
    // Reading JWT from Cookie
    token  = req.cookies.jwt;
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user =  await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Unauthorized, Token Error')
            console.log(error)
        }
    } else { 
        res.status(401);
        throw new Error('Unauthorized, No Token')
    }
})


export const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401)
        throw new Error('Not Authorized as Admin')
    }
}