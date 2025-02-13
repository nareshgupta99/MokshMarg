const mongoose = require("mongoose");

// Define the schema for Temple
const templeSchema = new mongoose.Schema({
    name: String,          // Name of the temple
    openTime: {
        type:Date,require:false
    },        // Opening time of the temple
    closeTime:{
        type:Date,require:false
    },       // Closing time of the temple
    description: String,   // Description of the temple
    longitude: String,     // Longitude coordinate of the temple
    latitude: String,      // Latitude coordinate of the temple
    link: String           // URL or link for additional information about the temple
});

// Create a model for Temple based on the schema
const Temple = mongoose.model("Temple", templeSchema);

// Export the Temple model to be used in other parts of the app
module.exports = Temple;
