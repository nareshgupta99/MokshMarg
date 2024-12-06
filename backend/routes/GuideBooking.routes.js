const express = require("express"); // Express module ko import kar rahe hain.
const routes = express.Router(); // Ek router banate hain jisme saare guide booking routes handle honge.
const { createGuideBooking, getAllGuideBookings, getGuideBookingById, updateGuideBooking, deleteGuideBooking } = require("../controllers/GuideBooking.controller"); // Guide booking ke controllers ko import kar rahe hain.
const asyncErrorHandler = require("../utils/GlobalExceptionHandle"); // Global exception handling ke liye utility function ko import kar rahe hain.


// Create a new guide booking (POST method)
routes.post("/", asyncErrorHandler(createGuideBooking)); 


// Get all guide bookings (GET method)
routes.get("/", asyncErrorHandler(getAllGuideBookings)); 


// Get guide booking by ID (GET method)
routes.get("/:id", asyncErrorHandler(getGuideBookingById)); 


routes.put("/:id", asyncErrorHandler(updateGuideBooking)); 


// Delete a guide booking (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteGuideBooking)); 


// Exporting the routes to use in main server file
module.exports = routes; 
