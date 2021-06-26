const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateToken = require('../utils/generateWebToken');

const userJSONFields = (user,shouldGenerateToken) => {
    let userObject = {
        _id:user._id,
        name:user.name,
        email:user.email
    }
    if(shouldGenerateToken){
        return {
            ...userObject,
            token:generateToken(user._id)
        }
    }else{
        return userObject;
    }
}

// Description
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    // check if the user is not null and password of the user is same as the entered password
    if(user && (await user.matchPassword(password))){
        // return the user object as json document
        res.json(userJSONFields(user,true));
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Description
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;
    // check if the user exists or not
    const userExists = await User.findOne({email});

    // if the user exists return and send error message
    if(userExists){
        res.status(400);
        throw new Error('User already exists here!');
    }

    // else create a new user
    const user = await User.create({name,email,password});
    if(user){
        // send the user object as json document
        res.status(201).json(userJSONFields(user,true));
    }else{
        res.status(400);
        // this will be called when user object data is invalid
        throw new Error('Invalid user data passed');
    }
});

module.exports = {
    authUser,
    registerUser
};