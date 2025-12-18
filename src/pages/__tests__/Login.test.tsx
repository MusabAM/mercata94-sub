import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Login from '@/pages/Login';

describe('Login Page', () => {
  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Check if the main heading is present
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();

    // Check for email and password input fields
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();

    // Check for the login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Check for the "Forgot Password?" link
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();

    // Check for the link to the signup page
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
  });
});
