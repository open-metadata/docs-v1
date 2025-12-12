---
title: Running test on DataFrames
slug: /sdk/python/api-reference/data-quality/dataframe-validation/dataframe-validator-engine
---

## `metadata.sdk.data_quality.dataframes.dataframe_validation_engine`

Orchestration engine for DataFrame validation execution.

**Classes:**

- [**DataFrameValidationEngine**](#metadata.sdk.data_quality.dataframes.dataframe_validation_engine.DataFrameValidationEngine) – Orchestrates execution of multiple validators on a DataFrame.

**Attributes:**

- [**logger**](#metadata.sdk.data_quality.dataframes.dataframe_validation_engine.logger) –

### `metadata.sdk.data_quality.dataframes.dataframe_validation_engine.DataFrameValidationEngine`

```python
DataFrameValidationEngine(test_cases)
```

Orchestrates execution of multiple validators on a DataFrame.

**Functions:**

- [**execute**](#metadata.sdk.data_quality.dataframes.dataframe_validation_engine.DataFrameValidationEngine.execute) – Execute all validations and return aggregated results.

**Attributes:**

- [**test_cases**](#metadata.sdk.data_quality.dataframes.dataframe_validation_engine.DataFrameValidationEngine.test_cases) (`List[TestCase]`) –

#### `metadata.sdk.data_quality.dataframes.dataframe_validation_engine.DataFrameValidationEngine.execute`

```python
execute(df, mode=FailureMode.SHORT_CIRCUIT)
```

Execute all validations and return aggregated results.

**Parameters:**

- **df** (`DataFrame`) – DataFrame to validate
- **mode** (`FailureMode`) – Validation mode (only "short-circuit" supported)

**Returns:**

- `ValidationResult` – ValidationResult with outcomes for all tests

#### `metadata.sdk.data_quality.dataframes.dataframe_validation_engine.DataFrameValidationEngine.test_cases`

```python
test_cases: List[TestCase] = test_cases
```

### `metadata.sdk.data_quality.dataframes.dataframe_validation_engine.logger`

```python
logger = logging.getLogger(__name__)
```
