import { useState } from 'react';
import type { Filter, Todo } from '../types';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoStats from './TodoStats';

let nextId = 1;

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  function addTodo(text: string) {
    setTodos((prev) => [...prev, { id: nextId++, text, completed: false }]);
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <section className="todo-app">
      <h2>Att göra</h2>
      <TodoForm onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodoStats todos={todos} />
    </section>
  );
}
