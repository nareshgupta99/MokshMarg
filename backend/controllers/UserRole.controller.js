const UserRole = require("../models/UserRole.model");
const User = require("../models/user.model");
const Role = require("../models/Role.model");

// Assign role to a user
exports.assignRoleToUser = async (req, res) => {
    const { userId, roleId } = req.body;

    // Find the user and the role
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const role = await Role.findById(roleId);
    if (!role) {
        throw new ApiError(404, "Role not found");
    }

    // Assign the role to the user
    const userRole = new UserRole({
        userId,
        roleId
    });

    await userRole.save();
    res.status(201).json({ message: "Role assigned to user successfully" });

};

// Get roles assigned to a user
exports.getUserRoles = async (req, res) => {

    const { userId } = req.params;

    // Find all roles assigned to the user
    const userRoles = await UserRole.find({ userId }).populate("roleId");
    if (userRoles.length === 0) {
        throw new ApiError(404, "No roles found for this user");
    }

    res.status(200).json(userRoles);

};

