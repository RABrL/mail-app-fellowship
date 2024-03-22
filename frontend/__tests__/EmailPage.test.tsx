import { render, screen, waitFor } from '@testing-library/react';
import EmailPage from '@/app/[emailId]/page';
import { getAnEmail as mockGetAnEmail } from '@/services/getEmails';
import { MyUserContextProvider } from '@/hooks/useUser'

jest.mock('@/services/getEmails');

describe('EmailPage component', () => {
  it('renders email loading when email is fetching', async () => {
    // Mock email data
    const mockEmail = {
      id: 1,
      sender_email: 'example@example.com',
      subject: 'Test Email',
      content: 'This is a test email content.',
    };

    // Mock getAnEmail function to return mockEmail
    ( mockGetAnEmail as jest.Mock).mockResolvedValueOnce(mockEmail);

    // Render the component
    render(<MyUserContextProvider>
      <EmailPage params={{ emailId: 1 }} />
    </MyUserContextProvider>);

    // Wait for the email details to be rendered
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      // expect(screen.getByText('This is a test email content.')).toBeInTheDocument();
    });
  });

});

/*
it('renders 404 when email is not found', async () => {
    // Mock getAnEmail function to return null
    ( mockGetAnEmail as jest.Mock).mockResolvedValueOnce(null);

    // Render the component
    render(<EmailPage params={{ emailId: 1 }} />);

    // Check if 404 message is rendered
    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
    });
  });
*/