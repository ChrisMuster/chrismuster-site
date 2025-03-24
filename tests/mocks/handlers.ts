// app/tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock the email submission endpoint
  http.post('/api/send-email', async () => {
    return HttpResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  }),
];
