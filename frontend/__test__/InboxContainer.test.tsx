import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { InboxContainer } from '@/components/InboxContainer';
import { getEmailsByUser as mockGetEmailsByUser } from '@/services/getEmails'; 
// Mock the getEmailsByUser function
jest.mock('@/services/getEmails');
// Sample email data for testing
const sampleEmails = [
  { id: 1, sender_email: 'test1@example.com', date: '2022-02-15T12:00:00', subject: 'Test Subject 1' },
  { id: 2, sender_email: 'test2@example.com', date: '2022-02-16T12:00:00', subject: 'Test Subject 2' },
  // Add more sample emails as needed
];

describe('InboxContainer Component', () => {

  beforeEach(() => {
    // Create a mock function for getEmailsByUser
    (mockGetEmailsByUser as jest.Mock).mockClear();
  });
  it('Renders the loading state initially', async () => {
    const { getByText } = render(<InboxContainer />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {});
  });

  it('Renders emails when data is fetched successfully', async () => {
    const { getByText } = render(<InboxContainer />);
    await waitFor(() => expect(mockGetEmailsByUser).toHaveBeenCalledTimes(1));
    
    sampleEmails.forEach((email) => {
      expect(getByText(email.sender_email)).toBeInTheDocument();
      expect(getByText(email.subject)).toBeInTheDocument();
      expect(getByText(email.date.slice(0, 10))).toBeInTheDocument();
    });
  });

  it('Logs an error if data fetching fails', async () => {
    (mockGetEmailsByUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch emails'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<InboxContainer />);
    await waitFor(() => expect(mockGetEmailsByUser as jest.Mock).toHaveBeenCalledTimes(1));
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Failed to fetch emails'));
    consoleErrorSpy.mockRestore();
  });

  // Add more tests as needed
});
