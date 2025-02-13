const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const LOOGED_USER=require("../config/security.config");

dotenv.config();
const userSchema = new mongoose.Schema({
    firstName: {
        type: String, require: true
    },
    lastName: {
        type: String, require: true
    },
    address: {
        type: String
    },
    email: {
        type: String, require: true, unique: true
    },
    phone: {
        type: String, require: true, unique: true
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
    otpForMbile: {
        type: Number, require: false
    },
    otpForEmail: {
        type: Number, require: false
    },
    expiryTimeForMobileOtp: {
        type: Date, require: false
    },
    expiryTimeForEmailOtp: {
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