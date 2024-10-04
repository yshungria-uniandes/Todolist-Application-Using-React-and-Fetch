import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

const App = () => {
  const [tasks, setTasks] = useState([]); // Almacenar tareas

  // Cargar tareas desde la API al montar el componente
  const loadTasks = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/yshungria");
    const data = await response.json();
    setTasks(data.todos)
  };

  // Guardar tareas en la API al actualizar el estado
  useEffect(() => {
    loadTasks()
  }, []);


  // Añadir una nueva tarea
  const addTask = async (label) => {
    if (label.trim() !== "") {
      // vamos a enviar la tarea a la API
      const response = await fetch("https://playground.4geeks.com/todo/todos/yshungria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "label": label, "is_done": false })
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    await fetch("https://playground.4geeks.com/todo/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }


  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoInput addTask={addTask} />
      <TodoList tasks={tasks} deleteTask={deleteTask} />
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No hay tareas, añadir tareas</p>
      ) : (
        <>
          <p className="tasks-count">
            Tienes {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"}
          </p>
        </>
      )}
    </div>
  );
};

export default App;