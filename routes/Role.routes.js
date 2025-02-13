const express = require("express");
const routes = express.Router();
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require("../controllers/Role.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");


// Create a new role (POST method)
routes.post("/", asyncErrorHandler(createRole));


// Get all roles (GET method)
routes.get("/", asyncErrorHandler(getAllRoles));


// Get role by ID (GET method)
routes.get("/:id", asyncErrorHandler(getRoleById));


// Update a role (PUT method)
routes.put("/:id", asyncErrorHandler(updateRole));


// Delete a role (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteRole));


// Exporting the routes
module.exports = routes;
