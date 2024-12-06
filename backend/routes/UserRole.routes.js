const express = require("express");
const routes = express.Router();
const { createUserRole, getUserRoles, getUserRoleById, updateUserRole, deleteUserRole } = require("../controllers/UserRole.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");


// Create a new user-role mapping (POST method)
routes.post("/", asyncErrorHandler(createUserRole));


// Get all user-role mappings (GET method)
routes.get("/", asyncErrorHandler(getUserRoles));


// Get a specific user-role mapping by ID (GET method)
routes.get("/:id", asyncErrorHandler(getUserRoleById));


// Update a user-role mapping (PUT method)
routes.put("/:id", asyncErrorHandler(updateUserRole));


// Delete a user-role mapping (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteUserRole));


// Exporting the routes
module.exports = routes;
