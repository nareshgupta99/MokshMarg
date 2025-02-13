const express = require("express"); 
const routes = express.Router(); 
const { createHotelBooking, getAllHotelBookings, getHotelBookingById, updateHotelBooking, deleteHotelBooking } = require("../controllers/HotelBooking.controller"); 
const asyncErrorHandler = require("../utils/GlobalExceptionHandle"); 


// Create a new hotel booking (POST method)
routes.post("/", asyncErrorHandler(createHotelBooking)); 


// Get all hotel bookings (GET method)
routes.get("/", asyncErrorHandler(getAllHotelBookings)); 


// Get hotel booking by ID (GET method)
routes.get("/:id", asyncErrorHandler(getHotelBookingById)); 


// Update hotel booking details (PUT method)
routes.put("/:id", asyncErrorHandler(updateHotelBooking)); 


// Delete a hotel booking (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteHotelBooking));


// Exporting the routes to use in main server file
module.exports = routes; 
