const mongoose = require("mongoose");

// Define the schema for Hotel
const hotelSchema = new mongoose.Schema({
    type: String,          // Type of the hotel (e.g., budget, luxury)
    price: Number,         // Price of the hotel (per night or type of room)
    checkIn: String,         // Check-in date and time
    checkOut: Date,        // Check-out date and time
    availability: String ,
    name:String,  // Availability status (e.g., available, booked)
});

// Create a model for Hotel based on the schema
const Hotel = mongoose.model("Hotel", hotelSchema);

// Export the Hotel model to be used in other parts of the app
module.exports = Hotel;
