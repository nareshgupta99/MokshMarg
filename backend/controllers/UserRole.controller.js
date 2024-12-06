const UserRole = require("../models/UserRole.model");
const User = require("../models/user.model");
const Role = require("../models/Role.model");

// Assign role to a user
exports.assignRoleToUser = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        // Find the user and the role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        // Assign the role to the user
        const userRole = new UserRole({
            userId,
            roleId
        });

        await userRole.save();
        res.status(201).json({ message: "Role assigned to user successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get roles assigned to a user
exports.getUserRoles = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Find all roles assigned to the user
        const userRoles = await UserRole.find({ userId }).populate("roleId");
        if (userRoles.length === 0) {
            return res.status(404).json({ message: "No roles found for this user" });
        }
        
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a role from a user
exports.removeRoleFromUser = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        // Find the user role relationship
        const userRole = await UserRole.findOneAndDelete({ userId, roleId });
        if (!userRole) {
            return res.status(404).json({ message: "Role not assigned to this user" });
        }

        res.status(200).json({ message: "Role removed from user successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
