---
title: Running test on DataFrames
slug: /sdk/python/api-reference/data-quality/dataframe-validation/validation-results
---

## `metadata.sdk.data_quality.dataframes.validation_results`

DataFrame validation result models.

**Classes:**

- [**FailureMode**](#metadata.sdk.data_quality.dataframes.validation_results.FailureMode) –
- [**ValidationResult**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult) – Aggregated results from validating multiple tests on a DataFrame.

**Attributes:**

- [**logger**](#metadata.sdk.data_quality.dataframes.validation_results.logger) –

### `metadata.sdk.data_quality.dataframes.validation_results.FailureMode`

Bases: `Enum`

**Attributes:**

- [**SHORT_CIRCUIT**](#metadata.sdk.data_quality.dataframes.validation_results.FailureMode.SHORT_CIRCUIT) –

#### `metadata.sdk.data_quality.dataframes.validation_results.FailureMode.SHORT_CIRCUIT`

```python
SHORT_CIRCUIT = 'short-circuit'
```

### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult`

Bases: `BaseModel`

Aggregated results from validating multiple tests on a DataFrame.

**Attributes:**

- [**success**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.success) (`bool`) – True if all tests passed
- [**total_tests**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.total_tests) (`int`) – Total number of tests executed
- [**passed_tests**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.passed_tests) (`int`) – Number of tests that passed
- [**failed_tests**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.failed_tests) (`int`) – Number of tests that failed
- [**test_results**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.test_results) (`List[TestCaseResult]`) – Individual test results
- [**execution_time_ms**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.execution_time_ms) (`float`) – Total execution time in milliseconds

**Functions:**

- [**merge**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.merge) – Merge multiple ValidationResult objects into one.
- [**publish**](#metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.publish) – Publish test results to OpenMetadata.

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.execution_time_ms`

```python
execution_time_ms: float
```

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.failed_tests`

```python
failed_tests: int
```

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.failures`

```python
failures: List[TestCaseResult]
```

Get only failed test results.

**Returns:**

- `List` – List of test results where status is Failed or Aborted

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.merge`

```python
merge(*results)
```

Merge multiple ValidationResult objects into one.

Aggregates results from multiple validation runs, useful when validating
DataFrames in batches. When the same test case is run multiple times across
batches, results are aggregated by test case FQN.

**Parameters:**

- \***results** (`ValidationResult`) – Variable number of ValidationResult objects to merge

**Returns:**

- `ValidationResult` – A new ValidationResult with aggregated test case results

**Raises:**

- `ValueError` – If no results are provided to merge

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.passed_tests`

```python
passed_tests: int
```

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.passes`

```python
passes: List[TestCaseResult]
```

Get only passed test results.

**Returns:**

- `List[TestCaseResult]` – List of test results where status is Success

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.publish`

```python
publish(table_fqn, client=None)
```

Publish test results to OpenMetadata.
Args:
table_fqn: Fully qualified table name
client: OpenMetadata client

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.success`

```python
success: bool
```

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.test_cases_and_results`

```python
test_cases_and_results: List[Tuple[TestCase, TestCaseResult]]
```

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.test_results`

```python
test_results: List[TestCaseResult]
```

Get all test results.

#### `metadata.sdk.data_quality.dataframes.validation_results.ValidationResult.total_tests`

```python
total_tests: int
```

### `metadata.sdk.data_quality.dataframes.validation_results.logger`

```python
logger = logging.getLogger(__name__)
```
