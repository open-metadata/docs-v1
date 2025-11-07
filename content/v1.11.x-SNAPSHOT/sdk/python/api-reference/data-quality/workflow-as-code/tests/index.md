---
title: Module `tests` of metadata.sdk.data_quality
slug: /sdk/python/api-reference/data-quality/workflow-as-code/tests
---

## `metadata.sdk.data_quality.tests`

Convenience classes that represent test definitions

**Modules:**

- [**base_tests**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/base-tests) – Test definition wrappers for simplified DQ as Code API.
- [**column_tests**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests) – Column-level test definitions for DQ as Code API.
- [**table_tests**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests) – Table-level test definitions for DQ as Code API.

**Classes:**

- [**BaseTest**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/base-tests#metadata.sdk.data_quality.tests.base_tests.BaseTest) – Base class for all data quality test definitions.
- [**ColumnTest**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/base-tests#metadata.sdk.data_quality.tests.base_tests.ColumnTest) – Base class for column-level data quality test definitions.
- [**ColumnValueLengthsToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValueLengthsToBeBetween) – Validates that the length of string values in a column falls within a specified range.
- [**ColumnValueMaxToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValueMaxToBeBetween) – Validates that the maximum value in a column falls within a specified range.
- [**ColumnValueMeanToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValueMeanToBeBetween) – Validates that the mean (average) value in a column falls within a specified range.
- [**ColumnValueMedianToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValueMedianToBeBetween) – Validates that the median value in a column falls within a specified range.
- [**ColumnValueMinToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValueMinToBeBetween) – Validates that the minimum value in a column falls within a specified range.
- [**ColumnValueStdDevToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValueStdDevToBeBetween) – Validates that the standard deviation of column values falls within a specified range.
- [**ColumnValuesMissingCount**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesMissingCount) – Validates that the count of missing or null values meets expectations.
- [**ColumnValuesSumToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesSumToBeBetween) – Validates that the sum of all values in a column falls within a specified range.
- [**ColumnValuesToBeAtExpectedLocation**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeAtExpectedLocation) – Validates that a specific value appears at an expected row position.
- [**ColumnValuesToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeBetween) – Validates that all values in a column fall within a specified numeric range.
- [**ColumnValuesToBeInSet**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeInSet) – Validates that all values in a column belong to a specified set of allowed values.
- [**ColumnValuesToBeNotInSet**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotInSet) – Validates that column values do not contain any forbidden values.
- [**ColumnValuesToBeNotNull**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeNotNull) – Validates that a column contains no null or missing values.
- [**ColumnValuesToBeUnique**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToBeUnique) – Validates that all values in a column are unique with no duplicates.
- [**ColumnValuesToMatchRegex**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToMatchRegex) – Validates that column values match a specified regular expression pattern.
- [**ColumnValuesToNotMatchRegex**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/column-tests#metadata.sdk.data_quality.tests.column_tests.ColumnValuesToNotMatchRegex) – Validates that column values do not match a forbidden regular expression pattern.
- [**TableColumnCountToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableColumnCountToBeBetween) – Validates that the number of columns in a table falls within a specified range.
- [**TableColumnCountToEqual**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableColumnCountToEqual) – Validates that the table has an exact number of columns.
- [**TableColumnNameToExist**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableColumnNameToExist) – Validates that a specific column exists in the table schema.
- [**TableColumnToMatchSet**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableColumnToMatchSet) – Validates that table columns match an expected set of column names.
- [**TableCustomSQLQuery**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableCustomSQLQuery) – Validates data using a custom SQL query expression.
- [**TableDiff**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableDiff) – Compares two tables and identifies differences in their data.
- [**TableRowCountToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableRowCountToBeBetween) – Validates that the number of rows in a table falls within a specified range.
- [**TableRowCountToEqual**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableRowCountToEqual) – Validates that the table has an exact number of rows.
- [**TableRowInsertedCountToBeBetween**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/table-tests#metadata.sdk.data_quality.tests.table_tests.TableRowInsertedCountToBeBetween) – Validates that the number of rows inserted within a time range is within bounds.
- [**TableTest**](/sdk/python/api-reference/data-quality/workflow-as-code/tests/base-tests#metadata.sdk.data_quality.tests.base_tests.TableTest) – Base class for table-level data quality test definitions.