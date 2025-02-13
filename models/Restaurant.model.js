const mongoose = require("mongoose");
const Dish=require("./Dish.model");

// Define the schema for the Restaurant
const restaurantSchema = new mongoose.Schema({
    name: String,                     
    address: String,                  
     dishId: {                          
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish"
    },
    isOnlineDelivery: Boolean        
});


const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
