const express = require("express"); // Express module ko import kar rahe hain.
const routes = express.Router(); // Ek router bana rahe hain jo routes handle karega.
const { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require("../controllers/Restaurant.controller"); 
const asyncErrorHandler = require("../utils/GlobalExceptionHandle"); 


// Create a new restaurant (POST method)
routes.post("/", asyncErrorHandler(createRestaurant)); 


// Get all restaurants (GET method)
routes.get("/", asyncErrorHandler(getAllRestaurants));
// Get restaurant by ID (GET method)
routes.get("/:id", asyncErrorHandler(getRestaurantById)); 
// Update restaurant details (PUT method)
routes.put("/:id", asyncErrorHandler(updateRestaurant)); 
// Delete a restaurant (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteRestaurant)); 

// Export the routes so they can be used in the main server file
module.exports = routes; 
