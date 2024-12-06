const HotelOwner = require("../models/HotelOwner.model");
const Hotel = require("../models/Hotel.model");

// Register a new hotel owner
exports.registerHotelOwner = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if the email already exists
        const existingOwner = await HotelOwner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: "Owner with this email already exists" });
        }

        // Create a new hotel owner
        const hotelOwner = new HotelOwner({
            name,
            email,
            phone,
            password
        });

        const savedOwner = await hotelOwner.save();
        res.status(201).json(savedOwner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all hotel owners
exports.getAllHotelOwners = async (req, res) => {
    try {
        const owners = await HotelOwner.find();
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get hotel owner by ID
exports.getHotelOwnerById = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json(owner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update hotel owner's details
exports.updateHotelOwner = async (req, res) => {
    try {
        const updatedOwner = await HotelOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOwner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json(updatedOwner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a hotel owner
exports.deleteHotelOwner = async (req, res) => {
    try {
        const deletedOwner = await HotelOwner.findByIdAndDelete(req.params.id);
        if (!deletedOwner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json({ message: "Owner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Assign a hotel to an owner
exports.assignHotelToOwner = async (req, res) => {
    try {
        const { hotelId } = req.body;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const owner = await HotelOwner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // Assign the hotel to the owner
        hotel.ownerId = req.params.id;
        await hotel.save();

        res.status(200).json({ message: "Hotel assigned to owner successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
