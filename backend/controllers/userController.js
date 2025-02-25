import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc    Authenticate User
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async(req, res)=>{
const { email, password } = req.body

const user = await User.findOne({email});
if(user && (await user.matchPassword(password))){

    const token = jwt.sign({
        userId: user._id}, 
        process.env.JWT_SECRET,
        {expiresIn: '30d'})

//  JWT as HTTP-only Cookie
res.cookie('jwt', token, {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    maxAge:30*24*60*60*1000 //30 Days to ms
})

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
} else {
    res.status(401);
    throw new Error('Invalid Email or Password')
}

})

// @desc    Register User
// @route   GET /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    res.send('Register User')
})

// @desc    Logout User / Clear Cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async(req, res)=>{
    res.send('LogOut')
})

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res)=>{
    res.send('GetUserProfile')
})

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res)=>{
    res.send('updateUserProfile')
})

// @desc    Get Users
// @route   PUT /api/users
// @access  Private/Admin
const getUsers= asyncHandler(async(req, res) =>{
    res.send('Get All Users')
})

// @desc    Get User by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID= asyncHandler(async(req, res) =>{
    res.send('Get User by ID')
})

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser= asyncHandler(async(req, res) =>{
    res.send('Delete User')
})


// @desc    Update User by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser= asyncHandler(async(req, res) =>{
    res.send('Update User')
})

export {
    authUser,
    registerUser,
    logoutUser, 
    getUserProfile, 
    getUserByID,
    getUsers,
    deleteUser,
    updateUser,
    updateUserProfile
}