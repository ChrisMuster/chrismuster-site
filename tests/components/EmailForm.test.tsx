import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailForm from '@/components/email/email-form';
import { server } from '@/tests/mocks/server';
import { http } from 'msw';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("EmailForm Component", () => {
  it("renders all fields and the submit button", () => {
    render(<EmailForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });

  it("validates empty fields", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Subject is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
  });

  it("validates message length", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.type(screen.getByLabelText(/Name/i), "Chris");
    await user.type(screen.getByLabelText(/Email/i), "chris@example.com");
    await user.type(screen.getByLabelText(/Subject/i), "Test");
    await user.type(screen.getByLabelText(/Message/i), "Too short");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(await screen.findByText(/Message must be at least/i)).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.type(screen.getByLabelText(/Name/i), "Chris");
    await user.type(screen.getByLabelText(/Email/i), "chris@example.com");
    await user.type(screen.getByLabelText(/Subject/i), "Hello");
    await user.type(screen.getByLabelText(/Message/i), "This is a valid test message!");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(await screen.findByText(/Message sent successfully/i)).toBeInTheDocument();
  });

  it("shows error message on API failure", async () => {
    // Suppress expected console error for this test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Override API to force failure
    server.use(
      http.post('/api/send-email', () => {
        return new Response(null, { status: 500 });
      })
    );

    const user = userEvent.setup();
    render(<EmailForm />);

    await user.type(screen.getByLabelText(/Name/i), "Chris");
    await user.type(screen.getByLabelText(/Email/i), "chris@example.com");
    await user.type(screen.getByLabelText(/Subject/i), "Error test");
    await user.type(screen.getByLabelText(/Message/i), "This should fail");

    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(await screen.findByText(/Error sending email. Please try again/i)).toBeInTheDocument();
    
    // Verify error was logged
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
