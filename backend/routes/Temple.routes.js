const express = require("express");
const routes = express.Router();
const { createTemple, getAllTemples, getTempleById, updateTemple, deleteTemple } = require("../controllers/Temple.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");


// Create a new temple (POST method)
routes.post("/", asyncErrorHandler(createTemple));


// Get all temples (GET method)
routes.get("/", asyncErrorHandler(getAllTemples));


// Get temple by ID (GET method)
routes.get("/:id", asyncErrorHandler(getTempleById));


// Update a temple (PUT method)
routes.put("/:id", asyncErrorHandler(updateTemple));


// Delete a temple (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteTemple));


// Exporting the routes
module.exports = routes;
