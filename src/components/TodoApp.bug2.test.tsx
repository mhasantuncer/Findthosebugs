import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

describe('Bug 2: markera rätt uppgift', () => {
  it('markerar bara uppgiften vars checkbox användaren klickar på', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByLabelText('Ny uppgift');
    const addButton = screen.getByRole('button', { name: 'Lägg till' });

    await user.type(input, 'Handla mjölk');
    await user.click(addButton);

    await user.type(input, 'Diska');
    await user.click(addButton);

    const milkCheckbox = screen.getByRole('checkbox', {
      name: 'Handla mjölk',
    });
    const dishesCheckbox = screen.getByRole('checkbox', { name: 'Diska' });

    await user.click(dishesCheckbox);

    expect(dishesCheckbox).toBeChecked();
    expect(milkCheckbox).not.toBeChecked();
  });
});
