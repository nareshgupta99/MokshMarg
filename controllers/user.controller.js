const { genrateJwtToken, LOOGED_USER } = require("../config/security.config");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const emailSend = require('../config/email.config')
const User = require("../models/user.model")
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");
const fs = require('fs');
const path = require('path');
const cloudinary=require("../utils/Cloudinary")


dotenv.config();

const registerUser = asyncErrorHandler(async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;
    if (password != confirmPassword) {
        throw new ApiError(401, "password and confirm password must be match");
    }

    const user = await User.findOne({ email: email.trim() });
    if (user) {
        throw new ApiError(200, "user already registerd");
    }

    const savedUser = await User.create({
        email: email.trim(),
        password: password.trim(),
        name: name.trim()
    });

    const token = await savedUser.genrateAccessToken()

    res.status(201).json({
        token: token,
        message: "user is successfully registered",
    });
})


const login = (async (req, res) => {
    const { password, email } = req.body;
    const [user] = await User.find({ email });

    if (!user) {
        throw new ApiError(401, "user not registered");
    }
    const result = await bcrypt.compare(password, user?.password);
    if (result) {
        const token = await user.genrateAccessToken();
        res.status(200).json({
            message: "login successfull",
            token: token
        });
    } else {
        throw new ApiError(400, "user id and password is wrong");
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
            message: "token is expire"
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

const updateUserDetails = (async (req, res) => {


})

const genrateOtpForEmail = (async (req, res) => {

})

const genrateOtpForMobile = (async (req, res) => {

})

const verifyOtpForEmail = (async (req, res) => {

})

const verifyOtpForMobile = (async (req, res) => {

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

module.exports = { updatePassword, registerUser, login, resetPassword, updateUserDetails, genrateOtpForEmail, genrateOtpForMobile, verifyOtpForEmail, verifyOtpForMobile, updateProfileAvtar }