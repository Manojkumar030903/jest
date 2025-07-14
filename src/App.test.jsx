import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
// Smoke test for input and button
test('login input and button are visible', () => {
  render(<Login />, { wrapper: MemoryRouter });

  expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

// Functional test for typing into input (no navigation testing yet)
test('user can type into the input field', async () => {
  const user = userEvent.setup();
  render(<Login />, { wrapper: MemoryRouter });

  const input = screen.getByPlaceholderText(/enter username/i);
  await user.type(input, 'John');

  expect(input).toHaveValue('John');
});

// Optional: mock navigation (if you want to test routing behavior)
