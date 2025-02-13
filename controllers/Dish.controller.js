const Dish = require("../models/Dish.model");

// Create a new dish
exports.createDish = async (req, res) => {
    try {
        const dish = new Dish(req.body); 
        const savedDish = await dish.save(); 
        res.status(201).json(savedDish); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Get all dishes
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find(); 
        res.status(200).json(dishes); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Get a single dish by ID
exports.getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id); 
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" }); 
        }
        res.status(200).json(dish); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Update a dish
exports.updateDish = async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }); 
        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" }); 
        }
        res.status(200).json(updatedDish); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

// Delete a dish
exports.deleteDish = async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id); 
        if (!deletedDish) {
            return res.status(404).json({ message: "Dish not found" }); 
        }
        res.status(200).json({ message: "Dish deleted successfully" }); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};
