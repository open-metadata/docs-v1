---
title: DataFrame Validation
description: Validate pandas DataFrames before loading them to destinations using OpenMetadata data quality tests
slug: /how-to-guides/data-quality-observability/quality/data-quality-as-code/dataframe-validation
---

# DataFrame Validation

The `DataFrameValidator` class enables you to validate pandas DataFrames directly within your ETL workflows, before data reaches its destination. This allows you to catch data quality issues early, preventing bad data from contaminating your data warehouse or analytics systems.

## Overview

DataFrame validation is ideal for:

- Validating transformed data before loading to destinations
- Processing large datasets in chunks with memory efficiency
- Short-circuiting ETL pipelines on validation failures
- Providing immediate feedback during data transformations
- Publishing validation results back to OpenMetadata

## Basic Usage

### Creating a Validator

```python
from metadata.sdk import configure
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator

# Configure SDK
configure(
    host="http://localhost:8585/api",
    jwt_token="your-jwt-token"
)

# Create validator
validator = DataFrameValidator()
```

### Adding Tests

Add test definitions to validate your DataFrame:

```python
from metadata.sdk.data_quality import (
    ColumnValuesToBeNotNull,
    ColumnValuesToBeUnique,
    ColumnValuesToBeBetween
)

# Add column-level tests
validator.add_test(
    ColumnValuesToBeNotNull(column="email")
)

validator.add_test(
    ColumnValuesToBeUnique(column="customer_id")
)

validator.add_test(
    ColumnValuesToBeBetween(column="age", min_value=18, max_value=120)
)
```

### Validating a DataFrame

```python
import pandas as pd

# Load or create your DataFrame
df = pd.read_csv("customers.csv")

# Validate the DataFrame
result = validator.validate(df)

# Check if validation passed
if result.success:
    print("✓ Validation passed - safe to load data")
    load_to_warehouse(df)
else:
    print("✗ Validation failed")
    for test_case, test_result in result.test_cases_and_results:
        if test_result.testCaseStatus != "Success":
            print(f"  - {test_case.name.root}: {test_result.result}")
```

## Complete ETL Example

Here's a complete example of validating transformed data in an ETL pipeline:

```python
import pandas as pd
from sqlalchemy import create_engine
from metadata.sdk import configure
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator
from metadata.sdk.data_quality import (
    ColumnValuesToBeNotNull,
    ColumnValuesToBeUnique,
    ColumnValuesToBeBetween,
    ColumnValuesToMatchRegex
)

# Configure SDK
configure(
    host="http://localhost:8585/api",
    jwt_token="your-jwt-token"
)

# Extract: Read source data
df = pd.read_csv("raw_customers.csv")

# Transform: Clean and enrich data
df["email"] = df["email"].str.lower().str.strip()
df["created_at"] = pd.to_datetime(df["created_at"])
df = df.dropna(subset=["customer_id"])

# Validate: Create and configure validator
validator = DataFrameValidator()
validator.add_tests(
    ColumnValuesToBeNotNull(column="customer_id"),
    ColumnValuesToBeNotNull(column="email"),
    ColumnValuesToBeUnique(column="customer_id"),
    ColumnValuesToBeBetween(column="age", min_value=0, max_value=120),
    ColumnValuesToMatchRegex(
        column="email",
        regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    )
)

# Run validation
result = validator.validate(df)

# Load: Only load if validation passes
if result.success:
    engine = create_engine("postgresql://user:pass@localhost/warehouse")
    df.to_sql("customers", engine, if_exists="replace", index=False)
    print(f"✓ Loaded {len(df)} records successfully")

else:
    print("✗ Data quality validation failed. Data not loaded.")


# Optionally publish results to OpenMetadata
result.publish("Postgres.warehouse.public.customers")
```

## Using Tests from OpenMetadata

Instead of defining tests in code, load tests that are configured in OpenMetadata:

```python
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator

# Create validator
validator = DataFrameValidator()

# Load all tests defined in OpenMetadata for a specific table
validator.add_openmetadata_table_tests("BigQuery.analytics.staging.customers")

# Validate DataFrame against those tests
result = validator.validate(df)

if result.success:
    load_to_destination(df)

# Optionally publish results to OpenMetadata, recommended so all data stakeholders are up to date
result.publish("Postgres.warehouse.public.customers")
```

This approach enables:
- **Separation of concerns**: Data stewards define quality criteria in UI, engineers execute in code
- **Dynamic test updates**: Test criteria changes don't require code deployments
- **Consistency**: Same tests used for table validation and DataFrame validation

## Chunk-Based Validation

For large datasets that don't fit in memory, validate data in chunks:

### Method 1: Manual Chunk Validation

```python
import pandas as pd
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator, ValidationResult

validator = DataFrameValidator()
validator.add_openmetadata_table_tests("Postgres.warehouse.staging.transactions")

results = []

# Process file in chunks
for chunk in pd.read_csv("large_file.csv", chunksize=10000):
    # Validate chunk
    result = validator.validate(chunk)
    results.append(result)

    # Load if valid, otherwise stop
    if result.success:
        load_chunk_to_database(chunk)
    else:
        print(f"Validation failed on chunk")
        rollback_all_chunks()
        break

# Merge all results
final_result = ValidationResult.merge(*results)

# Publish aggregated results
final_result.publish("Postgres.warehouse.staging.transactions")
```

### Method 2: Using the `run()` Method

The `run()` method provides a cleaner approach with automatic chunk handling:

```python
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator
import pandas as pd
from sqlalchemy import create_engine, Table, MetaData, insert, delete

# Configure validator
validator = DataFrameValidator()
validator.add_openmetadata_table_tests("Postgres.warehouse.staging.orders")

# Setup database connection
engine = create_engine("postgresql://user:pass@localhost/warehouse")

# Define success and failure handlers
def load_chunk(df, validation_result):
    """Load validated chunk to database"""
    with engine.connect() as conn:
        table = Table("orders", MetaData(), autoload_with=conn)
        conn.execute(insert(table).values(), df.to_dict(orient="records"))

def handle_failure(df, validation_result):
    """Rollback on validation failure"""
    with engine.connect() as conn:
        table = Table("orders", MetaData(), autoload_with=conn)
        conn.execute(delete(table))
    print(f"Validation failed: {validation_result}")

# Run validation on chunks
result = validator.run(
    pd.read_csv("orders.csv", chunksize=5000),
    on_success=load_chunk,
    on_failure=handle_failure
)

# Publish results
if result.success:
    print("✓ All chunks validated and loaded successfully")
else:
    print("✗ Validation failed - transaction rolled back")

result.publish("Postgres.warehouse.staging.orders")
```

### Transaction-Safe Chunk Processing

Use a context manager to ensure atomic transactions:

```python
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator
import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, insert

class DatabaseSession:
    def __init__(self, connection_string, table_name):
        self.engine = create_engine(connection_string)
        self.table_name = table_name
        self._conn = None

    def __enter__(self):
        self._conn = self.engine.connect()
        self._trans = self._conn.begin()
        self.table = Table(self.table_name, MetaData(), autoload_with=self._conn)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            self._trans.rollback()
        else:
            self._trans.commit()
        self._conn.close()

    def load_chunk(self, df, validation_result):
        """Load chunk to database"""
        self._conn.execute(
            insert(self.table).values(),
            df.to_dict(orient="records")
        )

    def rollback(self, df, validation_result):
        """Rollback transaction"""
        self._trans.rollback()

# Use in validation workflow
validator = DataFrameValidator()
validator.add_openmetadata_table_tests("Postgres.warehouse.staging.sales")

with DatabaseSession("postgresql://user:pass@localhost/warehouse", "sales") as session:
    result = validator.run(
        pd.read_csv("sales_data.csv", chunksize=10000),
        on_success=session.load_chunk,
        on_failure=session.rollback
    )

print(f"Validation {'succeeded' if result.success else 'failed'}")
```

## Failure Modes

As of version 1.11.0.0 of the SDK, DataFrameValidator supports only one failure mode: short circuit.

```python
from metadata.sdk.data_quality.dataframes import FailureMode

# SHORT_CIRCUIT (default): Stop on first test failure
result = validator.validate(df, mode=FailureMode.SHORT_CIRCUIT)

# In chunk-based processing, SHORT_CIRCUIT stops processing additional chunks
result = validator.run(
    data_chunks,
    on_success=load_chunk,
    on_failure=rollback,
    mode=FailureMode.SHORT_CIRCUIT  # Stop on first failed chunk
)
```

Future versions will include additional modes to report back failing rows or skipping failing batches.

## Working with Validation Results

### Accessing Test Results

```python
result = validator.validate(df)

# Check overall success
if result.success:
    print("All tests passed")

# Iterate through individual test results
for test_case, test_result in result.test_cases_and_results:
    print(f"Test: {test_case.name.root}")
    print(f"Status: {test_result.testCaseStatus}")
    print(f"Details: {test_result.result}")
```

### Merging Results from Multiple Chunks

```python
from metadata.sdk.data_quality.dataframes import ValidationResult

results = []

for chunk in data_chunks:
    result = validator.validate(chunk)
    results.append(result)

# Merge all chunk results
merged_result = ValidationResult.merge(*results)

# Merged result contains aggregated information
print(f"Overall success: {merged_result.success}")
```

### Publishing Results to OpenMetadata

After validation, publish results back to OpenMetadata for tracking and alerting:

```python
result = validator.validate(df)

# Publish results to OpenMetadata
result.publish("Postgres.warehouse.staging.customer_data")
```

This enables:
- Historical tracking of data quality trends
- Alerting on validation failures
- Visualization in OpenMetadata UI
- Centralized data quality reporting

## Important Considerations for Chunk-Based Validation

When using chunk-based validation, be aware of tests that require the full dataset:

### Tests That Require Full Table

Some tests analyze the entire dataset and may produce incorrect results when run on chunks:

- `TableRowCountToBeBetween`: Counts rows in each chunk, not the full dataset
- `TableRowCountToEqual`: Validates chunk size, not full dataset size
- `ColumnValuesSumToBeBetween`: Sums values per chunk, not across all data

The SDK will issue a warning when such tests are detected:

```
WholeTableTestsWarning: Running tests that require the whole table on chunks
could lead to false positives. For example, a DataFrame with 200 rows split
in chunks of 50 could pass tests expecting DataFrames to contain max 100 rows.

The following tests could have unexpected results:
  - tableRowCountToBeBetween
  - columnValuesSumToBeBetween
```

### Recommended Approach

For datasets that don't fit in memory and require full-table tests:

1. Use [TestRunner](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner) to validate after loading
2. Focus DataFrame validation on column-level tests that do not require aggregation
3. Split validation into two phases:
   - **During ETL**: Validate column-level quality with DataFrameValidator
   - **After loading**: Validate table-level metrics with TestRunner

Example two-phase approach:

```python
# Phase 1: Validate chunks during ETL (column-level only)
chunk_validator = DataFrameValidator()
chunk_validator.add_tests(
    ColumnValuesToBeNotNull(column="id"),
    ColumnValuesToBeUnique(column="id"),
    ColumnValuesToBeBetween(column="amount", min_value=0)
)

result = chunk_validator.run(
    pd.read_csv("data.csv", chunksize=10000),
    on_success=load_chunk,
    on_failure=rollback
)

# Phase 2: Validate table metrics after loading (table-level)
if result.success:
    from metadata.sdk.data_quality import TestRunner

    table_validator = TestRunner.for_table("Postgres.warehouse.staging.transactions")
    table_validator.add_tests(
        TableRowCountToBeBetween(min_count=10000),
        ColumnValuesSumToBeBetween(column="amount", min_value=1000000)
    )
    
    # Automatically publishes results for table tests only
    table_results = table_validator.run()
```

## Best Practices

1. **Validate before loading**: Catch issues before contaminating your warehouse
   ```python
   result = validator.validate(transformed_df)
   if result.success:
       load_to_warehouse(df)
   ```

2. **Use transactional chunk processing**: Ensure atomic all-or-nothing behavior
   ```python
   with database_transaction():
       result = validator.run(chunks, on_success=load, on_failure=rollback)
   ```

3. **Leverage OpenMetadata tests**: Let data stewards define quality criteria
   ```python
   validator.add_openmetadata_table_tests("Table.FQN")
   ```

4. **Publish results**: Enable tracking and alerting
   ```python
   result.publish("Table.FQN")
   ```

5. **Handle failures gracefully**: Don't silently fail
   ```python
   if not result.success:
       alert_team()
       rollback_transaction()
       raise DataQualityError(result)
   ```

6. **Use appropriate tests for chunks**: Avoid full-table tests when processing chunks

## Error Handling

Handle validation errors appropriately:

```python
from metadata.sdk.data_quality.dataframes.dataframe_validator import DataFrameValidator

try:
    validator = DataFrameValidator()
    validator.add_openmetadata_table_tests("Postgres.warehouse.staging.orders")

    result = validator.validate(df)

    if not result.success:
        # Handle validation failure
        log_validation_failures(result)
        raise ValueError("Data quality checks failed")

except ValueError as e:
    print(f"Configuration error: {e}")
    # Table not found in OpenMetadata

except Exception as e:
    print(f"Validation error: {e}")
    # Other errors during validation
```

## Next Steps

- Review the [Test Definitions Reference](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-definitions) for all available tests
- Learn about [TestRunner](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner) for validating tables after loading
- Explore [Advanced Usage](/how-to-guides/data-quality-observability/quality/data-quality-as-code/advanced-usage) patterns and configurations
