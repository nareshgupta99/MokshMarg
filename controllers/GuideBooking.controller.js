const GuideBooking = require("../models/GuideBooking.model");

// Create a new guide booking
exports.createGuideBooking = async (req, res) => {
    try {
        const booking = new GuideBooking(req.body);
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all guide bookings
exports.getAllGuideBookings = async (req, res) => {
    try {
        const bookings = await GuideBooking.find().populate("guideId");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a guide booking by ID
exports.getGuideBookingById = async (req, res) => {
    try {
        const booking = await GuideBooking.findById(req.params.id).populate("guideId");
        if (!booking) {
            return res.status(404).json({ message: "Guide Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a guide booking
exports.updateGuideBooking = async (req, res) => {
    try {
        const updatedBooking = await GuideBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Guide Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a guide booking
exports.deleteGuideBooking = async (req, res) => {
    try {
        const deletedBooking = await GuideBooking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Guide Booking not found" });
        }
        res.status(200).json({ message: "Guide Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
