const Temple = require("../models/Temple.model");

// Create a new temple
exports.createTemple = async (req, res) => {
    try {
        const { name, location, description, isOpen } = req.body;

        // Check if the temple already exists
        const existingTemple = await Temple.findOne({ name });
        if (existingTemple) {
            return res.status(400).json({ message: "Temple already exists" });
        }

        // Create and save new temple
        const temple = new Temple({ name, location, description, isOpen });
        const savedTemple = await temple.save();
        res.status(201).json(savedTemple);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all temples
exports.getAllTemples = async (req, res) => {
    try {
        const temples = await Temple.find();
        res.status(200).json(temples);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get temple by ID
exports.getTempleById = async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (!temple) {
            return res.status(404).json({ message: "Temple not found" });
        }
        res.status(200).json(temple);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update temple
exports.updateTemple = async (req, res) => {
    try {
        const { name, location, description, isOpen } = req.body;
        const updatedTemple = await Temple.findByIdAndUpdate(req.params.id, { name, location, description, isOpen }, { new: true });
        if (!updatedTemple) {
            return res.status(404).json({ message: "Temple not found" });
        }
        res.status(200).json(updatedTemple);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete temple
exports.deleteTemple = async (req, res) => {
    try {
        const deletedTemple = await Temple.findByIdAndDelete(req.params.id);
        if (!deletedTemple) {
            return res.status(404).json({ message: "Temple not found" });
        }
        res.status(200).json({ message: "Temple deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
