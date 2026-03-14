# Repository Guidelines

## Project Structure & Module Organization
This is a **React + Vite** forum application using **Redux Toolkit** for state management and **React Router** for navigation.

- **`src/states/`**: Centralized Redux state management. Each slice is organized into its own subdirectory (e.g., `authUser`, `threads`) containing actions and reducers, all unified in `index.js`.
- **`src/pages/`**: High-level page components representing application routes.
- **`src/components/`**: Reusable UI components.
- **`src/hooks/`**: Custom React hooks for shared logic (e.g., `useInput`).
- **`src/utils/`**: Core utilities, including the `api.js` client for backend communication.

## Build, Test, and Development Commands
The project uses `npm` for dependency management.
- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Coding Style & Naming Conventions
- **ESLint**: Enforced via `eslint.config.js`. It uses recommended rules for React and React Hooks.
- **Custom Rule**: `no-unused-vars` is configured to ignore variables starting with a capital letter or underscore (`^[A-Z_]`), which is often used for React components or constants.
- **Module Type**: The project uses **ES Modules** (`"type": "module"` in `package.json`).
- **File Extensions**: Use `.jsx` for components and `.js` for logic/utilities.

## Testing Guidelines
No automated testing framework is currently configured in `package.json`. Manual verification via `npm run dev` is the primary method for ensuring functionality.

## Architecture Overview
The application follows a standard Redux architecture where business logic is encapsulated in **thunks** within the `states/` directory. API calls are abstracted in `utils/api.js` to keep components focused on UI rendering.
