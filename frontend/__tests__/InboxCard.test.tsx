import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InboxCard } from '@/components/InboxCard';
import { Email } from '@/types/index';

it('renders InboxCard with props', () => {
  const mockEmail: Email = {
    id: 1,
    subject: 'Test Email',
    sender_email: 'sender@example.com',
    date: '2024-02-29',
    message: null,
    receiver_email: 'receiver@example.com'
  };

  render(<InboxCard {...mockEmail} />);
  
  expect(screen.getByRole('article')).toBeInTheDocument();
  expect(screen.getByText(mockEmail.subject)).toBeInTheDocument();
  expect(screen.getByText(mockEmail.sender_email.slice(0, 1))).toBeInTheDocument();
});

it('clicking on InboxCard navigates to the main route', () => {
  
  const mockEmail: Email = {
    id: 1,
    subject: 'Test Email',
    sender_email: 'sender@example.com',
    date: '2024-02-29',
    message: null,
    receiver_email: 'receiver@example.com'
  };
  render(<InboxCard {...mockEmail} />);

  const card = screen.getByRole('article');
  userEvent.click(card);

  expect(window.location.pathname).toBe(`/`);
});