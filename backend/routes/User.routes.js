const express = require("express");
const routes = express.Router();
const { isAuthenticated } = require("../config/security.config");
const { updatePassword, registerUser, login,resetPassword ,updateProfileAvtar}=require("../controllers/user.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");
const upload=require("../middleware/multer.config")
const User=require("../models/user.model");




// to creating a user
routes.post("/signup",asyncErrorHandler(registerUser));

// login api
routes.post("/login", asyncErrorHandler(login));

//update password
routes.put('/update-password', isAuthenticated,asyncErrorHandler(updatePassword));

//forgot password
// routes.post("/forgot",asyncErrorHandler(s));

routes.post("/reset-password",asyncErrorHandler(resetPassword));

routes.put("/update-profile",asyncErrorHandler());

routes.put("/update-profile-avatar",asyncErrorHandler(isAuthenticated),asyncErrorHandler(upload.single('file')),asyncErrorHandler(updateProfileAvtar));

routes.post("/generate-otp-mobile",asyncErrorHandler());

routes.post("/generate-otp-email",asyncErrorHandler());

routes.post("/verify-mobile",asyncErrorHandler());

routes.post("/verify-email",asyncErrorHandler());










module.exports = routes;