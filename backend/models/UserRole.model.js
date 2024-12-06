const mongoose = require("mongoose");
const User=require("./user.model");
const Role=require("./Role.model");
const userRoleSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  roleid: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);
module.exports = UserRole;
