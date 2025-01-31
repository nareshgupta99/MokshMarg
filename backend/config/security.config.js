const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

dotenv.config();

async function isAuthenticated(req, res, next) {
  let token = req.headers.authorization;

  // check for token is empty or not
  if (!token) {
    res.status(401).json({
      message: "you are not login"
    })
  }
  token = token.split('Bearer')[1].trim();
  const secret = process.env.ACCESS_TOKEN_SECRET;

  const decoded = await jwt.verify(token, secret);

  let { exp } = decoded;
  if (Date.now() < exp) {
    res.status(401).json({
      message: "Session Time Out Login Again To Continue"
    })
  }
  if (LOOGED_USER == null) {
    LOOGED_USER = decoded;
  }
  next();


}





module.exports = { isAuthenticated };