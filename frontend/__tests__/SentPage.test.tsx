import { render, screen, waitFor } from '@testing-library/react';
import SentPage from '@/app/sent/page';
import { MyUserContextProvider } from '@/hooks/useUser'

jest.mock('@/services/getEmails');

describe('SentPage component', () => {
  it('renders email not selected when email is none', async () => {

    // Render the component
    render(<MyUserContextProvider>
      <SentPage />
    </MyUserContextProvider>);

    // Wait for the email details to be rendered
    await waitFor(() => {
      expect(screen.getByText('No Email selected')).toBeInTheDocument();
    });
  });

});