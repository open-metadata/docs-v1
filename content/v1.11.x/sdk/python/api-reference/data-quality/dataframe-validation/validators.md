---
title: Running test on DataFrames
slug: /sdk/python/api-reference/data-quality/dataframe-validation/validators
---

## `metadata.sdk.data_quality.dataframes.validators`

Registry of pandas validators.

**Functions:**

- [**requires_whole_table**](#metadata.sdk.data_quality.dataframes.validators.requires_whole_table) – Whether the validator requires a whole table to return appropriate results

**Attributes:**

- [**VALIDATORS_THAT_REQUIRE_FULL_TABLE**](#metadata.sdk.data_quality.dataframes.validators.VALIDATORS_THAT_REQUIRE_FULL_TABLE) –
- [**VALIDATOR_REGISTRY**](#metadata.sdk.data_quality.dataframes.validators.VALIDATOR_REGISTRY) –

### `metadata.sdk.data_quality.dataframes.validators.VALIDATORS_THAT_REQUIRE_FULL_TABLE`

```python
VALIDATORS_THAT_REQUIRE_FULL_TABLE = {
    "columnValuesToBeUnique",
    "columnValueMeanToBeBetween",
    "columnValueMedianToBeBetween",
    "columnValueStdDevToBeBetween",
    "columnValuesSumToBeBetween",
    "columnValuesMissingCount",
    "tableRowCountToBeBetween",
    "tableRowCountToEqual",
}

```

### `metadata.sdk.data_quality.dataframes.validators.VALIDATOR_REGISTRY`

```python
VALIDATOR_REGISTRY = {
    "columnValuesToBeNotNull": ColumnValuesToBeNotNullValidator,
    "columnValuesToBeUnique": ColumnValuesToBeUniqueValidator,
    "columnValuesToBeBetween": ColumnValuesToBeBetweenValidator,
    "columnValuesToBeInSet": ColumnValuesToBeInSetValidator,
    "columnValuesToBeNotInSet": ColumnValuesToBeNotInSetValidator,
    "columnValuesToMatchRegex": ColumnValuesToMatchRegexValidator,
    "columnValuesToNotMatchRegex": ColumnValuesToNotMatchRegexValidator,
    "columnValueLengthsToBeBetween": ColumnValueLengthsToBeBetweenValidator,
    "columnValueMaxToBeBetween": ColumnValueMaxToBeBetweenValidator,
    "columnValueMeanToBeBetween": ColumnValueMeanToBeBetweenValidator,
    "columnValueMedianToBeBetween": ColumnValueMedianToBeBetweenValidator,
    "columnValueMinToBeBetween": ColumnValueMinToBeBetweenValidator,
    "columnValueStdDevToBeBetween": ColumnValueStdDevToBeBetweenValidator,
    "columnValuesSumToBeBetween": ColumnValuesSumToBeBetweenValidator,
    "columnValuesMissingCount": ColumnValuesMissingCountValidator,
    "columnValuesToBeAtExpectedLocation": ColumnValuesToBeAtExpectedLocationValidator,
    "tableRowCountToBeBetween": TableRowCountToBeBetweenValidator,
    "tableRowCountToEqual": TableRowCountToEqualValidator,
    "tableColumnCountToBeBetween": TableColumnCountToBeBetweenValidator,
    "tableColumnCountToEqual": TableColumnCountToEqualValidator,
    "tableColumnNameToExist": TableColumnNameToExistValidator,
    "tableColumnToMatchSet": TableColumnToMatchSetValidator,
}

```

### `metadata.sdk.data_quality.dataframes.validators.requires_whole_table`

```python
requires_whole_table(validator_name)
```

Whether the validator requires a whole table to return appropriate results

**Examples:**

- `columnValuesToBeUnique` needs to see the whole column to make sure uniqueness is met
- `tableRowCountToEqual` needs to see the whole table to make sure the expected row count is met

These tests could return false positives when operating on batches

**Parameters:**

- **validator_name** (`str`) – The name of the validator to check

**Returns:**

- `bool` – Whether the validator requires a whole table to return appropriate results
