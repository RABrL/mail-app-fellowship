import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import { NavBar } from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModalStore';
import { useUser } from '@/hooks/useUser';
import { useDebounce } from 'use-debounce';

// Mock useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock useModal hook
jest.mock('@/hooks/useModalStore', () => ({
  __esModule: true,
  useModal: jest.fn(),
}));
// Mock useUser hook
jest.mock('@/hooks/useUser', () => ({
  useUser: jest.fn(),
}));

// Mock useDebounce hook
jest.mock('use-debounce', () => ({
  useDebounce: jest.fn((value) => [value, 500]),
}));

describe('NavBar Component', () => {
  it('Renders correctly with Sign In button when user is not logged in', () => {
    ( useUser as jest.Mock).mockReturnValueOnce({ user: null });

    render(<NavBar />);

    expect(screen.getByTitle('Sign In')).toBeInTheDocument();
    expect(screen.queryByTitle('Log out')).not.toBeInTheDocument();
  });

  it('Renders correctly with Log Out button when user is logged in', () => {
    ( useUser as jest.Mock ).mockReturnValueOnce({ user: { name: 'Test User' } });

    render(<NavBar />);

    expect(screen.getByTitle('Log out')).toBeInTheDocument();
    expect(screen.queryByTitle('Sign In')).not.toBeInTheDocument();
  });

  it('Calls appropriate functions on button click', async () => {
    const mockPush = jest.fn();
    ( useRouter as jest.Mock).mockReturnValueOnce({
      push: mockPush,
    });
    ( useUser as jest.Mock ).mockReturnValueOnce({ user: { name: 'Test User' } });

    render(<NavBar />);

    // Click Log out button
    fireEvent.click(screen.getByTitle('Log out'));

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(mockPush).toHaveBeenCalledTimes(1);
    });

    // Click Sign In button
    fireEvent.click(screen.getByTitle('Sign In'));

    expect(useModal).toHaveBeenCalledWith(expect.any(Function)); // Assuming useModal is called with a function
    expect(useModal().onOpen).toHaveBeenCalled();
  });

  it('Calls router.push with correct search query', async () => {
    ( useRouter as jest.Mock).mockReturnValueOnce({
      push: jest.fn(),
    });

    render(<NavBar />);

    // Change search input value
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test' } });

    await waitFor(() => {
      expect(useDebounce).toHaveBeenCalledWith('test');
      expect(useRouter().push).toHaveBeenCalledWith('/?search=test');
    });
  });
});
