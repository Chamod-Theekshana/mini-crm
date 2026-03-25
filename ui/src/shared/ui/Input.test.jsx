import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('renders label and error message', () => {
    render(<Input label="Email" error="Invalid email" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
