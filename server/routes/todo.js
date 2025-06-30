const express = require("express");
const router = express.Router();
const TodoModel = require("../Models/todo");
const { requiresAuth } = require("express-openid-connect");
const syncUserMiddleware = require("../middleware/syncUser");
const user = require("../Models/user");

// Apply middleware to all todo routes
router.use(requiresAuth(), syncUserMiddleware);

router.get("/todos", async (req, res) => {
  try {
    // Only get todos for the authenticated user
    const todos = await TodoModel.find({ user: req.dbUser._id }).sort({
      updatedAt: -1,
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/todos", async (req, res) => {
  try {
    // Associate todo with the authenticated user
    const todoData = {
      ...req.body,
      user: req.dbUser._id,
    };
    const todo = await TodoModel.create(todoData);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Only update todos owned by the user
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, user: req.dbUser._id },
      req.body
    );

    if (!todo) {
      return res.status(404).json({ msg: `Todo with id ${id} not found` });
    }

    const updatedTodo = await TodoModel.findById(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Only delete todos owned by the user
    const todo = await TodoModel.findOneAndDelete({
      _id: id,
      user: req.dbUser._id,
    });

    if (!todo) {
      return res.status(404).json({ msg: `Todo with id ${id} not found` });
    }

    res.json({ msg: "Deleted successfully", todo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
