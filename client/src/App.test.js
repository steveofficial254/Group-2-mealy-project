import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Mealy dashboard', () => {
  render(<App />);
  // Test for the "Mealy" text in the sidebar
  const mealyElement = screen.getByText(/Mealy/i);
  expect(mealyElement).toBeInTheDocument();
});