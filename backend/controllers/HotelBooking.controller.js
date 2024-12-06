const HotelBooking = require("../models/HotelBooking.model");

// Create a new hotel booking
exports.createHotelBooking = async (req, res) => {
    try {
        const booking = new HotelBooking(req.body);
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await HotelBooking.find().populate("hotelId userId");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await HotelBooking.findById(req.params.id).populate("hotelId userId");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update booking
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await HotelBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await HotelBooking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
