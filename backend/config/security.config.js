const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

let decodedToken = ""
const genrateJwtToken = async (payload) => {

  const expiry = process.env.EXPIRY_TIME;
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  return token;
}


function verifyToken(token) {
  token = token.split('Bearer')[1].trim();
  const secret = process.env.SECRET;
  var decoded = jwt.verify(token, secret);
  return decoded;
}





// function to hash a password

const encryptPassword = async function (password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}



async function isAuthenticated(req, res, next) {
  try {

    let token = req.headers.authorization;

    // check for token is empty or not
    if (!token) {
      res.status(401).json({
        message: "you are not login"
      })
    }
    decodedToken = verifyToken(token);
    let { exp } = decodedToken;
    if (Date.now() < exp) {
      res.status(401).json({
        message: "Session Time Out Login Again To Continue"
      })
    }
    next();
  } catch (err) {

  }

}



function getDecodedToken() {
  return decodedToken;
}

const isAuthorisedToRestaurant=async ()=>{
  
  const {email}=getDecodedToken();
  

}



module.exports = { genrateJwtToken, verifyToken, encryptPassword, isAuthenticated, getDecodedToken }