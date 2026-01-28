---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx"
---
# Jest test rules for GitHub Copilot

- Tests must use Jest (do not switch frameworks or introduce alternatives).
- Keep tests deterministic and independent (no hidden ordering dependencies).
- Prefer @testing-library/user-event for user interactions when using React Testing Library.
- Avoid brittle selectors; prefer role/label/text, and use data-testid only when necessary.
- If behaviour changes, update/extend tests to explicitly cover the new behaviour.
- Do not change global test setup/mocks unless the test failure requires it; keep diffs minimal.
- Use descriptive test names that clearly state the expected behaviour.
- Mock external services and APIs to avoid network calls in tests.
- Ensure tests are readable and maintainable; avoid complex logic in test code.
- Provide commands to run the tests and any setup steps if non-standard.
- Ensure code coverage remains adequate; do not decrease coverage without justification.
- Follow existing test patterns and conventions in the codebase.
- Ensure all tests pass before finalizing changes.
- Do not introduce new testing libraries or frameworks unless explicitly requested.
