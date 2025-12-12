---
title: Module `workflow_config_builder` of metadata.sdk.data_quality
slug: /sdk/python/api-reference/data-quality/workflow-as-code/workflow-config-builder
---

## `metadata.sdk.data_quality.workflow_config_builder`

Builder for creating OpenMetadata workflow configurations for test suite execution.

**Classes:**

- [**WorkflowConfigBuilder**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder) – Builds OpenMetadataWorkflowConfig for test suite execution.

**Attributes:**

- [**T**](#metadata.sdk.data_quality.workflow_config_builder.T) –

### `metadata.sdk.data_quality.workflow_config_builder.T`

```python
T = TypeVar('T', bound=BaseModel)
```

### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder`

```python
WorkflowConfigBuilder(client)
```

Builds OpenMetadataWorkflowConfig for test suite execution.

This builder encapsulates the logic for creating a complete workflow configuration
required to execute data quality tests against a table. It constructs the source,
processor, sink, and workflow configurations based on the provided table entity,
service connection, and test definitions.

**Attributes:**

- [**table**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.table) (`Optional[Table]`) – Table entity to run tests against
- [**service_connection**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.service_connection) (`Optional[DatabaseConnection]`) – Database service connection for the table
- [**ometa_config**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.ometa_config) (`Optional[DatabaseConnection]`) – OpenMetadata server configuration
- [**test_definitions**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.test_definitions) (`List[TestCaseDefinition]`) – List of test case definitions to execute

**Functions:**

- [**add_test_definition**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.add_test_definition) – Add test definition to workflow config
- [**add_test_definitions**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.add_test_definitions) – Add test definitions to the workflow configuration.
- [**build**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.build) – Build the complete OpenMetadata workflow configuration.
- [**with_enable_streamable_logs**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_enable_streamable_logs) –
- [**with_force_test_update**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_force_test_update) –
- [**with_log_level**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_log_level) –
- [**with_raise_on_error**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_raise_on_error) –
- [**with_success_threshold**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_success_threshold) –
- [**with_table**](#metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_table) –

**Parameters:**

- **client** (`OpenMetadata`) – OpenMetadata client

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.add_test_definition`

```python
add_test_definition(test_definition)
```

Add test definition to workflow config
Args:
test_definition: Test case definition to add

**Returns:**

- `Self` – Self

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.add_test_definitions`

```python
add_test_definitions(test_definitions)
```

Add test definitions to the workflow configuration.

**Parameters:**

- **test_definitions** (`List[TestCaseDefinition]`) – List of test case definitions to add

**Returns:**

- `Self` – Self for method chaining

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.build`

```python
build()
```

Build the complete OpenMetadata workflow configuration.

This method constructs all components of the workflow configuration:

- Source: TestSuite source with table FQN and service connection
- Processor: Test case runner with test definitions
- Sink: Metadata REST sink for persisting results
- WorkflowConfig: Logger and server settings

**Returns:**

- `OpenMetadataWorkflowConfig` – Complete OpenMetadataWorkflowConfig ready for execution

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.client`

```python
client: OMeta[Any, Any] = client
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.enable_streamable_logs`

```python
enable_streamable_logs: bool = False
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.force_test_update`

```python
force_test_update: bool = True
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.log_level`

```python
log_level: LogLevels = LogLevels.INFO
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.raise_on_error`

```python
raise_on_error: bool = False
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.service_connection`

```python
service_connection: Optional[DatabaseConnection] = None
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.success_threshold`

```python
success_threshold: int = 90
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.table`

```python
table: Optional[Table] = None
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.test_definitions`

```python
test_definitions: List[TestCaseDefinition] = []
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_enable_streamable_logs`

```python
with_enable_streamable_logs(enable)
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_force_test_update`

```python
with_force_test_update(force_test_update)
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_log_level`

```python
with_log_level(log_level)
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_raise_on_error`

```python
with_raise_on_error(raise_on_error)
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_success_threshold`

```python
with_success_threshold(success_threshold)
```

#### `metadata.sdk.data_quality.workflow_config_builder.WorkflowConfigBuilder.with_table`

```python
with_table(table_fqn)
```
