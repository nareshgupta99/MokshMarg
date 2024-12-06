const express = require("express");
const routes = express.Router();
const { createGuide, getAllGuides, getGuideById, updateGuide, deleteGuide } = require("../controllers/Guide.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");


// Create a new guide (POST method)
routes.post("/", asyncErrorHandler(createGuide));


// Get all guides (GET method)
routes.get("/", asyncErrorHandler(getAllGuides));


// Get guide by ID (GET method)
routes.get("/:id", asyncErrorHandler(getGuideById));


// Update guide (PUT method)
routes.put("/:id", asyncErrorHandler(updateGuide));


// Delete a guide (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteGuide));


// Exporting the routes
module.exports = routes;
