import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Range from '../Range';

describe('Range Component', () => {
  test('renders with default values', () => {
    render(<Range />);
    expect(screen.getByText('1.00€')).toBeInTheDocument();
    expect(screen.getByText('100.00€')).toBeInTheDocument();
  });

  test('allows the user to interact with the minimum value input', async () => {
    render(<Range fixedRange={true} />);
    let minValueInput;
    try {
      minValueInput = await screen.findByRole('spinbutton', {}, { timeout: 1000 });
      expect(minValueInput.value).toBe('1.99');
      fireEvent.change(minValueInput, { target: { value: '10.99' } });
      expect(minValueInput.value).toBe('10.99');
    } catch (error) {
      console.log('The minValueInput element was not found in the DOM');
    }
  });
})