const { genrateJwtToken, encryptPassword, getDecodedToken } = require("../config/security.config");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const crypto = require('crypto');
const emailSend = require('../config/email.config')
const User=require("../models/user.model") 
const ApiError=require("../utils/ApiError")



dotenv.config();

const updatePassword = (async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { email } = getDecodedToken();
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        res.status(500).json({ error: "Internal server error " });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (isMatch) {
        const newHashedPassword = await encryptPassword(newPassword);
        user.password = newHashedPassword;
        await user.save();
        res.status(200).json({ message: "Password updated sucessfully" });

    } else {
        res.status(400).json({ error: "wrong  current password " })
    }
})

const registerUser  = (async (req, res)  => {
    const {email,password,confirmPassword,name} = req.body;
    if(password != confirmPassword){
        throw new ApiError(401,"password and confirm password must be match");
    }
        const hash = await encryptPassword(password);
    
        const user=await User.findOne({email});
        if(user){
            throw new ApiError(401,"user already registerd");
        }
   
        const savedUser = await User.create({
            email,
            password:hash,
            name
        });
        const token = await genrateJwtToken({
            email
        });
    res.status(200).json({
        token: token,
        message: "user is successfully registered",
    });
})


const login = (async (req, res) => {
    const { password, email } = req.body;
    const [user] = await User.find({ email });
    if(!user){
       throw new ApiError(401,"user not registered");
    }
    const result = await bcrypt.compare(password, user?.password);
    if (result) {
        const token = await genrateJwtToken({ email });
        res.status(200).json({
            message: "login successfull",
            token: token
        });
    } else {
        throw new ApiError( 400,"user id and password is wrong" );
    }
})

const genratePasswordResetToken = (async (req, res) => {
    const { email } = req.body;
    const [user] = await User.find({ email });
    if (!user) {
        res.status(401).json({
            message: "user email not valid"
        })
    }
    const str = crypto.randomBytes(32).toString('hex'); 
       // Create a hash using SHA-256
    const hash = crypto.createHash('sha256').update(str).digest('hex');
    const {origin}=req.headers;
    console.log(req)
    const url=`${origin}/auth/reset-password/${hash}`;
    // calculating expiry time
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 30 * 60000);
    

    //saving into db
    user.passwordResetToken=hash;
    user.passwordResetTokenExpiry= expiryTime;
    await user.save();

    //send mail
    await emailSend({ from: "jainnaresh1998@gmail.com", to: email, subject: "request for password reset", text: url });

    // user.passwordResetToken=
    res.status(200).send({
        message: "email is send"
    })
})

const resetPassword= (async (req,res)=>{
    if(password != confirmPassword){
        throw new ApiError(401,"password and confirm password must be match");
    }
    const {password,confirmPassword,resetToken}=req.body;
    if(!user){
        res.status(401).json({
            message:"token is not valid"
        })
        return;
    }
    const {passwordResetTokenExpiry}=user;
    const now = new Date();
    const currentTime = new Date(now.getTime());
    console.log(currentTime)
    if(currentTime > passwordResetTokenExpiry){

        res.status(401).json({
            message:"token is expire"
        })
        return;
    }
    const hash = await encryptPassword(password);
    user.password = hash;
    await user.save();

    res.status(200).json({
        message:"password changed successfully"
    })
})

const emailVerify = (async (req,res)=>{
    
})


module.exports = { updatePassword, registerUser, login, genratePasswordResetToken,resetPassword }