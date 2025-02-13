const { genrateJwtToken, LOOGED_USER } = require("../config/security.config");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const emailSend = require('../config/email.config')
const User = require("../models/user.model")
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");
const fs = require('fs');
const path = require('path');
const cloudinary=require("../utils/Cloudinary");
const { fail } = require("assert");


dotenv.config();

const registerUser = asyncErrorHandler(async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;
    if (password != confirmPassword) {
        throw new ApiError("fail",401, "password and confirm password must be match");
    }

    const user = await User.findOne({ email: email.trim() });
    if (user) {
        throw new ApiError("fail",200, "user already registerd");
    }

    const otp=Math.ceil(Math.random()*10000);
    const expiryTime = new Date(new Date().getTime() + 3 * 60 * 1000);
    console.log(otp);

    const savedUser = await User.create({
        email: email.trim(),
        password: password.trim(),
        name: name.trim(),
        otp:otp,
        type:"email_verify",
        otpExpiry:expiryTime
    });

   await emailSend({to:email,subject:"verify email",text:`your one time otp is ${otp}`});


    res.status(201).json({
        status:"success",
        message: "user is successfully registered and otp sent to your email please verify email to enter otp.",
    });
})


const login = (async (req, res) => {
    const { password, email } = req.body;
    const [user] = await User.find({ email });

    if (!user) {
        throw new ApiError("fail",401, "user not registered");
    }
    const result = await bcrypt.compare(password, user?.password);
    
    if(!result) {
        throw new ApiError("fail",400, "user id and password is wrong");
    }
    const {emailVerified}=user;
    if(!emailVerified){
        const otp=Math.ceil(Math.random()*10000);
        const expiryTime = new Date(new Date().getTime() + 3 * 60 * 1000);
        user.otp=otp;
        user.otpExpiry=expiryTime;
        user.save();   
       await emailSend({to:email,subject:"verify email",text:`your one time otp is ${otp}`});
        res.status(201).json({
            status:"success",
            message: "email is not verified otp sent to your email please verify email first.",
        });
    }else {
        const token = await user.genrateAccessToken();
        res.status(200).json({
            status:"success",
            message: "login successfull",
            token: token
        });
    }
     
})

const updatePassword = (async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { email } = getDecodedToken();
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (isMatch) {
        // const newHashedPassword = await encryptPassword(newPassword);
        // user.password = newHashedPassword;
        await user.save();
        res.status(200).json({ message: "Password updated sucessfully" });

    } else {
        throw new ApiError(401, "current password is wrong");
    }
})

const resetPassword = (async (req, res) => {
    if (password != confirmPassword) {
        throw new ApiError(401, "password and confirm password must be match");
    }
    const { password, confirmPassword, resetToken } = req.body;
    if (!user) {
        res.status(401).json({
            message: "token is not valid"
        })
        return;
    }
    const { passwordResetTokenExpiry } = user;
    const now = new Date();
    const currentTime = new Date(now.getTime());
    console.log(currentTime)
    if (currentTime > passwordResetTokenExpiry) {

        res.status(401).json({
            message: "token is expired"
        })
        return;
    }
    const hash = await encryptPassword(password);
    user.password = hash;
    await user.save();

    res.status(200).json({
        message: "password changed successfully"
    })
})


const verifyOtp = (async (req, res) => {
    const {type,email,otp}=req.body;
    const user=await User.findOne({email});
    const {otpExpiry}=user;
    if(user.emailVerified){
        res.status(200).json({
            status:"success",
            message: "email already verify",
          
        });
    }
    else if(otpExpiry < Date.now()){
        throw new ApiError("fail",400,"otp expired click here to generate new otp");
    }
   else if(otp != user.otp){
        throw new ApiError("fail",400," Wrong otp! otp not Match");
    }
    else{
        user.emailVerified=true;
        user.save();
        res.status(200).json({
            status:"success",
            message: "email verified",
          
        });
    }

})

const updateProfileAvtar = (async (req, res) => {
    
    if(!req.file){
        throw new ApiError(400,"no file found")
    }
    
    const uploadedFilePath=path.join(req.file.destination,req.file.filename);

    const result=await cloudinary.uploader.upload(uploadedFilePath);
    fs.unlink(uploadedFilePath,(err)=>{
        if(err) throw new ApiError(err.code,err.message);
    });
    
    console.log(user)
    console.log(result.secure_url);
    console.log(result.public_id);
    // cloudinary.uploader.destroy(publicId, function(result) {
    //     console.log(result);
    //   });

    res.status(200).send({ message: "uploade success" })

})

const generateOtp=(async (req,res)=>{
   const {email}=req.body;
    const otp=Math.ceil(Math.random()*10000);
    const expiryTime = new Date(new Date().getTime() + 3 * 60 * 1000);
    const user=await User.findOne({email});
    user.otp=otp;
    user.otpExpiry=expiryTime;
    user.save()
    await emailSend({to:email,subject:"verify email",text:`your one time otp is ${otp}`});
    res.status(200).json({
        status:"success",
        message:"otp generated and sent to your registererd email",
    })

})

module.exports = { updatePassword, registerUser, login, resetPassword, verifyOtp, updateProfileAvtar,generateOtp }