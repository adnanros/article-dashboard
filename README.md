// README.md
# Article Dashboard

A simple, accessible article dashboard built with **React** and **TypeScript**. It demonstrates CRUD operations, UI filtering, and testing using MirageJS and React Testing Library.

## Features
- List, search, filter articles by status
- Create, edit, delete articles via modal
- Form validation (required fields)
- Accessibility: keyboard navigation, semantic HTML
- Reusable UI components
- MirageJS for mock backend
- Unit and integration testing

## Tech Stack
- React + TypeScript
- MirageJS (mock API)
- React Router
- Tailwind CSS (optional)
- React Testing Library

## Setup
```bash
npm install
npm start
```

## Run Tests
```bash
npm test
```

## Folder Structure
```
src/
 components/     // Reusable UI components
 context/        // React context for articles
 pages/          // Page-level components
 services/       // MirageJS setup
 hooks/          // Custom React hooks
 tests/          // Unit & integration tests
 types.ts        // TypeScript interfaces
```

## License
MIT