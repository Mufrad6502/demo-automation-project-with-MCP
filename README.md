# Playwright Project

[![Playwright Tests](https://github.com/Mufrad6502/demo-automation-project-with-MCP/actions/workflows/playwright.yml/badge.svg)](https://github.com/Mufrad6502/demo-automation-project-with-MCP/actions/workflows/playwright.yml)

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

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your actual credentials. You can get the test credentials from:
   - https://www.saucedemo.com/ (for public test users)
   - Your team lead or project documentation (for private credentials)

   IMPORTANT: 
   - Never commit the `.env` file to the repository
   - Never share your credentials in public
   - If you accidentally commit credentials, change them immediately

4. Run the tests:
   ```bash
   npx playwright test
   ```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The workflow:

- Runs on every push to main branch
- Runs on every pull request to main branch
- Installs dependencies and Playwright
- Sets up environment variables from GitHub Secrets
- Runs all tests
- Uploads test reports as artifacts

### Setting up GitHub Secrets

Before the CI can run tests, you need to set up these secrets in your GitHub repository:

1. Go to your repository settings
2. Navigate to Secrets and Variables > Actions
3. Add the following secrets:
   - `STANDARD_USER`
   - `STANDARD_PASSWORD`
   - `LOCKED_USER`
   - `LOCKED_PASSWORD`
   - `PROBLEM_USER`
   - `PROBLEM_PASSWORD`
   - `PERFORMANCE_USER`
   - `PERFORMANCE_PASSWORD`

### Test Reports

After each test run, a test report is generated and uploaded as an artifact. You can:
1. Go to the Actions tab in your repository
2. Click on the workflow run
3. Download the playwright-report artifact
4. Extract and open `playwright-report/index.html` in your browser

## Usage Guidelines

- Add your test cases in the `tests/e2e/` directory.
- Use the `tests/fixtures/test-data.ts` file to define any mock data or utility functions needed for your tests.
- Modify the `playwright.config.ts` file to adjust settings as necessary.

## License

This project is licensed under the MIT License.