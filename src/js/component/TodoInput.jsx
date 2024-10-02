import React, { useState } from "react";

const TodoInput = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  // Manejar la entrada de la tarea
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Añadir tarea cuando se presiona Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      placeholder="Añadir una nueva tarea"
    />
  );
};

export default TodoInput;