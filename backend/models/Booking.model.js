const mongoose = require("mongoose");
const User=require("./user.model");
const Guide=require("./Guide.model");
const Hotel=require("./Hotel.model");
// Define the schema for Booking
const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },      // Reference to the User who made the booking
    booking_date: { type: Date, required: true },                        // Date and time of the booking
    bookingType: { type: String, required: true },                       // Type of booking (e.g., hotel, guide)
    paymentType: { type: Number, required: true },                       // Payment method type (e.g., credit card, cash)
    paymentReceipt: { type: String, required: true },                    // Path or ID for payment receipt
    paymentStatus: { type: Boolean, required: true },                    // Boolean to indicate if payment was successful
    guideId: { type: mongoose.Schema.Types.ObjectId, ref: "Guide" },    // Reference to the Guide, if the booking is for a guide
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },    // Reference to the Hotel, if the booking is for a hotel
});

// Create a model for Booking based on the schema
const Booking = mongoose.model("Booking", bookingSchema);

// Export the Booking model to be used in other parts of the app
module.exports = Booking;
