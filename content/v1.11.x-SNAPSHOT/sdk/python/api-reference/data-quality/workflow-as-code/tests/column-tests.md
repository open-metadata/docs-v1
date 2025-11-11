---
title: Module `column_tests` of metadata.sdk.data_quality.tests
slug: /sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests
---

## `metadata.sdk.data_quality.tests.column_tests`

Column-level test definitions for DQ as Code API.

**Classes:**

- [**ColumnValueLengthsToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween) – Validates that the length of string values in a column falls within a specified range.
- [**ColumnValueMaxToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween) – Validates that the maximum value in a column falls within a specified range.
- [**ColumnValueMeanToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween) – Validates that the mean (average) value in a column falls within a specified range.
- [**ColumnValueMedianToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween) – Validates that the median value in a column falls within a specified range.
- [**ColumnValueMinToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween) – Validates that the minimum value in a column falls within a specified range.
- [**ColumnValueStdDevToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween) – Validates that the standard deviation of column values falls within a specified range.
- [**ColumnValuesMissingCount**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount) – Validates that the count of missing or null values meets expectations.
- [**ColumnValuesSumToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween) – Validates that the sum of all values in a column falls within a specified range.
- [**ColumnValuesToBeAtExpectedLocation**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation) – Validates that a specific value appears at an expected row position.
- [**ColumnValuesToBeBetween**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween) – Validates that all values in a column fall within a specified numeric range.
- [**ColumnValuesToBeInSet**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet) – Validates that all values in a column belong to a specified set of allowed values.
- [**ColumnValuesToBeNotInSet**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet) – Validates that column values do not contain any forbidden values.
- [**ColumnValuesToBeNotNull**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull) – Validates that a column contains no null or missing values.
- [**ColumnValuesToBeUnique**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique) – Validates that all values in a column are unique with no duplicates.
- [**ColumnValuesToMatchRegex**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex) – Validates that column values match a specified regular expression pattern.
- [**ColumnValuesToNotMatchRegex**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex) – Validates that column values do not match a forbidden regular expression pattern.

### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween`

```python
ColumnValueLengthsToBeBetween(
    column,
    min_length=None,
    max_length=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the length of string values in a column falls within a specified range.

This test checks character count for text columns, useful for validating string
constraints, preventing truncation, and ensuring data format compliance.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_length** (`Optional[int]`) – Minimum acceptable string length
- **max_length** (`Optional[int]`) – Maximum acceptable string length
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValueLengthsToBeBetween(column="username", min_length=3, max_length=20)
>>> test = ColumnValueLengthsToBeBetween(column="description", min_length=10, max_length=500)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween`

```python
ColumnValueMaxToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the maximum value in a column falls within a specified range.

This test computes the maximum value across all rows and checks if it's within bounds.
Useful for monitoring data ranges and detecting outliers in the upper range.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable maximum value
- **max_value** (`Optional[float]`) – Maximum acceptable maximum value
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValueMaxToBeBetween(column="temperature", min_value=-50, max_value=50)
>>> test = ColumnValueMaxToBeBetween(column="score", min_value=90, max_value=100)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween`

```python
ColumnValueMeanToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the mean (average) value in a column falls within a specified range.

This test computes the arithmetic mean of all values and checks if it's within bounds.
Useful for statistical validation and detecting data drift in numeric columns.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable mean value
- **max_value** (`Optional[float]`) – Maximum acceptable mean value
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValueMeanToBeBetween(column="rating", min_value=3.0, max_value=4.5)
>>> test = ColumnValueMeanToBeBetween(column="response_time_ms", min_value=100, max_value=500)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween`

```python
ColumnValueMedianToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the median value in a column falls within a specified range.

This test computes the median (middle value) and checks if it's within bounds.
More robust than mean for skewed distributions, useful for detecting outliers.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable median value
- **max_value** (`Optional[float]`) – Maximum acceptable median value
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValueMedianToBeBetween(column="salary", min_value=50000, max_value=75000)
>>> test = ColumnValueMedianToBeBetween(column="age", min_value=25, max_value=45)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween`

```python
ColumnValueMinToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the minimum value in a column falls within a specified range.

This test computes the minimum value across all rows and checks if it's within bounds.
Useful for monitoring data ranges and detecting outliers in the lower range.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable minimum value
- **max_value** (`Optional[float]`) – Maximum acceptable minimum value
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValueMinToBeBetween(column="temperature", min_value=-50, max_value=0)
>>> test = ColumnValueMinToBeBetween(column="age", min_value=0, max_value=18)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween`

```python
ColumnValueStdDevToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the standard deviation of column values falls within a specified range.

This test computes the standard deviation (measure of variance) and checks if it's within bounds.
Useful for detecting unexpected data variability or consistency issues.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable standard deviation
- **max_value** (`Optional[float]`) – Maximum acceptable standard deviation
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValueStdDevToBeBetween(column="response_time", min_value=0, max_value=100)
>>> test = ColumnValueStdDevToBeBetween(column="score", min_value=5, max_value=15)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount`

```python
ColumnValuesMissingCount(
    column,
    missing_count_value=None,
    missing_value_match=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the count of missing or null values meets expectations.

This test counts rows with missing values and validates against expected thresholds.
Supports custom missing value patterns beyond NULL (e.g., "N/A", "", "NULL").

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **missing_count_value** (`Optional[int]`) – Expected number of missing values
- **missing_value_match** (`Optional[str]`) – List of strings to treat as missing values (optional)
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesMissingCount(column="optional_field", missing_count_value=100)
>>> test = ColumnValuesMissingCount(column="status", missing_value_match=["N/A", "Unknown"])
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween`

```python
ColumnValuesSumToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that the sum of all values in a column falls within a specified range.

This test computes the total sum across all rows and checks if it's within bounds.
Useful for validating totals, aggregates, and detecting unexpected data volumes.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable sum
- **max_value** (`Optional[float]`) – Maximum acceptable sum
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesSumToBeBetween(column="revenue", min_value=1000000, max_value=5000000)
>>> test = ColumnValuesSumToBeBetween(column="quantity", min_value=100, max_value=1000)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation`

```python
ColumnValuesToBeAtExpectedLocation(
    column,
    expected_value,
    row_index=0,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that a specific value appears at an expected row position.

This test checks for an exact value at a particular row index, useful for validating
sorted data, header rows, or expected entries at known positions.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **expected_value** (`str`) – The exact value expected at the specified location
- **row_index** (`int`) – Zero-based row position to check (default: 0)
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToBeAtExpectedLocation(column="id", expected_value="1", row_index=0)
>>> test = ColumnValuesToBeAtExpectedLocation(column="rank", expected_value="first", row_index=0)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween`

```python
ColumnValuesToBeBetween(
    column,
    min_value=None,
    max_value=None,
    name=None,
    display_name=None,
    description=None,
)
```

Bases: `ColumnTest`

Validates that all values in a column fall within a specified numeric range.

This test checks that individual column values are between minimum and maximum bounds.
Useful for validating numeric constraints, age ranges, prices, quantities, etc.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **min_value** (`Optional[float]`) – Minimum acceptable value (inclusive)
- **max_value** (`Optional[float]`) – Maximum acceptable value (inclusive)
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToBeBetween(column="age", min_value=0, max_value=120)
>>> test = ColumnValuesToBeBetween(column="price", min_value=0.01, max_value=9999.99)
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet`

```python
ColumnValuesToBeInSet(
    column, allowed_values, name=None, display_name=None, description=None
)
```

Bases: `ColumnTest`

Validates that all values in a column belong to a specified set of allowed values.

This test ensures data integrity by checking that column values are constrained
to a predefined list. Useful for enum-like columns or categorical data.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **allowed_values** (`List[str]`) – List of acceptable values for the column
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToBeInSet(column="status", allowed_values=["active", "inactive", "pending"])
>>> test = ColumnValuesToBeInSet(column="country_code", allowed_values=["US", "UK", "CA"])
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet`

```python
ColumnValuesToBeNotInSet(
    column, forbidden_values, name=None, display_name=None, description=None
)
```

Bases: `ColumnTest`

Validates that column values do not contain any forbidden values.

This test detects the presence of blacklisted or invalid values in a column.
Useful for data quality checks where certain values should never appear.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **forbidden_values** (`List[str]`) – List of values that must not appear in the column
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToBeNotInSet(column="email", forbidden_values=["test@test.com", "admin@admin.com"])
>>> test = ColumnValuesToBeNotInSet(column="status", forbidden_values=["deleted", "archived"])
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull`

```python
ColumnValuesToBeNotNull(column, name=None, display_name=None, description=None)
```

Bases: `ColumnTest`

Validates that a column contains no null or missing values.

This test ensures data completeness by checking for NULL values in a column.
One of the most common data quality tests for required fields.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToBeNotNull(column="user_id")
>>> test = ColumnValuesToBeNotNull(column="email")
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique`

```python
ColumnValuesToBeUnique(column, name=None, display_name=None, description=None)
```

Bases: `ColumnTest`

Validates that all values in a column are unique with no duplicates.

This test checks for duplicate values in columns that should contain unique identifiers
or keys. Essential for primary key and unique constraint validation.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToBeUnique(column="user_id")
>>> test = ColumnValuesToBeUnique(column="email")
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex`

```python
ColumnValuesToMatchRegex(
    column, regex, name=None, display_name=None, description=None
)
```

Bases: `ColumnTest`

Validates that column values match a specified regular expression pattern.

This test ensures data format consistency by checking that values conform to
expected patterns. Useful for emails, phone numbers, IDs, and formatted strings.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **regex** (`str`) – Regular expression pattern that values must match
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToMatchRegex(column="email", regex=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
>>> test = ColumnValuesToMatchRegex(column="phone", regex=r"^\+?1?\d{9,15}$")
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining

### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex`

```python
ColumnValuesToNotMatchRegex(
    column, regex, name=None, display_name=None, description=None
)
```

Bases: `ColumnTest`

Validates that column values do not match a forbidden regular expression pattern.

This test detects values that match unwanted patterns, useful for identifying
invalid formats, test data, or security risks.

**Parameters:**

- **column** (`str`) – Name of the column to validate
- **regex** (`str`) – Regular expression pattern that values must NOT match
- **name** (`Optional[str]`) – Custom test case name
- **display_name** (`Optional[str]`) – Custom display name for UI
- **description** (`Optional[str]`) – Custom test description

**Examples:**

```pycon
>>> test = ColumnValuesToNotMatchRegex(column="email", regex=r".*@test\.com$")
>>> test = ColumnValuesToNotMatchRegex(column="name", regex=r"^test.*")
```

**Functions:**

- [**to_test_case_definition**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.to_test_case_definition) – Create a test case definition from this test definition.
- [**with_compute_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_compute_row_count) – Enable or disable passed/failed row count computation.
- [**with_description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_description) – Set a custom description.
- [**with_display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_display_name) – Set a custom display name.
- [**with_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_name) – Set a custom test case name.

**Attributes:**

- [**column_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.column_name) (`str`) –
- [**compute_passed_failed_row_count**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.compute_passed_failed_row_count) (`bool`) –
- [**description**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.description) (`Optional[str]`) –
- [**display_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.display_name) (`Optional[str]`) –
- [**name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.name) (`Optional[str]`) –
- [**parameters**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.parameters) (`List[TestCaseParameterValue]`) –
- [**test_definition_name**](#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.test_definition_name) (`str`) –

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.column_name`

```python
column_name: str = column
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.compute_passed_failed_row_count`

```python
compute_passed_failed_row_count: bool = compute_passed_failed_row_count
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.description`

```python
description: Optional[str] = description
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.display_name`

```python
display_name: Optional[str] = display_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.name`

```python
name: Optional[str] = name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.parameters`

```python
parameters: List[TestCaseParameterValue] = []
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.test_definition_name`

```python
test_definition_name: str = test_definition_name
```

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.to_test_case_definition`

```python
to_test_case_definition()
```

Create a test case definition from this test definition.
Returns:
TestCaseDefinition instance

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_compute_row_count`

```python
with_compute_row_count(compute=True)
```

Enable or disable passed/failed row count computation.

When enabled, the test will compute and report the number and percentage
of rows that passed or failed the test validation.

**Parameters:**

- **compute** (`bool`) – Whether to compute row-level pass/fail statistics

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_description`

```python
with_description(description)
```

Set a custom description.

**Parameters:**

- **description** (`str`) – Detailed description of what this test validates

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_display_name`

```python
with_display_name(display_name)
```

Set a custom display name.

**Parameters:**

- **display_name** (`str`) – Human-readable name for UI display

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex.with_name`

```python
with_name(name)
```

Set a custom test case name.

**Parameters:**

- **name** (`str`) – Unique identifier for this test case

**Returns:**

- `Self` – Self for method chaining
