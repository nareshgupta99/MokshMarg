const mongoose = require("mongoose");

// Define the schema for Guide
const guideSchema = new mongoose.Schema({
    name: String,          // Name of the guide
    price: Number,         // Price for the guide service
    language: String,      // Language in which the guide can provide service
    availability: String   // Availability status (e.g., available, not available)
});

// Create a model for Guide based on the schema
const Guide = mongoose.model("Guide", guideSchema);

// Export the Guide model to be used in other parts of the app
module.exports = Guide;
