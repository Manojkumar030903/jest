import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import TodoList from '../components/TodoList';
import Calculator from '../components/Calculator';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="todo" element={<TodoList />} />
        <Route path="calculator" element={<Calculator />} />
      </Routes>
    </div>
  );
}
