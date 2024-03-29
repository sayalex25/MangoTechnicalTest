/* Test to ensure the Range component renders 
and displays a value formatted as "100.00 €" */

import { render } from '@testing-library/react';
import Range from '../Range';

it('renders correctly', () => {
  const { getByText } = render(<Range />);
  const regex = /100\.00\s*€/;
  expect(getByText(regex)).toBeInTheDocument();
});
