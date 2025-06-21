const express = require("express");
const router = express.Router();
const TodoModel = require("../models/TodoModels");

router.get("/api/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if (!todo)
      return res.status(404).json({ msg: `Todo with id ${id} not found` });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/api/todos", async (req, res) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndUpdate(id, req.body);
    if (!todo)
      return res.status(404).json({ msg: `Todo with id ${id} not found` });

    const updatedTodo = await TodoModel.findById(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo)
      return res.status(404).json({ msg: `Todo with id ${id} not found` });

    res.json({ msg: "Deleted succesfully", todo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
