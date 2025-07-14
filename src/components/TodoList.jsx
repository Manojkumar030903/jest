import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = { id: Date.now(), text: trimmed, completed: false };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <>
      <h2>Todo List</h2>
      <input
        type="text" data-testid='new-todo'
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-label="New todo input"
      />
      <button data-testid='add' onClick={addTodo} aria-label="Add todo">
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleComplete(todo.id)}
              title="Click to toggle complete"
              aria-label={`Toggle complete: ${todo.text}`}
            >
              {todo.text}
            </span>
            <button data-testid='delete'
              onClick={() => deleteTodo(todo.id)}
              aria-label={`Delete ${todo.text}`}
              title="Delete"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
