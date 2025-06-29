const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  picture: String,
  // Add any custom fields you want
  preferences: {
    theme: { type: String, default: "light" },
    notifications: { type: Boolean, default: true },
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
