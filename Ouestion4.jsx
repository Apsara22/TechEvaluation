import React, { useState, useEffect } from "react";

const Ouestion4 = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add or update todo
  const addTodo = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? input : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, input]);
    }

    setInput("");
  };

  // Delete todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Edit todo
  const editTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h2>Todo App</h2>

      {/* Input */}
      <input
        type="text"
        value={input}
        placeholder="Enter todo"
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTodo}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      {/* Todo List */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ouestion4;