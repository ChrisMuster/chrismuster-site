Overview

This project is a Next.js app written in TypeScript. The root package.json defines scripts for running the dev server with Turbopack (npm run dev), building the site, linting, and executing Jest tests. Tailwind CSS provides utility-based styling. The repository also includes ESLint configuration and React Testing Library setup for unit and integration tests.

Project structure

app/                - Next.js app directory (pages, API routes, components)
app/api/send-email/ - API route that sends form data using nodemailer
app/components/     - Reusable UI components (accordion, battleship, etc.)
app/page-components - Higher-level page sections built from components
app/data/           - JSON data used by pages and tests
public/             - Static assets such as images and PDFs
tests/              - Jest test suites and MSW mock handlers
utils/              - Helper functions (e.g., capitalize, scrollToSection)
TypeScript path aliases are configured in tsconfig.json so imports can use @/ prefixes. Jest uses the same aliases via moduleNameMapper in jest.config.ts. The global Jest setup mocks Next.js components and configures MSW (Mock Service Worker) so tests can intercept network requests.

Key features

Global styles and Tailwind
The app/globals.css file defines CSS variables for light/dark themes. Tailwind’s configuration (tailwind.config.ts) extends colors, breakpoints, and custom padding/margin utilities, plus a text-shadow plugin.
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Roboto.

Layout and pages
app/layout.tsx establishes metadata, fonts, and a layout component that wraps each page. High‑level page content is composed from “page-components”; for example, contact uses tabs, a PDF viewer, and an email form.

Components
Reusable pieces live in app/components. Highlights include:

Accordion for expandable content.

RPSLSGame and Battleship games with their own hooks (useShips, useGameState).

UI elements such as Card, Modal, and GalleryCarousel.

API route
app/api/send-email/route.ts handles POST requests from the contact form, constructs a nodemailer transporter, verifies SMTP settings, and sends the email. Environment variables for SMTP credentials must be provided when running locally.

Testing
Jest tests cover components and hooks. MSW handlers in tests/mocks mock API requests like /api/send-email. An integration test (useShips.integration.test.tsx) repeatedly generates ship placements to ensure there are no overlaps.

Suggested next steps

Run the dev server: npm run dev.

Open http://localhost:3000 in your browser to see the result while you develop.

Explore component props and page composition to learn how reusable pieces fit together.

Review the tests under tests/ for examples of React Testing Library and MSW in action.

Study the Tailwind config and global styles to understand theming and responsive design.

Check SMTP environment variables if you want to test the email route locally.

This structure gives you modular components (app/components), higher-level page sections (app/page-components), and supportive utilities (utils, tests). Examining these areas will help you extend the site or learn how a real-world Next.js project is organized.
