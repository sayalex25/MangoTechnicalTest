import { render } from '@testing-library/react';
import Range from '../Range';

describe('Range Component', () => {
  it('renders correctly with default values', () => {
    const { getByText } = render(<Range />);
    expect(getByText('1.00€')).toBeInTheDocument();
    expect(getByText('100.00€')).toBeInTheDocument();
  });
});
