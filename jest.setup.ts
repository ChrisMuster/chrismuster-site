// jest.setup.ts

import '@testing-library/jest-dom';
import React from "react";
import { server } from '@/tests/mocks/server';

// MSW setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fill: _fill,
    ...rest
  }: {
    src: string;
    alt?: string;
    fill?: boolean;
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
