const mongoose = require("mongoose");
const Restaurant=require("./Restaurant.model");
const User=require("./user.model")

// Define the schema for Order
const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    // Reference to User who made the order
    orderType: String,                                                // Type of the order (e.g., online, in-person)
    orderTiming: Date,                                                // Date and time when the order was made
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }, // Reference to the restaurant
    order_price: Number,                                              // Total price of the order
    orderlist_id: { type: mongoose.Schema.Types.ObjectId, ref: "OrderList" }  // Reference to the order list
});

// Create a model for Order based on the schema
const Order = mongoose.model("Order", orderSchema);

// Export the Order model to be used in other parts of the app
module.exports = Order;
