const express = require("express"); 
const routes = express.Router(); 
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require("../controllers/Booking.controller"); 
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");


// Create a new booking (POST method)
routes.post("/", asyncErrorHandler(createBooking)); 


// Get all bookings (GET method)
routes.get("/", asyncErrorHandler(getAllBookings)); 


// Get booking by ID (GET method)
routes.get("/:id", asyncErrorHandler(getBookingById)); 

routes.put("/:id", asyncErrorHandler(updateBooking)); 


// Delete a booking (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteBooking)); 
// Exporting the routes to use in main server file
module.exports = routes; 