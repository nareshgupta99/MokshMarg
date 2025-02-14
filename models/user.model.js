const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const LOOGED_USER=require("../config/security.config");

dotenv.config();
const userSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    address: {
        type: String
    },
    email: {
        type: String, require: true, unique: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String, require: true, min: 18
    },
    phoneVerified: {
        type: Boolean, default: false
    },
    emailVerified: {
        type: Boolean, default: false
    },
    otp:{
        type: Number, require: false
    },
    otpType:{
        type:String
    },
    otpExpiry: {
        type: Date, require: false
    },
    avtar: {
        type: String, require: false
    }
});

userSchema.pre("save", async function (next) {
    console.log("i am in pree starting")
    if (!this.isModified("password")) return next();
    console.log("i am in pree middle")
    this.password = await bcrypt.hash(this.password, 10);

    next();
})

userSchema.methods.genrateAccessToken = async function () {
    const token = await jwt.sign({
        _id: this.id,
        name: this.name,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
   
    return token;
}

userSchema.methods.genrateRefreshToken = async function () {
    return await jwt.sign({
        _id: this.id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
}




const User = mongoose.model("User", userSchema);
module.exports = User;