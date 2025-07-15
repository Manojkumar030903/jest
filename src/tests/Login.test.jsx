import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import '@testing-library/jest-dom';
import {  waitFor } from '@testing-library/react';
import React from 'react';
import TodoList from '../components/TodoList';
import Calculator from '../components/Calculator';
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';
import axios from 'axios';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1, title: 'Learn Testing' }),
    })
  );
});

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
test('enter the todo list data', async () => {
  const user = userEvent.setup();
  render(<TodoList />, { wrapper: MemoryRouter });

  await user.type(screen.getByTestId('new-todo'), 'games');
  await user.click(screen.getByTestId('add'));
  await user.click(screen.getByTestId('delete'));

});

test('calls API when TodoList mounts', async () => {
  const mockData = [{ id: 1, title: 'Mock Post' }];
const user=userEvent.setup();
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockData,
  });

  render(<TodoList />);

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
await waitFor(() => { 
user.click(screen.getByTestId('delete-api'));
});
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
  });
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
 