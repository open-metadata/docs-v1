---
title: Data Quality as Code
description: Run data quality tests programmatically from your ETL workflows using the OpenMetadata Python SDK
slug: /how-to-guides/data-quality-observability/quality/data-quality-as-code
---

# Data Quality as Code

Data Quality as Code enables you to programmatically build, run, and manage data quality tests within your ETL workflows using the OpenMetadata Python SDK. This approach allows data engineers and developers to integrate data quality validation directly into their data pipelines, ensuring data quality is verified at every stage of the data lifecycle.

## Why Data Quality as Code?

Traditional data quality testing often requires manual configuration through UIs or separate workflow systems. Data Quality as Code brings several advantages:

- **Integration with ETL workflows**: Run data quality tests directly within your existing Python-based ETL pipelines
- **Version control**: Manage test definitions alongside your code in version control systems
- **Developer-friendly**: Use familiar Python syntax and IDE features for test development
- **Programmatic control**: Dynamically generate tests based on data discovery or metadata
- **Immediate feedback**: Validate data transformations before loading to destinations
- **Shared responsibility**: Data stewards define tests in OpenMetadata UI, engineers execute them in code

## Key Features

### TestRunner API
Execute data quality tests against tables cataloged in OpenMetadata:

```python
from metadata.sdk.data_quality import TestRunner, TableRowCountToBeBetween

runner = TestRunner.for_table("MySQL.default.db.table")
runner.add_test(TableRowCountToBeBetween(min_count=100, max_count=1000))

results = runner.run()  # Publishes results to OpenMetadata
```

### DataFrame Validation
Validate pandas DataFrames before loading them to destinations:

```python
import pandas as pd

from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator
from metadata.sdk.data_quality import ColumnValuesToBeNotNull

df = pd.read_csv('path/to/data.csv')

validator = DataFrameValidator()
validator.add_test(ColumnValuesToBeNotNull(column="email"))
result = validator.validate(df)

if result.success:
    load_to_destination(df)


result.publish("MySQL.default.db.table")    # Publishes results to OpenMetadata
```

### Multiple Test Definition Sources
Define tests in three flexible ways:

1. **Inline code**: Define tests directly in your Python code
2. **From OpenMetadata**: Load test definitions configured in the OpenMetadata UI
3. **From YAML files**: Load test configurations from YAML workflow files

### Comprehensive Test Library
Access all test cases supported by OpenMetadata, covering:
- **Table tests**: Row counts, column counts, custom SQL queries, table diffs
- **Column tests**: Null checks, uniqueness, regex patterns, value ranges, statistical metrics

## Use Cases

### 1. ETL Data Validation
Validate data after extraction and transformation, before loading:

```python
# Extract
df = extract_from_source()

# Transform
df = transform_data(df)

# Validate
validator = DataFrameValidator()
validator.add_openmetadata_table_tests("Warehouse.staging.user_data")
result = validator.validate(df)

# Load only if validation passes
if result.success:
    load_to_warehouse(df)
else:
    # You could notify your team manually
    alert_team(result.failures)

# Or let OpenMetadata handle it for you through alert notifications
result.publish("Warehouse.staging.user_data")
```

### 2. Collaborative Quality Management
Data stewards define tests in the UI, engineers run them in pipelines:

```python
# Data steward creates tests in OpenMetadata UI
# Engineer executes those tests in the pipeline

runner = TestRunner.for_table("BigQuery.analytics.customer_360")
results = runner.run()  # Runs all tests defined in UI
```

### 3. Chunk-Based Validation
Validate large datasets processed in chunks:

```python
validator = DataFrameValidator()
validator.add_openmetadata_table_tests("Postgres.warehouse.transactions")

result = validator.run(
    pd.read_csv('large_file.csv', chunksize=10000),
    on_success=load_chunk,
    on_failure=rollback_transaction
)
```

## Getting Started

{%inlineCalloutContainer%}
 {%inlineCallout
  color="violet-70"
  bold="Getting Started"
  icon="MdRocket"
  href="/how-to-guides/data-quality-observability/quality/data-quality-as-code/getting-started"%}
  Install the SDK and configure authentication to get started.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="TestRunner - Table Testing"
  icon="MdTableChart"
  href="/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner"%}
  Run data quality tests against tables in OpenMetadata.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="DataFrame Validation"
  icon="MdDataObject"
  href="/how-to-guides/data-quality-observability/quality/data-quality-as-code/dataframe-validation"%}
  Validate pandas DataFrames before loading to destinations.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Test Definitions Reference"
  icon="MdChecklist"
  href="/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-definitions"%}
  Complete reference of all available test types and their parameters.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Advanced Usage"
  icon="MdCode"
  href="/how-to-guides/data-quality-observability/quality/data-quality-as-code/advanced-usage"%}
  Learn advanced patterns including YAML workflows, custom configurations, and result publishing.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Run our tutorials with examples"
  icon="MdSource"
  isExternalLink="true"
  href="https://github.com/open-metadata/OpenMetadata/tree/main/examples/python-sdk/data-quality/README.md"%}
  Learn by doing by running our Jupyter Notebook examples
 {%/inlineCallout%}
{%/inlineCalloutContainer%}

## Requirements

- Python 3.10 or higher
- `openmetadata-ingestion` package version 1.11.0.0 or later
- Access to an OpenMetadata instance (1.11.0 or later)
- Valid JWT token for authentication

## Architecture

Data Quality as Code integrates seamlessly with OpenMetadata's existing data quality infrastructure:

1. **Test Definitions**: Tests can be defined in code, loaded from OpenMetadata, or imported from YAML files
2. **Execution Engine**: Leverages OpenMetadata's proven test execution engine
3. **Result Publishing**: Test results can be published back to OpenMetadata for visualization and alerting
4. **Service Connections**: Automatically uses service connections configured in OpenMetadata

## Next Steps

Ready to get started? Follow the [Getting Started guide](/how-to-guides/data-quality-observability/quality/data-quality-as-code/getting-started) to install the SDK and run your first data quality test.
