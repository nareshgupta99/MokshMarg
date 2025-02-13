const mongoose = require("mongoose");
const Booking = require("./Booking.model");

// Define the schema for HotelBooking
const hotelBookingSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },    // Reference to the Booking
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },        // Reference to the Hotel being booked
    checkIn: { type: Date, required: true },                      // Check-in date and time
    checkOut: { type: Date, required: true },                     // Check-out date and time
    roomType: { type: String, required: true },                   // Type of room being booked
    numberOfRooms: { type: Number, required: true, min: 1 },      // Number of rooms being booked
});

// Create a model for HotelBooking based on the schema
const HotelBooking = mongoose.model("HotelBooking", hotelBookingSchema);

// Export the HotelBooking model to be used in other parts of the app
module.exports = HotelBooking;
