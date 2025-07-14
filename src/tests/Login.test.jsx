import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import '@testing-library/jest-dom';

import React from 'react';
import TodoList from '../components/TodoList';
import Calculator from '../components/Calculator';
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';
import axios from 'axios';
import { loginUser } from '../api/loginApi';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('renders input and login button', () => {
  render(<Login />, {wrapper : MemoryRouter });
 expect(screen.getByTestId('username')).toBeInTheDocument();
  expect(screen.getByTestId('login-button')).toBeInTheDocument();
});

test('calls navigate to /home on login click', async () => {
  const user = userEvent.setup();
  render(<Login />, { wrapper: MemoryRouter });

  await user.type(screen.getByTestId('username'), 'manoj');
  await user.click(screen.getByTestId('login-button'));

});
jest.mock('axios');

describe('loginUser API', () => {
  it('should return user data when login is successful', async () => {
    const mockResponse = {
      data: {
        message: 'Login successful',
        token: 'fake-jwt-token',
        user: {
          id: 1,
          username: 'kminchelle',
        },
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await loginUser('kminchelle');

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/auth/login',
      { username: 'kminchelle' }
    );
  });

  it('should throw error on login failure', async () => {
    axios.post.mockRejectedValue(new Error('Invalid username'));

    await expect(loginUser('wrongUser')).rejects.toThrow('Invalid username');
  });
});
test('enter the todo list data', async () => {
  const user = userEvent.setup();
  render(<TodoList />, { wrapper: MemoryRouter });

  await user.type(screen.getByTestId('new-todo'), 'games');
  await user.click(screen.getByTestId('add'));
  await user.click(screen.getByTestId('delete'));

});
test('enter the calculator data', async () => {
  const user = userEvent.setup();
  render(<Calculator/>, { wrapper: MemoryRouter });

  await user.type(screen.getByTestId('first'), '10');
  await user.type(screen.getByTestId('second'), '5');
  await user.click(screen.getByTestId('add-button'));

  const output= screen.findByTestId('result');
  console.log(output.textContent);
  await wait(() => {
 expect(output).toHaveTextContent(/15/);
  });
}
);
 