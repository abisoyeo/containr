const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/TodoDb";
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw new Error("Database connection failed");
  }
};

module.exports = connectDB;
