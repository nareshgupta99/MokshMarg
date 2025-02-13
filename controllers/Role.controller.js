const Role = require("../models/Role.model");
const User = require("../models/user.model");

// Create a new role
exports.createRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;

        // Check if role already exists
        const existingRole = await Role.findOne({ roleName });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        // Create new role
        const role = new Role({ roleName, permissions });
        const savedRole = await role.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update role
exports.updateRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, { roleName, permissions }, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete role
exports.deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        // Optionally remove role from all users who have this role
        await User.updateMany({ roles: req.params.id }, { $pull: { roles: req.params.id } });
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
