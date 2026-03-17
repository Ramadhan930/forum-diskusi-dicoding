# Repository Guidelines

## Project Structure & Module Organization
This is a **React + Vite** forum application using **Redux Toolkit** and **React Router**.
- **`src/states/`**: Centralized Redux state management. Each slice is located in its own directory (e.g., `threads/slice.js`) which contains the slice definition, actions, and thunks. The store is configured in `src/states/index.js`.
- **`src/pages/`**: Route-level components. Each page represents a primary application view.
- **`src/components/`**: Reusable UI components. Components should use `.jsx` extensions.
- **`src/hooks/`**: Custom React hooks for shared logic across components.
- **`src/utils/api.js`**: Core API client for backend communication using `fetch`.

## Build, Test, and Development Commands
- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`
- **Run tests**: `npx vitest` (Note: `vitest` is not currently in `package.json` but is used for existing tests).

## Coding Style & Naming Conventions
- **ESLint**: Enforced via `eslint.config.js`. It uses recommended rules for React and React Hooks.
- **Styling**: Single quotes are required (`quotes: ['error', 'single']`), semicolons are required (`semi: ['error', 'always']`), and indentation is set to **2 spaces**.
- **React Components**: Use `.jsx` extension and PascalCase for filenames.
- **Logic/Utilities**: Use `.js` extension and camelCase for filenames.
- **Props**: Use `prop-types` for component property validation as it is a project dependency.

## Testing Guidelines
The project uses **Vitest** for unit testing, particularly for Redux reducers.
- **Run all tests**: `npx vitest run`
- **Watch tests**: `npx vitest`
- **Test location**: Tests are co-located with their respective modules using the `.test.js` suffix (e.g., `src/states/threads/reducer.test.js`).

## Commit & Pull Request Guidelines
- **Message Format**: Follow clear, concise commit messages (e.g., "add thread detail functionality").
- **Quality Control**: Always run `npm run lint` before committing to ensure adherence to style guidelines.
