import React, { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function createNewTodo(ev) {
    ev.preventDefault();

    const result = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    if (result.ok) {
      window.location.reload();
    }
  }
  return (
    <>
      <div className="todo-input">
        <h2>Add more tasks below...</h2>
        <form onSubmit={createNewTodo}>
          <div className="addTodoForm">
            <div className="titleInput">
              <input
                id="newTodoTitle"
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Add a title..."
              />
            </div>
            <div className="taskInput">
              <textarea
                id="subject"
                value={body}
                onChange={(ev) => setBody(ev.target.value)}
                placeholder="Add a task..."
              ></textarea>
            </div>
            <button id="addTodoButton" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
