import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Mealy app', () => {
  render(<App />);
  const logoElement = screen.getByText(/Mealy/i);
  expect(logoElement).toBeInTheDocument();
});