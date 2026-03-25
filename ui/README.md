# Mini CRM UI

Vite + React frontend for auth and notes management, styled to match the provided Figma references.

## Stack

- React + Vite
- React Router
- Axios
- Tailwind CSS
- Vitest + React Testing Library
- Playwright

## Setup

1. Install dependencies:
	npm install
2. Create environment file (optional):
	.env with VITE_API_URL=http://localhost:5000/api
3. Run dev server:
	npm run dev

UI runs on http://localhost:5173 by default.

## Scripts

- npm run dev: Start Vite dev server
- npm run build: Build production assets
- npm run preview: Preview build
- npm run test: Run unit tests
- npm run test:e2e: Run Playwright e2e tests

## Features

- Login page and register page matching reference style
- Notes list page matching reference dashboard/card layout
- Add/Edit note pages with consistent design system
- Protected routes with token persistence
- Logout flow
- Loading, error, empty, and delete confirmation states

## Testing

- Unit tests for shared components and auth/note utility logic
- E2E tests for login, create note, and delete note flows

## Folder Structure

- src/auth: auth pages, services, context, storage utils
- src/notes: notes pages, components, services, utilities
- src/shared/ui: reusable Button, Input, Modal, Tag
- src/shared/layout: auth and app shell layouts
- src/shared/api: Axios client
