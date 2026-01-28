# Repository coding rules for GitHub Copilot

## Version awareness and upgrades
- Before suggesting any change, check the currently used versions in package.json and lockfiles (Next.js, React, Node, TypeScript, Tailwind, styled-components, etc.).
- All recommendations must match the currently installed versions unless an upgrade is necessary or explicitly requested.
- If an upgrade is requested (especially a major version), provide a safe upgrade plan:
  - Use official codemods where available.
  - Make changes in small, reviewable commits.
  - Update Node/TypeScript/tooling requirements if needed.
  - Run and report the validation steps: lint, typecheck, tests, build, and a basic runtime smoke test.

## Minimal diffs and change discipline
- Prefer minimal diffs.
- Avoid formatting-only churn.
- Do not reorder imports or rewrite blocks unless required.

## Dependencies
- Don’t add new dependencies for small tasks; use existing utilities first.
- Do not introduce new libraries or change architectural patterns unless requested.

## Code clarity and readability
- No one-line if statements. Always use braces and multi-line blocks.
- Ternary operators are allowed only when they improve clarity (not for shortening).
- Prefer straightforward code over clever code.

## Naming conventions
- No unnecessary abbreviations.
- Use meaningful names (index instead of i, event instead of e, organisation instead of org unless org is already established in the codebase).
- Prefer descriptive constant and variable names that explain intent.

## Behaviour, styling, and performance
- No silent behaviour changes: if a change alters behaviour, say so explicitly and update tests.
- No mixed styling approaches: don’t convert between Tailwind/styled-components/CSS modules unless asked.
- Performance basics:
  - Avoid unnecessary re-renders.
  - Don’t mark components as client unless required.

## Project conventions and consistency
- Follow the existing patterns in this repository (folder structure, styling approach, utilities, naming, and component patterns).
- Do not refactor unrelated code while making a fix.

## JavaScript/TypeScript rules
- Do not use require(). Use ESM imports only, except for where an exception to this rule is listed.
- The jest.globals.js needs to use require() for proper loading order in Jest's global setup. This is a special case where require() is needed.
- Avoid any/unknown unless necessary; prefer correct, explicit types.

## UI and accessibility
- Preserve existing UI behaviour unless the change request says otherwise.
- Prefer semantic HTML and accessible patterns (ARIA only when needed).
- Ensure interactive elements have accessible names (labels/aria-labels) when relevant.

## Testing and quality gates (Jest)
- Use Jest and the repository’s existing test patterns.
- Update or add tests when behaviour changes.
- Provide the exact commands to validate the change (lint, typecheck, tests, build).
- Ensure code coverage does not decrease unless justified.
- Do not introduce new testing libraries or frameworks unless requested.
- Ensure all quality gates pass before finalizing changes.
