---
title: Advanced Usage
description: Advanced patterns and configurations for Data Quality as Code
slug: /how-to-guides/data-quality-observability/quality/data-quality-as-code/advanced-usage
---

# Advanced Usage

This guide covers advanced patterns and configurations for Data Quality as Code, including loading tests from YAML files, customizing workflow configurations, and integrating with production systems.

## Loading Tests from YAML

You can load test definitions from YAML workflow files, enabling version-controlled test configurations:

### Basic YAML Loading

```python
from metadata.sdk.data_quality import TestRunner

# Load from YAML file
runner = TestRunner.from_yaml(file_path="tests/customer_quality.yaml")

# Or from YAML string
yaml_config = """
source:
  type: TestSuite
  serviceName: local_postgres
  sourceConfig:
    config:
      type: TestSuite
      entityFullyQualifiedName: Postgres.warehouse.public.customers

processor:
  type: orm-test-runner
  config:
    testCases:
      - name: customer_email_not_null
        testDefinitionName: columnValuesToBeNotNull
        columnName: email
      - name: customer_id_unique
        testDefinitionName: columnValuesToBeUnique
        columnName: customer_id

workflowConfig:
  openMetadataServerConfig:
    hostPort: http://localhost:8585/api
    authProvider: openmetadata
    securityConfig:
      jwtToken: your-token-here
"""

runner = TestRunner.from_yaml(yaml_string=yaml_config)

# Run the loaded tests
results = runner.run()
```

### Using OpenMetadata Connection from YAML

By default, `from_yaml()` uses the connection configured via `configure()`. To use the connection from the YAML file:

```python
runner = TestRunner.from_yaml(
    file_path="tests/config.yaml",
    use_connection_from_yaml=True
)
```

### YAML File Structure

A complete YAML configuration includes:

```yaml
source:
  type: TestSuite
  serviceName: postgres_production
  sourceConfig:
    config:
      type: TestSuite
      entityFullyQualifiedName: Postgres.analytics.public.user_events

processor:
  type: orm-test-runner
  config:
    forceUpdate: false
    testCases:
      # Table-level tests
      - name: table_row_count_validation
        testDefinitionName: tableRowCountToBeBetween
        parameterValues:
          - name: minValue
            value: "10000"
          - name: maxValue
            value: "1000000"

      # Column-level tests
      - name: user_id_not_null
        testDefinitionName: columnValuesToBeNotNull
        columnName: user_id

      - name: event_timestamp_format
        testDefinitionName: columnValuesToMatchRegex
        columnName: event_timestamp
        parameterValues:
          - name: regex
            value: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$"

workflowConfig:
  loggerLevel: INFO
  openMetadataServerConfig:
    hostPort: http://localhost:8585/api
    authProvider: openmetadata
    securityConfig:
      jwtToken: ${OPENMETADATA_JWT_TOKEN}
```

## Advanced TestRunner Configuration

### Customizing Workflow Behavior

```python
from metadata.sdk.data_quality import TestRunner
from metadata.generated.schema.metadataIngestion.workflow import LogLevels

runner = TestRunner.for_table("BigQuery.analytics.events.user_sessions")

# Configure detailed settings
runner.setup(
    force_test_update=True,           # Update existing test definitions
    log_level=LogLevels.DEBUG,        # Enable debug logging
    raise_on_error=False,             # Continue on errors
    success_threshold=95,             # Require 95% success rate
    enable_streamable_logs=True       # Stream logs in real-time
)

# Add tests and run
runner.add_test(TableRowCountToBeBetween(min_count=1000))
results = runner.run()
```

### Accessing Test Definitions

Inspect configured tests before running:

```python
runner = TestRunner.for_table("MySQL.ecommerce.public.orders")
runner.add_tests(
    TableRowCountToBeBetween(min_count=100),
    ColumnValuesToBeNotNull(column="order_id")
)

# Access test definitions
for test_def in runner.test_definitions:
    print(f"Test: {test_def.testDefinitionName}")
    print(f"Parameters: {test_def.parameterValues}")
```

## Publishing Results to OpenMetadata

Results can be published back to OpenMetadata for tracking, alerting, and visualization:

### DataFrame Validation Results

```python
from metadata.sdk.data_quality.dataframes import DataFrameValidator

validator = DataFrameValidator()
validator.add_openmetadata_table_tests("Postgres.staging.public.customers")

result = validator.validate(df)

# Publish results to OpenMetadata
result.publish("Postgres.staging.public.customers")
```

### Benefits of Publishing Results

- **Historical tracking**: View trends over time
- **Alerting**: Trigger notifications on failures
- **Dashboards**: Centralized data quality monitoring
- **Collaboration**: Share results across teams
- **Compliance**: Maintain audit trails

## Error Handling and Retries

Implement robust error handling:

```python
import time
from metadata.sdk.data_quality import TestRunner

def run_with_retry(table_fqn, max_retries=3, backoff=2):
    """Run tests with exponential backoff retry"""
    for attempt in range(max_retries):
        try:
            runner = TestRunner.for_table(table_fqn)
            results = runner.run()
            return results

        except ConnectionError as e:
            if attempt < max_retries - 1:
                wait_time = backoff ** attempt
                print(f"Connection failed, retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                print(f"Failed after {max_retries} attempts")
                raise

        except ValueError as e:
            print(f"Configuration error: {e}")
            raise  # Don't retry configuration errors

        except Exception as e:
            print(f"Unexpected error: {e}")
            raise

# Usage
results = run_with_retry("Postgres.warehouse.public.customers")
```

## Dynamic Test Generation

Generate tests programmatically based on metadata:

```python
from metadata.sdk import configure, client
from metadata.sdk.data_quality import (
    TestRunner,
    ColumnValuesToBeNotNull,
    ColumnValuesToBeUnique
)

configure(host="http://localhost:8585/api", jwt_token="token")

# Get table metadata
om_client = client()
table = om_client.ometa.get_by_name(
    entity=Table,
    fqn="Postgres.warehouse.public.customers"
)

# Generate tests based on column types
runner = TestRunner.for_table(table.fullyQualifiedName.root)

for column in table.columns:
    # Add NOT NULL tests for required columns
    if column.constraint == "NOT NULL":
        runner.add_test(ColumnValuesToBeNotNull(column=column.name.root))

    # Add UNIQUE tests for primary keys
    if column.constraint == "PRIMARY KEY":
        runner.add_test(ColumnValuesToBeUnique(column=column.name.root))

results = runner.run()
```

## Multi-Table Validation

Validate multiple tables in a workflow:

```python
from metadata.sdk.data_quality import TestRunner, TableRowCountToBeBetween

tables_to_validate = {
    "Postgres.warehouse.public.customers": {"min_rows": 10000},
    "Postgres.warehouse.public.orders": {"min_rows": 50000},
    "Postgres.warehouse.public.products": {"min_rows": 1000}
}

validation_results = {}

for table_fqn, config in tables_to_validate.items():
    runner = TestRunner.for_table(table_fqn)
    runner.add_test(TableRowCountToBeBetween(min_count=config["min_rows"]))

    results = runner.run()
    validation_results[table_fqn] = {
        "passed": all(r.testCaseResult.testCaseStatus == "Success" for r in results),
        "details": results
    }

# Generate summary
total_tables = len(validation_results)
passed_tables = sum(1 for v in validation_results.values() if v["passed"])

print(f"\n{'='*60}")
print(f"Validation Summary: {passed_tables}/{total_tables} tables passed")
print(f"{'='*60}")

for table_fqn, result in validation_results.items():
    status = "✓" if result["passed"] else "✗"
    print(f"{status} {table_fqn}")
```

## Best Practices Summary

1. **Version control test configurations**: Store YAML configs in git
2. **Use environment variables**: Never hardcode credentials
3. **Implement retries**: Handle transient failures gracefully
4. **Publish results**: Enable tracking and alerting in OpenMetadata
5. **Monitor execution**: Track metrics for test runs
6. **Handle errors explicitly**: Don't silently swallow failures
7. **Document tests**: Use descriptive names and descriptions
8. **Validate incrementally**: Test early and often in pipelines
9. **Separate concerns**: Let data stewards define tests, engineers execute them
10. **Test your tests**: Ensure test definitions are correct

## Next Steps

- Review the [Test Definitions Reference](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-definitions)
- Learn about [TestRunner](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner)
- Explore [DataFrame Validation](/how-to-guides/data-quality-observability/quality/data-quality-as-code/dataframe-validation)
- Return to [Data Quality as Code Overview](/how-to-guides/data-quality-observability/quality/data-quality-as-code)
- Check our [Examples and Tutorials](https://github.com/open-metadata/OpenMetadata/tree/main/examples/python-sdk/data-quality/README.md) out
