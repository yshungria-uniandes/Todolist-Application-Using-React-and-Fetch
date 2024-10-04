import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, deleteTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <TodoItem key={index} index={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default TodoList;
