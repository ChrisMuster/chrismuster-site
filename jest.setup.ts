// jest.setup.ts

import '@testing-library/jest-dom';
import React from "react";
import { server } from '@/tests/mocks/server';

// MSW setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Suppress specific console warnings that are expected/harmless
const originalError = console.error;
const originalLog = console.log;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    
    // Suppress known harmless warnings
    if (
      message.includes('Received `true` for a non-boolean attribute `priority`') ||
      // Suppress act() warnings from Next.js loadable components (LoadableComponent, loadable-shared-runtime)
      // These are library internal state updates that we can't control
      (message.includes('not wrapped in act(...)') && 
       (message.includes('LoadableComponent') || message.includes('loadable')))
    ) {
      return;
    }
    
    // Suppress intentional error testing in API/form tests
    if (
      message.includes('Validation Error: Missing required fields') ||
      message.includes('Missing SMTP configuration') ||
      message.includes('SMTP Connection Failed:') ||
      message.includes('Nodemailer Send Error:') ||
      message.includes('Error sending email:')
    ) {
      return;
    }
    
    originalError.call(console, ...args);
  };

  console.log = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    
    // Suppress SMTP test logs (they're intentional test output)
    if (
      message.includes('SMTP Connection Verified') ||
      message.includes('Email Sent Successfully')
    ) {
      return;
    }
    
    originalLog.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.log = originalLog;
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fill: _fill,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priority: _priority,
    ...rest
  }: {
    src: string;
    alt?: string;
    fill?: boolean;
    priority?: boolean;
    [key: string]: unknown;
  }) => {
    return React.createElement("img", { src, alt, ...rest });
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));
