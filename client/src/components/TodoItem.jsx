import React, { useState } from "react";

export default function TodoItem({ _id, title, body, status }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  const handleDelete = async () => {
    const result = await fetch(`/api/todos/${_id}`, {
      method: "DELETE",
    });

    if (result.ok) {
      window.location.reload();
    }
  };

  const handleStatus = async () => {
    const result = await fetch(`/api/todos/${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ status: "completed" }),
    });

    if (result.ok) {
      window.location.reload();
    }
  };

  const handleTitleSave = async () => {
    const result = await fetch(`/api/todos/${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ title: editTitle }),
    });

    if (result.ok) {
      setIsEditingTitle(false);
      window.location.reload();
    }
  };

  const handleBodySave = async () => {
    const result = await fetch(`/api/todos/${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ body: editBody }),
    });

    if (result.ok) {
      setIsEditingBody(false);
      window.location.reload();
    }
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTitleSave();
    }
    if (e.key === "Escape") {
      setEditTitle(title);
      setIsEditingTitle(false);
    }
  };

  const handleBodyKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBodySave();
    }
    if (e.key === "Escape") {
      setEditBody(body);
      setIsEditingBody(false);
    }
  };

  return (
    <div>
      <ul>
        <li id="todo-list">
          {isEditingTitle ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyPress}
              autoFocus
            />
          ) : (
            <h3
              onClick={
                status !== "completed"
                  ? () => setIsEditingTitle(true)
                  : undefined
              }
              style={{ cursor: status !== "completed" ? "pointer" : "default" }}
            >
              {title}
            </h3>
          )}

          {isEditingBody ? (
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              onBlur={handleBodySave}
              onKeyDown={handleBodyKeyPress}
              autoFocus
            />
          ) : (
            <p
              onClick={
                status !== "completed"
                  ? () => setIsEditingBody(true)
                  : undefined
              }
              style={{ cursor: status !== "completed" ? "pointer" : "default" }}
            >
              {body}
            </p>
          )}

          <div>
            <button
              className="btn"
              onClick={handleStatus}
              disabled={status === "completed"}
            >
              {status === "completed" ? "✓ Completed" : "Mark Complete"}
            </button>

            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
