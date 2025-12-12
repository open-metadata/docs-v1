---
title: TestRunner - Running Table-Level Tests
description: Execute data quality tests against tables in OpenMetadata using the TestRunner API
slug: /how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner
---

# TestRunner - Running Table-Level Tests

The `TestRunner` class provides a fluent API for executing data quality tests against tables cataloged in OpenMetadata. It automatically fetches table metadata and service connections, allowing you to run tests with minimal configuration.

## Table of contents
- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Complete Example](#complete-example)
- [Running Tests from OpenMetadata's UI](#running-tests-from-openmetadata-ui)
- [Customizing Test Metadata](#customizing-test-metadata)
- [Configuring Row Count Computation](#configuring-row-count-computation)
- [Test Runner Configuration](#test-runner-configuration)
- [Understanding Test Results](#understanding-test-results)
- [Integration with ETL Workflows](#integration-with-etl-workflows)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Using External Secrets Managers](#using-external-secrets-managers)
- [Next Steps](#next-steps)

{% note %}
⚠️ If you're using Collate Cloud to run OpenMetadata, please refer to the section about [External Secrets Managers](#using-external-secrets-managers) 
{% /note %}

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

## Using External Secrets Managers

### Important Note

If your OpenMetadata instance uses **database-stored credentials** (the default configuration), you do not need to follow this guide. The SDK will automatically retrieve and decrypt credentials.

This guide is only necessary when your organization uses an **external secrets manager** for credential storage.

### Why This is Required

The `TestRunner` API executes data quality tests directly from your Python code (e.g., within your ETL pipelines). To connect to your data sources, it needs to:

1. Retrieve the service connection configuration from OpenMetadata
2. Decrypt the credentials stored in your secrets manager
3. Establish a connection to the data source
4. Execute the test cases

Without proper secrets manager configuration, the SDK cannot decrypt credentials and will fail to connect to your data sources.

### General Setup Steps

1. **Contact your OpenMetadata/Collate administrator** to obtain:
    - The secrets manager type (AWS, Azure, GCP, etc.)
    - The secrets manager loader configuration
    - Required environment variables or configuration files
    - Any additional setup (IAM roles, service principals, etc.)

2. **Install required dependencies** for your secrets manager provider

3. **Configure environment variables** with access credentials

4. **Initialize the SecretsManagerFactory** before using TestRunner

5. **Configure the SDK** and run your tests

### Example using AWS Secrets Manager

**Required Dependencies:**
```bash
pip install "openmetadata-ingestion[aws]>=1.11.0.0"
```

**Example Configuration:**
```python
import os

from metadata.generated.schema.security.secrets.secretsManagerClientLoader import SecretsManagerClientLoader
from metadata.generated.schema.security.secrets.secretsManagerProvider import SecretsManagerProvider
from metadata.sdk import configure
from metadata.sdk.data_quality import TestRunner
from metadata.utils.secrets.secrets_manager_factory import SecretsManagerFactory

# Set AWS credentials and region
os.environ["AWS_ACCESS_KEY_ID"] = "your-access-key-id"
os.environ["AWS_SECRET_ACCESS_KEY"] = "your-secret-access-key"
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"  # Your AWS region

# Initialize secrets manager (must be done before configure())
SecretsManagerFactory(
    secrets_manager_provider=SecretsManagerProvider.managed_aws,
    secrets_manager_loader=SecretsManagerClientLoader.env,
)

# Configure OpenMetadata SDK
configure(
    host="https://your-openmetadata-instance.com/api",
    jwt_token="your-jwt-token",
)

# Use TestRunner as normal
runner = TestRunner.for_table("MySQL.production.database.my_table")
results = runner.run()
```

### Configuration by Provider

#### AWS and AWS Parameters Store

**OpenMetadata's ingestion extras**: `aws` (e.g `pip install 'openmetadata-ingestion[aws]'`)

**SecretsManagerProvider: (one of)**
- `SecretsManagerProvider.aws`
- `SecretsManagerProvider.managed_aws`
- `SecretsManagerProvider.aws_ssm`
- `SecretsManagerProvider.managed_aws_ssm`

**Environment variables:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_DEFAULT_REGION`

#### Azure Key Vault

**OpenMetadata's ingestion extras**: `azure` (e.g `pip install 'openmetadata-ingestion[azure]'`)

**SecretsManagerProvider: (one of)**
- `SecretsManagerProvider.azure_kv`
- `SecretsManagerProvider.managed_azure_kv`

**Environment variables:**
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_KEY_VAULT_NAME`

#### Google Cloud Secret Manager

**OpenMetadata's ingestion extras**: `gcp` (e.g `pip install 'openmetadata-ingestion[gcp]'`)

**SecretsManagerProvider:** `SecretsManagerProvider.gcp`

**Environment variables:**
- `GOOGLE_APPLICATION_CREDENTIALS`: path to the file with the credentials json file
- `GCP_PROJECT_ID`

### Troubleshooting

#### Error: "Cannot decrypt service connection"

**Cause**: Secrets manager not initialized or misconfigured

**Solution**: Ensure `SecretsManagerFactory` is initialized **before** calling `configure()` or creating the `TestRunner`

#### Error: "Access Denied" or "Unauthorized"

**Cause**: Insufficient permissions to access secrets

**Solution**:
- Verify IAM role/service principal has correct permissions
- Check credentials are valid and not expired
- Ensure correct region/vault name is specified

#### Error: "Module not found" for secrets manager

**Cause**: Missing dependencies for your secrets manager

**Solution**: Install required extras:
```bash
# For AWS
pip install "openmetadata-ingestion[aws]"

# For Azure
pip install "openmetadata-ingestion[azure]"

# For GCP
pip install "openmetadata-ingestion[gcp]"
```

#### Tests Fail with Connection Errors

**Cause**: Credentials not properly decrypted or secrets manager misconfigured

**Solution**:
1. Verify secrets manager provider matches your OpenMetadata backend configuration
2. Test credential access independently (e.g., using AWS CLI, Azure CLI, gcloud)
3. Check network connectivity to secrets manager service
4. Enable debug logging to see detailed error messages:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Contact Your Administrator

If you're unsure about:
- Which secrets manager your organization uses
- Required environment variables or configuration
- Access credentials or IAM roles
- Permissions needed

**Contact your OpenMetadata or Collate administrator** for the specific configuration required in your environment.

## Next Steps

- Learn about [DataFrame Validation](/how-to-guides/data-quality-observability/quality/data-quality-as-code/dataframe-validation) for validating transformations
- Review the [Test Definitions Reference](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-definitions) for all available tests
- Explore [Advanced Usage](/how-to-guides/data-quality-observability/quality/data-quality-as-code/advanced-usage) including YAML workflows
