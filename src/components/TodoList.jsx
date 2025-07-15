import React, { use, useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [posts, setposts] = useState([]);
  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = { id: Date.now(), text: trimmed, completed: false };
    setTodos([...todos, newTodo]);
    setText('');
  };
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setposts([data]);
      })
  }, []);
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
  const handledelete = async (id) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
        setposts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    
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
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
            <button data-testid="delete-api" onClick={() => { handledelete(post.id) }}>delete the list</button>

          </li>
        ))}
      </ul>
    </>
  );
}
