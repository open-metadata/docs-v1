---
title: Playwright Integration Tests | Official Documentation
description: Setup Playwright test framework and configure automated end-to-end test suite for validating platform components.
slug: /developers/contribute/build-code-and-run-tests/playwright-integration-tests
---

# Playwright Integration Tests

## Pre-requisites

Before proceeding, ensure that you have:

1. **Completed the OpenMetadata UI setup** - Follow all pre-requisites in the [OpenMetadata UI](/developers/contribute/build-code-and-run-tests/openmetadata-ui) section, which covers Node.js, Yarn, and other dependencies.

2. **Services running** - Playwright tests require all OpenMetadata services to be running in a clean state, including Elastic Search, Airflow, and MySQL database.

### Starting Required Services

The quickest way to bring all services up and running locally is to use the Docker script:

```shell
sh docker/run_local_docker.sh
```

## Installing Playwright

After completing the UI setup, install Playwright and its browsers:

```shell
cd openmetadata-ui/src/main/resources/ui
# Install dependencies (if not already done during UI setup)
yarn install
# Install Playwright browsers (required for running tests)
yarn playwright install
```

> **Note:** The Playwright browser installation is only needed once per machine. These browsers are used to run tests in different browser environments (Chromium, Firefox, WebKit).

## Running Playwright Tests

### Running Tests in Headless Mode

To run all tests in headless mode (without browser UI):

```shell
yarn playwright:run
```

### Running Tests with UI Mode

For interactive debugging and test development, use the Playwright UI mode:

```shell
yarn playwright:open
```

This will open the Playwright Test Runner UI where you can:

- View all available tests
- Run individual tests or test suites
- Debug tests with breakpoints
- View test traces and screenshots
- Inspect the DOM during test execution

### Running Specific Tests

To run a specific test file:

```shell
yarn playwright test <test-file-name>
# Example:
yarn playwright test auth.setup.ts
```

To run tests matching a specific pattern:

```shell
yarn playwright test --grep "<pattern>"
# Example:
yarn playwright test --grep "login"
```

### Running Tests on Different Browsers

Playwright supports testing on multiple browsers:

```shell
# Run on specific browser
yarn playwright test --project=chromium
yarn playwright test --project=firefox
yarn playwright test --project=webkit

# Run on all browsers
yarn playwright test --project=chromium --project=firefox --project=webkit
```

### Running Tests by Category

Run tests from specific directories:

```shell
# Run all feature tests
yarn playwright test e2e/Features/

# Run all flow tests
yarn playwright test e2e/Flow/

# Run all page tests
yarn playwright test e2e/Pages/

# Run nightly tests (long-running tests)
yarn playwright test e2e/nightly/
```

### Excluding Tests

The configuration excludes certain tests by default:

- Nightly tests are excluded from regular test runs (`testIgnore: ['**/nightly/**']`)
- Data Insight tests run in a separate project with dependencies

## Test Structure and Organization

### Test Directory Structure

```
playwright/
├── e2e/                    # End-to-end test files
│   ├── auth.setup.ts      # Authentication setup
│   ├── auth.teardown.ts   # Authentication cleanup
│   ├── Features/          # Feature-specific tests
│   ├── Flow/              # User flow tests
│   ├── Pages/             # Page-specific tests
│   ├── VersionPages/      # Version-related tests
│   └── nightly/           # Nightly build tests
├── constant/              # Test constants and configurations
├── support/               # Support classes and utilities
├── utils/                 # Utility functions for tests
└── output/               # Test results and artifacts
    ├── test-results/     # Test execution results
    └── playwright-report/ # HTML reports
```

### Test Categories

Tests are organized into logical categories:

- **Features**: Tests for specific features (e.g., ActivityFeed, BulkImport, Permissions)
- **Flow**: End-to-end user workflows (e.g., AddRoleAndAssignToUser, GlobalSearch)
- **Pages**: Tests for individual pages (e.g., Login, Teams, DataInsight)
- **VersionPages**: Tests for entity version management
- **Nightly**: Long-running tests executed in nightly builds

### Writing New Tests

Create a new test file in the `playwright/e2e` directory:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup code before each test
    await page.goto("/");
  });

  test("should perform expected behavior", async ({ page }) => {
    // Test implementation
    await page.click('button[data-testid="submit"]');
    await expect(page.locator(".success-message")).toBeVisible();
  });
});
```

## Debugging Tests

### Using Debug Mode

```shell
# Run tests in debug mode
yarn playwright test --debug
```

### Using Playwright Inspector

```shell
# Pause execution at a specific point
PWDEBUG=1 yarn playwright test
```

### Generating Test Code

Playwright provides a code generator to help create tests:

```shell
yarn playwright:codegen
```

This will open a browser where you can interact with your application, and Playwright will generate the corresponding test code.

## Test Reports and Artifacts

### Viewing HTML Reports

After running tests, view the detailed HTML report:

```shell
yarn playwright show-report
```

### Test Artifacts

Playwright automatically captures:

- Screenshots on failure
- Test traces for debugging
- Videos of test execution (configurable)

Artifacts are stored in `playwright/output/test-results/`

## Configuration

The Playwright configuration is defined in `playwright.config.ts`. Key configuration options include:

- **Test directory**: `./playwright/e2e`
- **Base URL**: Default `http://localhost:8585` (configurable via `PLAYWRIGHT_TEST_BASE_URL`)
- **Parallel execution**: Tests run in parallel by default
- **Retries**: Configured for CI environments (1 retry on CI, 0 locally)
- **Workers**: 4 workers on CI, system default locally
- **Reporters**: List, HTML, GitHub Actions, and Blob reporters
- **Timeout**: 60 seconds per test (configurable)
- **Traces**: Captured on first retry
- **Screenshots**: Captured on failure only

### Environment Variables

You can configure test behavior using environment variables:

```shell
# Set base URL for tests
export PLAYWRIGHT_TEST_BASE_URL=http://localhost:8585

# Run in CI mode (enables retries and specific configurations)
export CI=true

# Run tests
yarn playwright:run
```

### Test Projects

The configuration includes several test projects:

- **setup**: Authentication setup that runs before tests
- **restore-policies**: Cleanup that runs after tests
- **chromium**: Main test suite on Chrome
- **data-insight-application**: Data Insight app setup
- **Data Insight**: Tests specific to Data Insight features

## CI/CD Integration

For CI environments, tests are configured to:

- Run with retries on failure
- Use optimized parallel execution
- Generate GitHub Actions compatible reports
- Fail fast on test.only() in source code

```shell
# CI-specific execution
CI=true yarn playwright:run
```

## Troubleshooting

### Common Issues and Solutions

1. **Tests failing due to stale data**

   - Reset the database to a clean state
   - Restart the OpenMetadata server

   ```shell
   # Find the distribution tar file
   cd openmetadata-dist/target/
   tar -xzf openmetadata-$VERSION.tar.gz
   # Execute drop-create-all command as described in deployment docs
   # Restart the server
   ```

2. **Browser installation issues**

   ```shell
   # Reinstall Playwright browsers
   yarn playwright install --force
   ```

3. **Authentication failures**

   - Clear the auth storage state

   ```shell
   rm -rf playwright/.auth/
   ```

4. **Timeout issues**

   - Increase timeout in playwright.config.ts
   - Check if services are fully started before running tests

5. **Flaky tests**
   - Use Playwright's built-in retry mechanism
   - Ensure proper wait conditions in tests
   - Use data-testid attributes for reliable element selection

## Best Practices

1. **Use Page Object Model**: Organize page interactions in separate classes
2. **Data-testid attributes**: Use consistent test IDs for element selection
3. **Avoid hard-coded waits**: Use Playwright's built-in wait conditions
4. **Clean test data**: Ensure tests clean up after themselves
5. **Parallel execution**: Write tests to be independent and parallelizable
6. **Meaningful assertions**: Use descriptive assertion messages
7. **Reusable utilities**: Create utility functions for common operations

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [OpenMetadata Testing Guidelines](/developers/contribute/build-code-and-run-tests)
