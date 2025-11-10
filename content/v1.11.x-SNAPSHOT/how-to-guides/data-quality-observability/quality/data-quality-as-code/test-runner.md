---
title: TestRunner - Running Table-Level Tests
description: Execute data quality tests against tables in OpenMetadata using the TestRunner API
slug: /how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner
---

# TestRunner - Running Table-Level Tests

The `TestRunner` class provides a fluent API for executing data quality tests against tables cataloged in OpenMetadata. It automatically fetches table metadata and service connections, allowing you to run tests with minimal configuration.

## Overview

TestRunner enables you to:

- Execute tests defined in code against cataloged tables
- Run tests previously configured in the OpenMetadata UI
- Load test definitions from YAML workflow files
- Validate data at the table and column levels
- Get detailed test results for programmatic handling

## Basic Usage

### Creating a TestRunner

Create a runner for a specific table using its fully qualified name (FQN):

```python
from metadata.sdk import configure
from metadata.sdk.data_quality import TestRunner

# Configure SDK first
configure(
    host="http://localhost:8585/api",
    jwt_token="your-jwt-token"
)

# Create runner for a table
runner = TestRunner.for_table("MySQL.ecommerce.public.customers")
```

The table FQN format is: `{service}.{database}.{schema}.{table}`

### Adding Tests

Add test definitions to the runner:

```python
from metadata.sdk.data_quality import (
    TableRowCountToBeBetween,
    ColumnValuesToBeNotNull,
    ColumnValuesToBeUnique
)

# Add a table-level test
runner.add_test(
    TableRowCountToBeBetween(min_count=1000, max_count=100000)
)

# Add column-level tests
runner.add_test(
    ColumnValuesToBeNotNull(column="email")
)

runner.add_test(
    ColumnValuesToBeUnique(column="customer_id")
)
```

### Adding Multiple Tests

Use `add_tests()` to add several tests at once:

```python
runner.add_tests(
    TableRowCountToBeBetween(min_count=1000),
    ColumnValuesToBeNotNull(column="email"),
    ColumnValuesToBeUnique(column="customer_id"),
    ColumnValuesToMatchRegex(
        column="email",
        regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    )
)
```

### Running Tests

Execute all configured tests:

```python
results = runner.run()

# Process results
for result in results:
    test_case = result.testCase
    test_result = result.testCaseResult

    print(f"Test: {test_case.name.root}")
    print(f"Status: {test_result.testCaseStatus}")
    print(f"Result: {test_result.result}")
```

## Complete Example

Here's a complete example of testing a customer table:

```python
from metadata.sdk import configure
from metadata.sdk.data_quality import (
    TestRunner,
    TableRowCountToBeBetween,
    ColumnValuesToBeNotNull,
    ColumnValuesToBeUnique,
    ColumnValuesToMatchRegex,
    ColumnValuesToBeBetween
)

# Configure SDK
configure(
    host="http://localhost:8585/api",
    jwt_token="your-jwt-token"
)

# Create runner
runner = TestRunner.for_table("MySQL.ecommerce.public.customers")

# Define data quality tests
runner.add_tests(
    # Table should have between 1000 and 1M customers
    TableRowCountToBeBetween(min_count=1000, max_count=1000000),

    # Required fields must not be null
    ColumnValuesToBeNotNull(column="customer_id"),
    ColumnValuesToBeNotNull(column="email"),
    ColumnValuesToBeNotNull(column="created_at"),

    # Customer ID must be unique
    ColumnValuesToBeUnique(column="customer_id"),

    # Email must match valid pattern
    ColumnValuesToMatchRegex(
        column="email",
        regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    ),

    # Age should be reasonable
    ColumnValuesToBeBetween(column="age", min_value=18, max_value=120)
)

# Run tests
results = runner.run()

# Handle results
all_passed = all(
    result.testCaseResult.testCaseStatus == "Success"
    for result in results
)

if all_passed:
    print("✓ All data quality tests passed!")
else:
    print("✗ Some tests failed:")
    for result in results:
        if result.testCaseResult.testCaseStatus != "Success":
            print(f"  - {result.testCase.name.root}: {result.testCaseResult.result}")
```

## Running Tests from OpenMetadata UI

Instead of defining tests in code, you can run tests that data stewards have configured in the OpenMetadata UI. This enables a collaborative workflow where:

- **Data stewards** define and maintain test criteria in the UI
- **Engineers** execute those tests automatically in pipelines

```python
from metadata.sdk.data_quality import TestRunner

# Create runner
runner = TestRunner.for_table("BigQuery.analytics.customer_360")

# Run all tests defined in OpenMetadata for this table
results = runner.run()

# The runner automatically executes all tests configured in the UI
for result in results:
    print(f"{result.testCase.name.root}: {result.testCaseResult.testCaseStatus}")
```

This approach ensures:
- Test definitions stay synchronized with business requirements
- Engineers don't need to modify code when test criteria change
- All stakeholders own data quality

## Customizing Test Metadata

You can customize test names, display names, and descriptions:

```python
from metadata.sdk.data_quality import ColumnValuesToBeNotNull

# Use fluent API for customization
test = ColumnValuesToBeNotNull(column="email") \
    .with_name("email_not_null_check") \
    .with_display_name("Email Not Null Validation") \
    .with_description("Ensures all customer records have valid email addresses")

runner.add_test(test)
```

Or pass values directly to the constructor:

```python
test = ColumnValuesToBeNotNull(
    column="email",
    name="email_not_null_check",
    display_name="Email Not Null Validation",
    description="Ensures all customer records have valid email addresses"
)
```

## Configuring Row Count Computation

Some tests support computing the number and percentage of rows that passed or failed:

```python
from metadata.sdk.data_quality import ColumnValuesToBeBetween

test = ColumnValuesToBeBetween(
    column="age",
    min_value=18,
    max_value=120
).with_compute_row_count(True)

runner.add_test(test)
```

This provides detailed metrics about test failures, useful for:
- Identifying the scope of data quality issues
- Prioritizing remediation efforts
- Tracking data quality trends over time

## Test Runner Configuration

Customize the test runner behavior using the `setup()` method:

```python
from metadata.generated.schema.metadataIngestion.workflow import LogLevels

runner = TestRunner.for_table("MySQL.ecommerce.public.orders")

# Configure runner behavior
runner.setup(
    force_test_update=True,        # Update existing tests
    log_level=LogLevels.DEBUG,     # Set logging level
    raise_on_error=False,          # Don't raise exceptions on errors
    success_threshold=90,          # Pass if 90% of tests succeed
    enable_streamable_logs=True    # Enable streamable log output
)

# Add and run tests
runner.add_test(TableRowCountToBeBetween(min_count=100))
results = runner.run()
```

### Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `force_test_update` | `bool` | `False` | Force update even if tests already exist |
| `log_level` | `LogLevels` | `INFO` | Logging level (DEBUG, INFO, WARN, ERROR) |
| `raise_on_error` | `bool` | `False` | Raise exceptions if test data already exists |
| `success_threshold` | `int` | `90` | Percentage threshold for overall success |
| `enable_streamable_logs` | `bool` | `False` | Enable streamable log output |

## Understanding Test Results

Test results contain detailed information about test execution:

```python
results = runner.run()

for result in results:
    # Test case information
    test_case = result.testCase
    print(f"Test Name: {test_case.name.root}")
    print(f"Test Type: {test_case.testDefinition.name}")

    # Test result information
    test_result = result.testCaseResult
    print(f"Status: {test_result.testCaseStatus}")  # Success, Failed, Aborted
    print(f"Result: {test_result.result}")           # Detailed result message
    print(f"Timestamp: {test_result.timestamp}")

    # Row-level statistics (if enabled)
    if test_result.passedRows is not None:
        print(f"Passed Rows: {test_result.passedRows}")
        print(f"Failed Rows: {test_result.failedRows}")
        print(f"Passed %: {test_result.passedRowsPercentage}")
```

### Test Status Values

- `Success`: Test passed all validation criteria
- `Failed`: Test did not meet validation criteria
- `Aborted`: Test execution was interrupted or could not complete

## Integration with ETL Workflows

Integrate TestRunner into your ETL pipelines:

```python
import pandas as pd
from sqlalchemy import create_engine
from metadata.sdk import configure
from metadata.sdk.data_quality import TestRunner, TableRowCountToBeBetween

# Configure SDK
configure(host="http://localhost:8585/api", jwt_token="token")

# ETL: Extract
source_df = pd.read_csv("data/customers.csv")

# ETL: Transform
transformed_df = transform_data(source_df)

# ETL: Load
engine = create_engine("postgresql://user:pass@localhost/db")
transformed_df.to_sql("customers", engine, if_exists="replace")

# Validate: Run data quality tests
runner = TestRunner.for_table("Postgres.analytics.public.customers")
runner.add_test(
    TableRowCountToBeBetween(min_count=len(transformed_df))
)
results = runner.run()

# Check results
if all(r.testCaseResult.testCaseStatus == "Success" for r in results):
    print("✓ Data quality validation passed")
else:
    print("✗ Data quality validation failed")
    # Optionally rollback or alert
    rollback_transaction()
```

## Error Handling

Handle potential errors gracefully:

```python
from metadata.sdk.data_quality import TestRunner

try:
    runner = TestRunner.for_table("MySQL.ecommerce.public.customers")
    runner.add_test(TableRowCountToBeBetween(min_count=100))
    results = runner.run()

except ValueError as e:
    print(f"Configuration error: {e}")
    # Table not found or service not configured

except Exception as e:
    print(f"Test execution failed: {e}")
    # Network issues, authentication problems, etc.
```

## Best Practices

1. **Use descriptive test names**: Make test failures easy to understand
   ```python
   test = TableRowCountToBeBetween(min_count=1000) \
       .with_name("daily_customer_count_check") \
       .with_description("Validates daily customer ingestion meets minimum threshold")
   ```

2. **Leverage UI-defined tests**: Let data stewards define test criteria
   ```python
   # Just run - no need to define tests in code
   runner = TestRunner.for_table("Table.FQN")
   results = runner.run()
   ```

3. **Handle results programmatically**: Don't just print - take action
   ```python
   if any(r.testCaseResult.testCaseStatus == "Failed" for r in results):
       rollback_transaction()
   ```

4. **Use appropriate thresholds**: Set realistic min/max values based on data patterns

5. **Combine table and column tests**: Ensure both structural and content quality

## Next Steps

- Learn about [DataFrame Validation](/how-to-guides/data-quality-observability/quality/data-quality-as-code/dataframe-validation) for validating transformations
- Review the [Test Definitions Reference](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-definitions) for all available tests
- Explore [Advanced Usage](/how-to-guides/data-quality-observability/quality/data-quality-as-code/advanced-usage) including YAML workflows
