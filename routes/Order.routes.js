const express = require("express");
const routes = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/Order.controller");
const asyncErrorHandler = require("../utils/GlobalExceptionHandle");


// Create a new order (POST method)
routes.post("/", asyncErrorHandler(createOrder));


// Get all orders (GET method)
routes.get("/", asyncErrorHandler(getAllOrders));


// Get order by ID (GET method)
routes.get("/:id", asyncErrorHandler(getOrderById));


// Update an order (PUT method)
routes.put("/:id", asyncErrorHandler(updateOrder));


// Delete an order (DELETE method)
routes.delete("/:id", asyncErrorHandler(deleteOrder));


// Exporting the routes
module.exports = routes;
