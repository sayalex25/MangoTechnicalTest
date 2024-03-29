import { render } from '@testing-library/react';
import Range from '../Range';

describe('Range', () => {
  it('renders without crashing and contains euro symbols', () => {
    const { getAllByText } = render(<Range />);
    const euroSymbols = getAllByText(/€/i);
    expect(euroSymbols.length).toBeGreaterThan(0); 
  });
});
