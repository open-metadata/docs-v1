---
title: Module `runner` of metadata.sdk.data_quality
slug: /sdk/python/api-reference/data-quality/workflow-as-code/runner
---

## `metadata.sdk.data_quality.runner`

Class that allows running data quality checks by code

**Classes:**

- [**TestRunner**](#metadata.sdk.data_quality.runner.TestRunner) – Simplified test runner for executing data quality tests on OpenMetadata tables.

### `metadata.sdk.data_quality.runner.TestRunner`

```python
TestRunner(table_fqn, client=None)
```

Simplified test runner for executing data quality tests on OpenMetadata tables.

This class provides a fluent API for defining and executing data quality tests
against tables in OpenMetadata. It handles test case creation, workflow configuration,
and result collection.

The runner automatically fetches table metadata and service connections from OpenMetadata,
builds test cases from test definitions, and executes them using the TestSuiteWorkflow.

**Attributes:**

- [**table_fqn**](#metadata.sdk.data_quality.runner.TestRunner.table_fqn) (`str`) – Fully qualified name of the table to test
- [**client**](#metadata.sdk.data_quality.runner.TestRunner.client) (`OpenMetadata`) – OpenMetadata API client

**Examples:**

```pycon
>>> from metadata.sdk.data_quality import TestRunner, TableRowCountToBeBetween
>>> runner = TestRunner.for_table("MySQL.default.db.table")
>>> runner.add_test(TableRowCountToBeBetween(min_count=100, max_count=1000))
>>> results = runner.run()
```

**Functions:**

- [**add_test**](#metadata.sdk.data_quality.runner.TestRunner.add_test) – Add a test definition to be executed.
- [**add_tests**](#metadata.sdk.data_quality.runner.TestRunner.add_tests) – Add multiple test definitions at once.
- [**for_table**](#metadata.sdk.data_quality.runner.TestRunner.for_table) – Initialize runner for a specific table FQN.
- [**from_yaml**](#metadata.sdk.data_quality.runner.TestRunner.from_yaml) – Build TestRunner from a YAML workflow string.
- [**run**](#metadata.sdk.data_quality.runner.TestRunner.run) – Execute all added tests and return results.
- [**setup**](#metadata.sdk.data_quality.runner.TestRunner.setup) – Change the default configuration for the workflow.

**Parameters:**

- **table_fqn** (`str`) – Fully qualified name of the table
- **client** (`Optional[OpenMetadata[Any, Any]]`) – Optional OpenMetadata client (will create one if not provided)

#### `metadata.sdk.data_quality.runner.TestRunner.add_test`

```python
add_test(test_definition)
```

Add a test definition to be executed.

**Parameters:**

- **test_definition** (`BaseTest`) – Test definition instance (e.g., TableColumnCountToBeBetween)

**Returns:**

- Self for method chaining

#### `metadata.sdk.data_quality.runner.TestRunner.add_tests`

```python
add_tests(*test_definitions)
```

Add multiple test definitions at once.

**Parameters:**

- \***test_definitions** (`BaseTest`) – Variable number of test definition instances

**Returns:**

- Self for method chaining

**Examples:**

```pycon
>>> runner.add_tests(
...     TableRowCountToBeBetween(min_count=100),
...     ColumnValuesToBeNotNull(column="user_id")
... )
```

#### `metadata.sdk.data_quality.runner.TestRunner.client`

```python
client: OMeta[Any, Any] = client
```

#### `metadata.sdk.data_quality.runner.TestRunner.config_builder`

```python
config_builder: WorkflowConfigBuilder = WorkflowConfigBuilder(client)
```

#### `metadata.sdk.data_quality.runner.TestRunner.for_table`

```python
for_table(table_fqn, client=None)
```

Initialize runner for a specific table FQN.

**Parameters:**

- **table_fqn** (`str`) – Fully qualified name of the table (e.g., "MySQL.default.db.table")
- **client** (`Optional[OpenMetadata[Any, Any]]`) – Optional OpenMetadata client (will create one if not provided)

**Returns:**

- `Self` – TestRunner instance

**Examples:**

```pycon
>>> from metadata.sdk.data_quality import TestRunner, TableColumnCountToBeBetween
>>> runner = TestRunner.for_table("MySQL.default.db.table")
>>> runner.add_test(TableColumnCountToBeBetween(min_count=10))
>>> results = runner.run()
```

#### `metadata.sdk.data_quality.runner.TestRunner.from_yaml`

```python
from_yaml(
    *,
    yaml_string=None,
    file_path=None,
    use_connection_from_yaml=False,
    client=None
)
```

Build TestRunner from a YAML workflow string.

#### `metadata.sdk.data_quality.runner.TestRunner.run`

```python
run()
```

Execute all added tests and return results.

**Returns:**

- `List[TestCaseResultResponse]` – List of test case results

#### `metadata.sdk.data_quality.runner.TestRunner.setup`

```python
setup(
    force_test_update=False,
    log_level=LogLevels.INFO,
    raise_on_error=False,
    success_threshold=90,
    enable_streamable_logs=False,
)
```

Change the default configuration for the workflow.

**Parameters:**

- **force_test_update** (`bool`) – Force test update even if tests already exist.
- **log_level** (`LogLevels`) – Log level to use.
- **raise_on_error** (`bool`) – Raise exception if test data already exists.
- **success_threshold** (`int`) – threshold below which the test will fail.
- **enable_streamable_logs** (`bool`) – Enable streamable logs.

**Returns:**

- None

#### `metadata.sdk.data_quality.runner.TestRunner.table_fqn`

```python
table_fqn: str = table_fqn
```

#### `metadata.sdk.data_quality.runner.TestRunner.test_definitions`

```python
test_definitions: List[TestCaseDefinition]
```
