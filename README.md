# Angular Portfolio

This repository contains an Angular 20 application used as a personal portfolio site. The project showcases modular architecture, internationalization through `ngx-translate`, and styling powered by Tailwind CSS.

## Features

- Angular 20 with TypeScript
- Modular structure with feature and shared modules
- Tailwind CSS for utility-first styling
- Translation support via `@ngx-translate/core`

## Development

Dependencies install with `pnpm install`. The development server runs with `pnpm start` and serves the application at `http://localhost:4200/`.

Code formatting and linting are managed through Prettier and ESLint. Static checks run using `pnpm lint`. Unit tests execute with `pnpm test`.

## Building for Production

`pnpm build:prod` generates an optimized build in the `dist` directory. The resulting output is ready for deployment behind any static file server or the provided NGINX configuration.

## Project Structure

- `src/app` – application source organized into core, features, layouts, pages, and shared modules
- `src/assets` – static assets such as images and translation files
- `src/environments` – build-time environment configurations

## License

This project is released without an explicit license. All rights reserved.
