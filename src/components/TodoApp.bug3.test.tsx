import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

describe('Bug 3: filtret Klara', () => {
  it('visar bara avklarade uppgifter', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByLabelText('Ny uppgift');
    const addButton = screen.getByRole('button', { name: 'Lägg till' });

    await user.type(input, 'Handla mjölk');
    await user.click(addButton);

    await user.type(input, 'Diska');
    await user.click(addButton);

    await user.click(screen.getByRole('checkbox', { name: 'Diska' }));
    await user.click(screen.getByRole('button', { name: 'Klara' }));

    expect(screen.getByText('Diska')).toBeInTheDocument();
    expect(screen.queryByText('Handla mjölk')).not.toBeInTheDocument();
  });
});
