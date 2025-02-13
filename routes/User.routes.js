const express = require("express");
const routes = express.Router();
const { isAuthenticated } = require("../config/security.config");
const { updatePassword, registerUser, login,resetPassword ,updateProfileAvtar, generateOtp, verifyOtp}=require("../controllers/user.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");
const upload=require("../middleware/multer.config")
const User=require("../models/user.model");




// to creating a user
routes.post("/signup",asyncErrorHandler(registerUser));

// login api
routes.post("/login", asyncErrorHandler(login));

//update password
routes.put('/update-password', isAuthenticated,asyncErrorHandler(updatePassword));

routes.post("/reset-password",asyncErrorHandler(resetPassword));

routes.put("/update-profile-avatar",asyncErrorHandler(isAuthenticated),asyncErrorHandler(upload.single('file')),asyncErrorHandler(updateProfileAvtar));

routes.post("/generateOtp",asyncErrorHandler(generateOtp));

routes.post("/verifyOtp",asyncErrorHandler(verifyOtp));










module.exports = routes;