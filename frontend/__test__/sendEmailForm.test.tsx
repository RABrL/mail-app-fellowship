import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SendEmailForm from '@/components/SendEmailForm';
import { sendEmail as mockSendEmail } from '@/services/sendEmail';
import { toast } from 'sonner';

// Mock toast module
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock sendEmail service function
jest.mock('@/services/sendEmail');

describe('SendEmailForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });

  it('submits email successfully', async () => {
    render(<SendEmailForm />);

    const receiverInput = screen.getByLabelText('Para');
    const subjectInput = screen.getByPlaceholderText('Agregar un asunto');
    const contentInput = screen.getByLabelText('content');
    const submitButton = screen.getByText('Enviar');

    // Mock data
    const formData = {
      receiver: 'test@example.com',
      subject: 'Test Subject',
      content: 'Test Content',
    };

    // Set input values
    fireEvent.change(receiverInput, { target: { value: formData.receiver } });
    fireEvent.change(subjectInput, { target: { value: formData.subject } });
    fireEvent.change(contentInput, { target: { value: formData.content } });

    // Submit form
    fireEvent.submit(submitButton);

    // Check if sendEmail service function was called with correct data
    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith(new FormData());
    });

    // Check if success toast is displayed
    expect(toast.success).toHaveBeenCalledWith('Correo enviado correctamente');
  });

  it('handles submission error', async () => {
    // Mock sendEmail to throw an error
    ( mockSendEmail as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

    render(<SendEmailForm />);

    const submitButton = screen.getByText('Enviar');

    // Submit form
    fireEvent.submit(submitButton);

    // Check if error toast is displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Test error');
    });
  });
});

