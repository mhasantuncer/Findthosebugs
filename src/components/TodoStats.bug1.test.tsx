import { render, screen } from '@testing-library/react';
import TodoStats from './TodoStats';

describe('Bug 1: TodoStats', () => {
  it('visar antalet uppgifter som är kvar', () => {
    render(
      <TodoStats
        todos={[
          { id: 1, text: 'Handla mjölk', completed: false },
          { id: 2, text: 'Diska', completed: false },
          { id: 3, text: 'Städa', completed: true },
        ]}
      />,
    );

    expect(screen.getByText('2 kvar av 3')).toBeInTheDocument();
  });
});
