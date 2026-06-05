import { useState } from "react";

function Hello() {
  const [currentInput, setCurrentInput] = useState("");

  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (currentInput.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: currentInput,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setCurrentInput("");
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(
      (todo) => todo.id !== id
    );

    setTodos(updatedTodos);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={currentInput}
        placeholder="Enter a task"
        onChange={(e) => setCurrentInput(e.target.value)}
      />

      <button onClick={addTodo}>
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
                marginRight: "10px",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Hello;