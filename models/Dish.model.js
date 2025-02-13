const mongoose = require("mongoose");

// Define the schema for Dish
const dishSchema = new mongoose.Schema({
    name: String,               // Name of the dish
    price: String,              // Price of the dish
    available: Boolean          // Whether the dish is available or not
});

// Create a model for Dish based on the schema
const Dish = mongoose.model("Dish", dishSchema);

// Export the Dish model to be used in other parts of the app
module.exports = Dish;
