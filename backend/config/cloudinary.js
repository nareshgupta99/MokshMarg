// cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnkci1bpn',  // Replace with your Cloudinary cloud name
    api_key: '115195227181423',        // Replace with your Cloudinary API key
    api_secret: 'tUaTGjau0rIZlQB3UV56AyQSz2I',
});

module.exports = cloudinary;

// CLOUDINARY_API_KEY="115195227181423"
// CLOUDINARY_API_SECRET="tUaTGjau0rIZlQB3UV56AyQSz2I"
// CLOUDINARY_CLOUD_NAME="dnkci1bpn"