import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

const App = () => {
  const [tasks, setTasks] = useState([]); // Almacenar tareas

  // Cargar tareas desde la API al montar el componente
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/todos/yshungria")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar las tareas");
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  });

  // Actualizar tareas en la API cada vez que cambien las tareas
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/todos/yshungria", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar las tareas");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [tasks]);

  // Añadir una nueva tarea
  const addTask = (label) => {
    if (label.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), label, done: false }]);
    }
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Limpiar todas las tareas
  const clearTasks = () => {
    setTasks([]);
  };

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
          <button onClick={clearTasks}>Limpiar todas las tareas</button>
        </>
      )}
    </div>
  );
};

export default App;
