const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    address: {
        type: String
    },
    email: {
        type: String, require: true,unique:true
    },
    phone: {
        type: String, require: true
    },
    password: {
        type: String, require: true, min: 18
    },
    isPhoneVerified: {
        type: Boolean, default: false
    },
    isEmailVerified: {
        type: Boolean, default: false
    },
    otp: {
        type: Number, require: false
    },
    expiryTime:{
        type:Date,require:false
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;