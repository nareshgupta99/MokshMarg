const mongoose = require("mongoose");

// Define the schema for Temple
const templeSchema = new mongoose.Schema({
    name: String,          // Name of the temple
    openTime: Date,        // Opening time of the temple
    closeTime: Date,       // Closing time of the temple
    description: String,   // Description of the temple
    longitude: Number,     // Longitude coordinate of the temple
    latitude: Number,      // Latitude coordinate of the temple
    link: String           // URL or link for additional information about the temple
});

// Create a model for Temple based on the schema
const Temple = mongoose.model("Temple", templeSchema);

// Export the Temple model to be used in other parts of the app
module.exports = Temple;
