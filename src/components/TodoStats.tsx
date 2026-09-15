import type { Todo } from '../types';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <p className="todo-stats">
      {remaining} kvar av {total}
    </p>
  );
}
