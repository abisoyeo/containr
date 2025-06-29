const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: [true, "Please enter a body"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
