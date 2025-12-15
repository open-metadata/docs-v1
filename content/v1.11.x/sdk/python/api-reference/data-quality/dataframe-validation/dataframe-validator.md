---
title: Running test on DataFrames
slug: /sdk/python/api-reference/data-quality/dataframe-validation/dataframe-validator
---

## `metadata.sdk.data_quality.dataframes.dataframe_validator`

DataFrame validation API.

**Classes:**

- [**DataFrameValidator**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator) – Facade for DataFrame data quality validation.

**Attributes:**

- [**ValidatorCallback**](#metadata.sdk.data_quality.dataframes.dataframe_validator.ValidatorCallback) –

### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator`

```python
DataFrameValidator(client=None)
```

Facade for DataFrame data quality validation.

Provides a simple interface to configure and execute data quality tests
on pandas DataFrames using OpenMetadata test definitions.

**Examples:**

validator = DataFrameValidator()
validator.add_test(ColumnValuesToBeNotNull(column="email"))
validator.add_test(ColumnValuesToBeUnique(column="customer_id"))

result = validator.validate(df, mode=FailureMode.ShortCircuit)
if not result.success:
print(f"Validation failed: {result.failures}")

**Functions:**

- [**add_openmetadata_table_tests**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_openmetadata_table_tests) –
- [**add_openmetadata_test**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_openmetadata_test) –
- [**add_test**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_test) – Add a single test definition to be executed.
- [**add_tests**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_tests) – Add multiple test definitions at once.
- [**run**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.run) – Execute all configured tests on the DataFrame and call callbacks.
- [**validate**](#metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.validate) – Execute all configured tests on the DataFrame.

#### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_openmetadata_table_tests`

```python
add_openmetadata_table_tests(table_fqn)
```

#### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_openmetadata_test`

```python
add_openmetadata_test(test_fqn)
```

#### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_test`

```python
add_test(test)
```

Add a single test definition to be executed.

**Parameters:**

- **test** (`BaseTest`) – Test definition (e.g., ColumnValuesToBeNotNull)

#### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.add_tests`

```python
add_tests(*tests)
```

Add multiple test definitions at once.

**Parameters:**

- \***tests** (`BaseTest`) – Variable number of test definitions

#### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.run`

```python
run(data, on_success, on_failure, mode=FailureMode.SHORT_CIRCUIT)
```

Execute all configured tests on the DataFrame and call callbacks.

Useful for running validation based on chunks, for example:

```python
validator = DataFrameValidator()
validator.add_test(ColumnValuesToBeNotNull(column="email"))

def load_df_to_destination(df, result):
    ...

def rollback(df, result):
    "Clears data previously loaded"
    ...

result = validator.run(
    pandas.read_csv('somefile.csv', chunksize=1000),
    on_success=load_df_to_destination,
    on_failure=rollback,
    mode=FailureMode.SHORT_CIRCUIT,
)
```

**Parameters:**

- **data** (`Iterable`) – An iterable of pandas DataFrames
- **on_success** (`ValidatorCallback`) – Callback to execute after successful validation
- **on_failure** (`ValidatorCallback`) – Callback to execute after failed validation
- **mode** (`FailureMode`) – Validation mode (`FailureMode.ShortCircuit` stops on first failure)

**Returns:**

- `ValidationResult` – Merged ValidationResult aggregating all batch validations

#### `metadata.sdk.data_quality.dataframes.dataframe_validator.DataFrameValidator.validate`

```python
validate(df, mode=FailureMode.SHORT_CIRCUIT)
```

Execute all configured tests on the DataFrame.

**Parameters:**

- **df** (`DataFrame`) – DataFrame to validate
- **mode** (`FailureMode`) – Validation mode (`FailureMode.ShortCircuit` stops on first failure)

**Returns:**

- `ValidationResult` – ValidationResult with outcomes for all tests

### `metadata.sdk.data_quality.dataframes.dataframe_validator.ValidatorCallback`

```python
ValidatorCallback = Callable[[DataFrame, ValidationResult], None]
```
