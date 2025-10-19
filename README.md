# Playwright Project

This project is set up for automation testing using Playwright. It includes example tests and configurations to help you get started with end-to-end testing.

## Project Structure

- `tests/`: Contains all the test files.
  - `e2e/`: End-to-end tests.
  - `fixtures/`: Test data and utility functions.
- `playwright.config.ts`: Configuration file for Playwright.
- `package.json`: Lists dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd playwright-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the tests:
   ```bash
   npx playwright test
   ```

## Usage Guidelines

- Add your test cases in the `tests/e2e/` directory.
- Use the `tests/fixtures/test-data.ts` file to define any mock data or utility functions needed for your tests.
- Modify the `playwright.config.ts` file to adjust settings as necessary.

## License

This project is licensed under the MIT License.