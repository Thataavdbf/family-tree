import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveCalculator from '../InteractiveCalculator';

// jest-dom is already set up globally in jest.config.js

describe('InteractiveCalculator', () => {
  it('renders input fields and button', () => {
    render(<InteractiveCalculator />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthdate/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  it('shows results after clicking Calculate', () => {
    render(<InteractiveCalculator />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Birthdate/i), { target: { value: '2000-01-05' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    expect(screen.getByText(/Life Path/i)).toBeInTheDocument();
    expect(screen.getByText(/Destiny/i)).toBeInTheDocument();
  });
});
