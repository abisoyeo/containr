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
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
