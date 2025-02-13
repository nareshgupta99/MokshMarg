const Order = require("../models/Order.model");
const Restaurant = require("../models/Restaurant.model");
const User = require("../models/user.model");
const Dish = require("../models/Dish.model");

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, restaurantId, dishIds, totalAmount, status } = req.body;

        // Find the user and restaurant
        const user = await User.findById(userId);
        const restaurant = await Restaurant.findById(restaurantId).populate("dishId");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Check if all the dishes exist in the restaurant's menu
        const invalidDishIds = dishIds.filter(dishId => !restaurant.dishId.includes(dishId));
        if (invalidDishIds.length > 0) {
            return res.status(400).json({ message: `These dishes are not available in the restaurant: ${invalidDishIds.join(", ")}` });
        }

        // Create the order
        const order = new Order({
            userId,
            restaurantId,
            dishIds,
            totalAmount,
            status
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId restaurantId dishIds");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("userId restaurantId dishIds");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
