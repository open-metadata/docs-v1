---
title: Test Definitions Reference
description: Complete reference for all data quality test types available in the OpenMetadata Python SDK
slug: /how-to-guides/data-quality-observability/quality/data-quality-as-code/test-definitions
---

# Test Definitions Reference

This page provides a complete reference for all data quality test definitions available in the OpenMetadata Python SDK. Tests are organized into two categories: **Table-Level Tests** and **Column-Level Tests**.

## Importing Test Definitions

All test definitions are available from the `metadata.sdk.data_quality` module:

```python
from metadata.sdk.data_quality import (
    # Table tests
    TableRowCountToBeBetween,
    TableColumnCountToBeBetween,
    TableCustomSQLQuery,

    # Column tests
    ColumnValuesToBeNotNull,
    ColumnValuesToBeUnique,
    ColumnValuesToBeBetween,
)
```

## Common Parameters

All test definitions support these optional parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str` | Unique identifier for the test case |
| `display_name` | `str` | Human-readable name shown in UI |
| `description` | `str` | Detailed description of what the test validates |

Column tests additionally require:

| Parameter | Type | Description |
|-----------|------|-------------|
| `column` | `str` | Name of the column to test (required) |

## Table-Level Tests

Table-level tests validate properties of entire tables, such as row counts, column counts, or custom SQL queries.

### TableRowCountToBeBetween

Validates that the number of rows in a table falls within a specified range.

**Parameters:**
- `min_count` (int, optional): Minimum acceptable number of rows
- `max_count` (int, optional): Maximum acceptable number of rows

**Example:**
```python
from metadata.sdk.data_quality import TableRowCountToBeBetween

# Table should have between 1,000 and 100,000 rows
test = TableRowCountToBeBetween(min_count=1000, max_count=100000)

# At least 1,000 rows (no maximum)
test = TableRowCountToBeBetween(min_count=1000)

# At most 50,000 rows (no minimum)
test = TableRowCountToBeBetween(max_count=50000)
```

**Use Cases:**
- Monitor data volume and detect data loss
- Validate expected data growth patterns
- Detect unexpected data surges

---

### TableRowCountToEqual

Validates that the table has an exact number of rows.

**Parameters:**
- `row_count` (int, required): Expected number of rows

**Example:**
```python
from metadata.sdk.data_quality import TableRowCountToEqual

# Table must have exactly 50 rows
test = TableRowCountToEqual(row_count=50)
```

**Use Cases:**
- Validate fixed-size reference tables
- Ensure complete dimension table loads
- Verify static lookup tables

---

### TableColumnCountToBeBetween

Validates that the number of columns in a table falls within a specified range.

**Parameters:**
- `min_count` (int, optional): Minimum acceptable number of columns
- `max_count` (int, optional): Maximum acceptable number of columns

**Example:**
```python
from metadata.sdk.data_quality import TableColumnCountToBeBetween

# Table should have between 5 and 20 columns
test = TableColumnCountToBeBetween(min_count=5, max_count=20)
```

**Use Cases:**
- Schema validation
- Detect unexpected column additions or removals
- Monitor schema evolution

---

### TableColumnCountToEqual

Validates that the table has an exact number of columns.

**Parameters:**
- `column_count` (int, required): Expected number of columns

**Example:**
```python
from metadata.sdk.data_quality import TableColumnCountToEqual

# Table must have exactly 10 columns
test = TableColumnCountToEqual(column_count=10)
```

**Use Cases:**
- Strict schema validation
- Ensure schema stability
- Prevent schema drift

---

### TableColumnNameToExist

Validates that a specific column exists in the table schema.

**Parameters:**
- `column_name` (str, required): Name of the column that must exist

**Example:**
```python
from metadata.sdk.data_quality import TableColumnNameToExist

# Ensure 'customer_id' column exists
test = TableColumnNameToExist(column_name="customer_id")
```

**Use Cases:**
- Verify required columns are present
- Ensure critical columns aren't dropped
- Validate schema migrations

---

### TableColumnToMatchSet

Validates that table columns match an expected set of column names.

**Parameters:**
- `column_names` (list[str], required): List of expected column names
- `ordered` (bool, optional): If True, column order must match exactly (default: False)

**Example:**
```python
from metadata.sdk.data_quality import TableColumnToMatchSet

# Columns should match this set (any order)
test = TableColumnToMatchSet(
    column_names=["id", "name", "email", "created_at"]
)

# Columns must match in exact order
test = TableColumnToMatchSet(
    column_names=["id", "name", "email"],
    ordered=True
)
```

**Use Cases:**
- Validate complete schema structure
- Ensure schema consistency across environments
- Detect unexpected schema changes

---

### TableRowInsertedCountToBeBetween

Validates that the number of rows inserted within a time range is within bounds.

**Parameters:**
- `min_count` (int, optional): Minimum acceptable number of inserted rows
- `max_count` (int, optional): Maximum acceptable number of inserted rows
- `range_type` (str, optional): Time unit ("HOUR", "DAY", "WEEK", "MONTH") (default: "DAY")
- `range_interval` (int, optional): Number of time units to look back (default: 1)

**Example:**
```python
from metadata.sdk.data_quality import TableRowInsertedCountToBeBetween

# 100-1000 rows inserted in the last 24 hours
test = TableRowInsertedCountToBeBetween(
    min_count=100,
    max_count=1000,
    range_type="DAY",
    range_interval=1
)

# At least 50 rows inserted in the last 6 hours
test = TableRowInsertedCountToBeBetween(
    min_count=50,
    range_type="HOUR",
    range_interval=6
)
```

**Use Cases:**
- Monitor data ingestion rates
- Detect ingestion pipeline failures
- Validate ETL job completions

---

### TableCustomSQLQuery

Validates data using a custom SQL query expression.

**Parameters:**
- `sql_expression` (str, required): SQL query to execute
- `strategy` (str, optional): "ROWS" (count failing rows) or "COUNT" (expect a count) (default: "ROWS")

**Example:**
```python
from metadata.sdk.data_quality import TableCustomSQLQuery

# Find negative prices (returns failing rows)
test = TableCustomSQLQuery(
    sql_expression="SELECT * FROM {table} WHERE price < 0",
    strategy="ROWS"
)

# Count orphaned records
test = TableCustomSQLQuery(
    sql_expression="""
        SELECT COUNT(*) FROM {table} t
        LEFT JOIN parent_table p ON t.parent_id = p.id
        WHERE p.id IS NULL
    """,
    strategy="COUNT"
)
```

**Use Cases:**
- Implement custom business logic validation
- Validate referential integrity
- Check complex data relationships

---

### TableDiff

Compares two tables and identifies differences in their data.

**Parameters:**
- `table2` (str, required): Fully qualified name of the comparison table
- `key_columns` (list[str], optional): Columns to use as join keys
- `table2_key_columns` (list[str], optional): Join key columns from table 2
- `use_columns` (list[str], optional): Specific columns to compare
- `extra_columns` (list[str], optional): Additional columns to include in output
- `table2_extra_columns` (list[str], optional): Additional columns from table 2

**Example:**
```python
from metadata.sdk.data_quality import TableDiff

# Compare tables using 'id' as key
test = TableDiff(
    table2="Postgres.warehouse.staging.reference_customers",
    key_columns=["id"],
    use_columns=["name", "email", "status"]
)

# Compare with different key columns
test = TableDiff(
    table2="MySQL.prod.db.legacy_users",
    key_columns=["customer_id"],
    table2_key_columns=["user_id"],
    use_columns=["name", "email"]
)
```

**Use Cases:**
- Validate data migrations
- Verify data replication
- Compare production vs staging data

---

## Column-Level Tests

Column-level tests validate properties of specific columns.

### ColumnValuesToBeNotNull

Validates that a column contains no null or missing values.

**Parameters:**
- `column` (str, required): Name of the column to validate

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToBeNotNull

# Email column must not contain nulls
test = ColumnValuesToBeNotNull(column="email")
```

**Use Cases:**
- Ensure required fields are populated
- Validate data completeness
- Enforce NOT NULL constraints

---

### ColumnValuesToBeUnique

Validates that all values in a column are unique with no duplicates.

**Parameters:**
- `column` (str, required): Name of the column to validate

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToBeUnique

# Customer ID must be unique
test = ColumnValuesToBeUnique(column="customer_id")
```

**Use Cases:**
- Validate primary keys
- Ensure unique identifiers
- Detect duplicate records

---

### ColumnValuesToBeInSet

Validates that all values in a column belong to a specified set.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `allowed_values` (list[str], required): List of acceptable values

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToBeInSet

# Status must be one of these values
test = ColumnValuesToBeInSet(
    column="status",
    allowed_values=["active", "inactive", "pending"]
)

# Country codes must be valid
test = ColumnValuesToBeInSet(
    column="country_code",
    allowed_values=["US", "UK", "CA", "AU", "DE"]
)
```

**Use Cases:**
- Validate enum values
- Enforce categorical constraints
- Validate lookup values

---

### ColumnValuesToBeNotInSet

Validates that column values do not contain any forbidden values.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `forbidden_values` (list[str], required): List of values that must not appear

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToBeNotInSet

# Prevent test email addresses
test = ColumnValuesToBeNotInSet(
    column="email",
    forbidden_values=["test@test.com", "admin@admin.com", "noreply@example.com"]
)
```

**Use Cases:**
- Detect test data in production
- Blacklist invalid values
- Filter out placeholder values

---

### ColumnValuesToMatchRegex

Validates that column values match a specified regular expression pattern.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `regex` (str, required): Regular expression pattern

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToMatchRegex

# Validate email format
test = ColumnValuesToMatchRegex(
    column="email",
    regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
)

# Validate phone number format (US)
test = ColumnValuesToMatchRegex(
    column="phone",
    regex=r"^\+?1?\d{10}$"
)

# Validate date format (YYYY-MM-DD)
test = ColumnValuesToMatchRegex(
    column="date_string",
    regex=r"^\d{4}-\d{2}-\d{2}$"
)
```

**Use Cases:**
- Validate data format consistency
- Ensure pattern compliance
- Detect malformed data

---

### ColumnValuesToNotMatchRegex

Validates that column values do not match a forbidden regular expression pattern.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `regex` (str, required): Regular expression pattern that values must NOT match

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToNotMatchRegex

# Prevent test emails
test = ColumnValuesToNotMatchRegex(
    column="email",
    regex=r".*@test\.com$"
)

# Detect test data markers
test = ColumnValuesToNotMatchRegex(
    column="name",
    regex=r"^test.*"
)
```

**Use Cases:**
- Detect test data patterns
- Prevent specific formats
- Identify security risks

---

### ColumnValuesToBeBetween

Validates that all values in a column fall within a specified numeric range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable value
- `max_value` (float, optional): Maximum acceptable value

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToBeBetween

# Age should be reasonable
test = ColumnValuesToBeBetween(
    column="age",
    min_value=0,
    max_value=120
)

# Price must be positive
test = ColumnValuesToBeBetween(
    column="price",
    min_value=0.01,
    max_value=999999.99
)

# Percentage values
test = ColumnValuesToBeBetween(
    column="completion_rate",
    min_value=0,
    max_value=100
)
```

**Use Cases:**
- Validate numeric constraints
- Detect outliers
- Ensure value ranges

---

### ColumnValueMaxToBeBetween

Validates that the maximum value in a column falls within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable maximum value
- `max_value` (float, optional): Maximum acceptable maximum value

**Example:**
```python
from metadata.sdk.data_quality import ColumnValueMaxToBeBetween

# Max temperature should be reasonable
test = ColumnValueMaxToBeBetween(
    column="temperature",
    min_value=-50,
    max_value=50
)

# Highest score should not exceed 100
test = ColumnValueMaxToBeBetween(
    column="score",
    min_value=90,
    max_value=100
)
```

**Use Cases:**
- Monitor data ranges
- Detect upper outliers
- Validate maximum constraints

---

### ColumnValueMinToBeBetween

Validates that the minimum value in a column falls within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable minimum value
- `max_value` (float, optional): Maximum acceptable minimum value

**Example:**
```python
from metadata.sdk.data_quality import ColumnValueMinToBeBetween

# Min temperature validation
test = ColumnValueMinToBeBetween(
    column="temperature",
    min_value=-50,
    max_value=0
)

# Minimum age should be at least 18
test = ColumnValueMinToBeBetween(
    column="age",
    min_value=18,
    max_value=25
)
```

**Use Cases:**
- Monitor lower bounds
- Detect lower outliers
- Validate minimum constraints

---

### ColumnValueMeanToBeBetween

Validates that the mean (average) value falls within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable mean value
- `max_value` (float, optional): Maximum acceptable mean value

**Example:**
```python
from metadata.sdk.data_quality import ColumnValueMeanToBeBetween

# Average rating should be between 3 and 4.5
test = ColumnValueMeanToBeBetween(
    column="rating",
    min_value=3.0,
    max_value=4.5
)

# Average response time monitoring
test = ColumnValueMeanToBeBetween(
    column="response_time_ms",
    min_value=100,
    max_value=500
)
```

**Use Cases:**
- Statistical validation
- Detect data drift
- Monitor averages

---

### ColumnValueMedianToBeBetween

Validates that the median value falls within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable median value
- `max_value` (float, optional): Maximum acceptable median value

**Example:**
```python
from metadata.sdk.data_quality import ColumnValueMedianToBeBetween

# Median salary range
test = ColumnValueMedianToBeBetween(
    column="salary",
    min_value=50000,
    max_value=75000
)
```

**Use Cases:**
- Robust central tendency checks
- Detect skewed distributions
- Monitor typical values

---

### ColumnValueStdDevToBeBetween

Validates that the standard deviation falls within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable standard deviation
- `max_value` (float, optional): Maximum acceptable standard deviation

**Example:**
```python
from metadata.sdk.data_quality import ColumnValueStdDevToBeBetween

# Response time variability
test = ColumnValueStdDevToBeBetween(
    column="response_time",
    min_value=0,
    max_value=100
)
```

**Use Cases:**
- Detect unexpected variability
- Monitor data consistency
- Validate distribution stability

---

### ColumnValuesSumToBeBetween

Validates that the sum of all values falls within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_value` (float, optional): Minimum acceptable sum
- `max_value` (float, optional): Maximum acceptable sum

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesSumToBeBetween

# Total revenue validation
test = ColumnValuesSumToBeBetween(
    column="revenue",
    min_value=1000000,
    max_value=5000000
)
```

**Use Cases:**
- Validate totals
- Monitor aggregates
- Detect unexpected volumes

---

### ColumnValuesMissingCount

Validates the count of missing or null values.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `missing_count_value` (int, optional): Expected number of missing values
- `missing_value_match` (list[str], optional): Additional strings to treat as missing

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesMissingCount

# Expect exactly 100 missing values
test = ColumnValuesMissingCount(
    column="optional_field",
    missing_count_value=100
)

# Treat custom strings as missing
test = ColumnValuesMissingCount(
    column="status",
    missing_value_match=["N/A", "Unknown", ""]
)
```

**Use Cases:**
- Monitor data completeness
- Track missing data patterns
- Validate optional fields

---

### ColumnValueLengthsToBeBetween

Validates that string lengths fall within a specified range.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `min_length` (int, optional): Minimum acceptable string length
- `max_length` (int, optional): Maximum acceptable string length

**Example:**
```python
from metadata.sdk.data_quality import ColumnValueLengthsToBeBetween

# Username length validation
test = ColumnValueLengthsToBeBetween(
    column="username",
    min_length=3,
    max_length=20
)

# Description length constraints
test = ColumnValueLengthsToBeBetween(
    column="description",
    min_length=10,
    max_length=500
)
```

**Use Cases:**
- Validate string constraints
- Prevent truncation
- Ensure format compliance

---

### ColumnValuesToBeAtExpectedLocation

Validates that a specific value appears at an expected row position.

**Parameters:**
- `column` (str, required): Name of the column to validate
- `expected_value` (str, required): The exact value expected
- `row_index` (int, optional): Zero-based row position (default: 0)

**Example:**
```python
from metadata.sdk.data_quality import ColumnValuesToBeAtExpectedLocation

# First row should have ID "1"
test = ColumnValuesToBeAtExpectedLocation(
    column="id",
    expected_value="1",
    row_index=0
)

# Top ranked item
test = ColumnValuesToBeAtExpectedLocation(
    column="rank",
    expected_value="first",
    row_index=0
)
```

**Use Cases:**
- Validate sorted data
- Check ordered results
- Verify specific positions

---

## Customizing Tests

All tests support customization through fluent methods:

```python
from metadata.sdk.data_quality import ColumnValuesToBeNotNull

test = ColumnValuesToBeNotNull(column="email") \
    .with_name("email_completeness_check") \
    .with_display_name("Email Completeness Validation") \
    .with_description("Ensures all customer records have email addresses") \
    .with_compute_row_count(True)
```

Or pass values directly to the constructor:

```python
test = ColumnValuesToBeNotNull(
    column="email",
    name="email_completeness_check",
    display_name="Email Completeness Validation",
    description="Ensures all customer records have email addresses"
)
```

## Next Steps

- Learn how to use these tests with [TestRunner](/how-to-guides/data-quality-observability/quality/data-quality-as-code/test-runner)
- Apply tests to [DataFrame Validation](/how-to-guides/data-quality-observability/quality/data-quality-as-code/dataframe-validation)
- Explore [Advanced Usage](/how-to-guides/data-quality-observability/quality/data-quality-as-code/advanced-usage) patterns
