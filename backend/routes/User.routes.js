const express = require("express");
const routes = express.Router();
const { isAuthenticated } = require("../config/security.config");
const { updatePassword, registerUser, login,genratePasswordResetToken,resetPassword }=require("../controllers/user.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");



// to creating a user
routes.post("/signup",asyncErrorHandler(registerUser));

// login api
routes.post("/login", asyncErrorHandler(login));

//update password
routes.put('/update-password', isAuthenticated,asyncErrorHandler(updatePassword));

//forgot password
routes.post("/forgot",asyncErrorHandler(genratePasswordResetToken));

routes.post("/reset-password",asyncErrorHandler(resetPassword));

routes.get("/email-verify");




module.exports = routes;