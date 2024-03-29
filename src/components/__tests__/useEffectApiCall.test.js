import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Range from '../Range';

jest.mock('axios');

describe('Range Component', () => {
  test('loads and displays default values ​​when fixRange is false', async () => {
    axios.get.mockResolvedValueOnce({
      data: { min: 1, max: 100 }
    });

    const { findByText } = render(<Range fixedRange={false} />);

    const minValueDisplay = await findByText('1.00€');
    const maxValueDisplay = await findByText('100.00€');

    expect(minValueDisplay).toBeTruthy();
    expect(maxValueDisplay).toBeTruthy();
  });

  test('loads and displays the values ​​obtained by axios when fixedRange is true', async () => {
    axios.get.mockResolvedValueOnce({
      data: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
    });

    const { findByText } = render(<Range fixedRange={true} />);

    const firstValueDisplay = await findByText('1.99€');
    const lastValueDisplay = await findByText('70.99€');

    expect(firstValueDisplay).toBeTruthy();
    expect(lastValueDisplay).toBeTruthy();
  });
});
