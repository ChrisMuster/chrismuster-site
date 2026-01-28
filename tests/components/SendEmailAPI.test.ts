import { POST } from "@/app/api/send-email/route";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    verify: jest.fn(),
    sendMail: jest.fn(),
  })),
}));

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      body,
      status: init?.status || 200,
    })),
  },
}));

describe("Send Email API Route", () => {
  let mockTransporter: {
    verify: jest.Mock;
    sendMail: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up environment variables
    process.env.SMTP_HOST = "smtp.test.com";
    process.env.SMTP_PORT = "465";
    process.env.SMTP_USER = "test@test.com";
    process.env.SMTP_PASS = "testpass";
    
    mockTransporter = {
      verify: jest.fn().mockResolvedValue(true),
      sendMail: jest.fn().mockResolvedValue({ response: "250 OK" }),
    };
    
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
  });

  afterEach(() => {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_FROM;
  });

  const createMockRequest = (body: object) => ({
    json: jest.fn().mockResolvedValue(body),
  }) as unknown as Request;

  it("sends email successfully with valid data", async () => {
    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message content",
    });

    await POST(mockReq);

    expect(mockTransporter.verify).toHaveBeenCalled();
    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: '"John Doe" <test@test.com>',
        replyTo: "john@example.com",
        subject: "Test Subject",
        text: expect.stringContaining("Test message content"),
      })
    );
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true }, { status: 200 });
  });

  it("returns 400 if name is missing", async () => {
    const mockReq = createMockRequest({
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Missing required fields" },
      { status: 400 }
    );
    expect(mockTransporter.sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 if email is missing", async () => {
    const mockReq = createMockRequest({
      name: "John Doe",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Missing required fields" },
      { status: 400 }
    );
  });

  it("returns 400 if subject is missing", async () => {
    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      message: "Test message",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Missing required fields" },
      { status: 400 }
    );
  });

  it("returns 400 if message is missing", async () => {
    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Missing required fields" },
      { status: 400 }
    );
  });

  it("returns 500 if SMTP_HOST is missing", async () => {
    delete process.env.SMTP_HOST;

    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "SMTP configuration error" },
      { status: 500 }
    );
  });

  it("returns 500 if SMTP connection fails", async () => {
    mockTransporter.verify.mockRejectedValue(new Error("Connection failed"));

    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "SMTP connection failed", details: "Connection failed" },
      { status: 500 }
    );
    expect(mockTransporter.sendMail).not.toHaveBeenCalled();
  });

  it("returns 500 if email sending fails", async () => {
    mockTransporter.sendMail.mockRejectedValue(new Error("Send failed"));

    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Send failed" },
      { status: 500 }
    );
  });

  it("creates transporter with correct SMTP config", async () => {
    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.test.com",
        port: 465,
        secure: true,
        auth: {
          user: "test@test.com",
          pass: "testpass",
        },
      })
    );
  });

  it("includes sender info in email text", async () => {
    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message content",
    });

    await POST(mockReq);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: "From: John Doe (john@example.com)\n\nTest message content",
      })
    );
  });

  it("uses SMTP_FROM when provided instead of SMTP_USER", async () => {
    process.env.SMTP_FROM = "custom@example.com";

    const mockReq = createMockRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    });

    await POST(mockReq);

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: '"John Doe" <custom@example.com>',
      })
    );
  });
});
