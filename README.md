# static-vue3-frontend-skeleton

This template should help get you started developing with Vue 3 and Azure SSO.

## Project Setup

```sh
npm install
```

### Docker Commands
In the project root run the following: 
docker build -t websites/static-vue3-frontend-skeleton .
docker run -it -p 8080:80 --rm --name static-vue3-frontend-1  websites/static-vue3-frontend-skeleton


### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Dockerizing Vue3 Apps
https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app
