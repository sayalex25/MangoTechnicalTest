import { render, fireEvent } from '@testing-library/react';
import Range from '../Range';

it('prevents the minimum value from being greater than the maximum value', async () => {
    const { getByText, findByDisplayValue } = render(<Range />);
    fireEvent.click(getByText('1.00€'));
    const minValueInput = await findByDisplayValue(/1(\.00)?/);
    fireEvent.change(minValueInput, { target: { value: '100.00' } });
    fireEvent.blur(minValueInput);
});
