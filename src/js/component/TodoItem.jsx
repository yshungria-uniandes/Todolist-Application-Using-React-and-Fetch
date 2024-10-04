import React from "react";

const TodoItem = ({ task, index, deleteTask }) => {
  return (
    <li
      className="todo-item"
      onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
    >
      {task.label}
      <span className="delete-icon" onClick={() => deleteTask(index)}>
        🗑️
      </span>
    </li>
  );
};

export default TodoItem;
