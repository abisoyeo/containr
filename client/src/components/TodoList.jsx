import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todoInfo, setTodoInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/todos").then((response) => {
      response.json().then((todoInfo) => {
        setTodoInfo(todoInfo);
      });
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : todoInfo.length > 0 ? (
        <div className="todo-output">
          <h3>Your Tasks...</h3>
          {todoInfo.map((todo) => (
            <TodoItem key={todo._id} {...todo} />
          ))}
        </div>
      ) : (
        <h3>You have no Todos.</h3>
      )}
    </>
  );
}
