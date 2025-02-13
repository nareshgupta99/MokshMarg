const express = require("express"); // Express module ko import kar rahe hain.
const routes = express.Router(); // Ek router bana rahe hain jo routes ko handle karega.
const { createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel } = require("../controllers/Hotel.controller"); // Hotel ke controllers ko import kar rahe hain.
const asyncErrorHandler = require("../utils/GlobalExceptionHandle"); // Global exception handling ke liye utility function import kar rahe hain.


// Create a new hotel (POST method)
routes.post("/", asyncErrorHandler(createHotel)); // Hotel create karne ke liye POST request. Controller function `createHotel` ko handle karega.


// Get all hotels (GET method)
routes.get("/", asyncErrorHandler(getAllHotels)); // Saare hotels ko fetch karne ke liye GET request. Controller function `getAllHotels` ko call kar rahe hain.


// Get hotel by ID (GET method)
routes.get("/:id", asyncErrorHandler(getHotelById)); // Ek specific hotel ko fetch karne ke liye ID ke basis par GET request.


// Update hotel details (PUT method)
routes.put("/:id", asyncErrorHandler(updateHotel)); // Hotel details ko update karne ka route. ID ke basis par PUT request.


// Delete a hotel (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteHotel)); // Hotel ko delete karne ke liye DELETE request. ID ke basis par delete karenge.


// Exporting the routes to use in main server file
module.exports = routes; // Yeh routes ko export kar raha hai taaki main server file mein use ho sake.
