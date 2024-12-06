const mongoose = require("mongoose");
const User=require("./user.model");
const Hotel=require("./Hotel.model");

// Define the schema for HotelOwner
const hotelOwnerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to the User who owns the hotel
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true }, // Reference to the Hotel owned
    ownershipDate: { type: Date, required: true }, // The date when the ownership was established
});

// Create a model for HotelOwner based on the schema
const HotelOwner = mongoose.model("HotelOwner", hotelOwnerSchema);

// Export the HotelOwner model to be used in other parts of the app
module.exports = HotelOwner;
