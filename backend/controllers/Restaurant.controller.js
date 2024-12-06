const Restaurant = require("../models/Restaurant.model");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body); // Get data from request body
        await restaurant.save();
        res.status(201).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate("dishId"); // Populates dish details
        res.status(200).json({ success: true, data: restaurants });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate("dishId");
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }
        res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }
        res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }
        res.status(200).json({ success: true, message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
