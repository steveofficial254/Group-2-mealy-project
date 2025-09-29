import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Signup from '../components/Signup';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderSignup = () => render(<BrowserRouter><Signup /></BrowserRouter>);

describe('Signup Tests', () => {
  beforeEach(() => mockNavigate.mockClear());

  test('renders signup form', () => {
    renderSignup();
    expect(screen.getByText('Mealy')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });

  test('shows error for empty form', async () => {
    const user = userEvent.setup();
    renderSignup();
    await user.click(screen.getByRole('button', { name: /signup/i }));
    expect(screen.getByText('All fields required')).toBeInTheDocument();
  });

  test('successful signup navigates to home', async () => {
    const user = userEvent.setup();
    renderSignup();
    await user.type(screen.getByPlaceholderText('Enter your name'), 'John');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'john@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /signup/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});