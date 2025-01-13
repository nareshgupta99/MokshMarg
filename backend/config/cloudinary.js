// cloudinary.js
const cloudinary = require('cloudinary').v2;
const dotenv=require("dotenv");
dotenv.config();

const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET
const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,  // Replace with your Cloudinary cloud name
    api_key: CLOUDINARY_API_KEY,        // Replace with your Cloudinary API key
    api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
