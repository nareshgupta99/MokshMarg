const mongoose = require("mongoose");
const Booking=require("./Booking.model");
const Guide=require("./Guide.model");


// Define the schema for GuideBooking
const guideBookingSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },    // Reference to the Booking
    guide_id: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },        // Reference to the Guide being booked
    languagePreference: { type: String, required: true },                                    // Preferred language for the guide
    duration: { type: Number, required: true, min: 1 },                                      // Duration of the guide service in hours
    tourDetails: { type: String, required: true },                                          // Details about the tour (e.g., locations, itinerary)
});

// Create a model for GuideBooking based on the schema
const GuideBooking = mongoose.model("GuideBooking", guideBookingSchema);

// Export the GuideBooking model to be used in other parts of the app
module.exports = GuideBooking;
