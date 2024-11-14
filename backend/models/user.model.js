import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name :String,
    address:String,
    email:String,
    phone:String,
    Password:String,
});

export const User = mongoose.model("User",userSchema )