import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

describe('Bug 4: tomma uppgifter', () => {
  it('lägger inte till en uppgift som bara innehåller mellanslag', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(screen.getByLabelText('Ny uppgift'), '   ');
    await user.click(screen.getByRole('button', { name: 'Lägg till' }));

    expect(screen.getByText('Inga uppgifter att visa.')).toBeInTheDocument();
    expect(screen.getByText('0 kvar av 0')).toBeInTheDocument();
  });
});
