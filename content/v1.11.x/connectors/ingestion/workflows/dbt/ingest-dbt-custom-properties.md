---
title: Ingest Custom Properties from dbt | OpenMetadata Custom Metadata Guide
description: Ingest dbt custom properties to enrich table metadata with organization-specific attributes and values.
slug: /connectors/ingestion/workflows/dbt/ingest-dbt-custom-properties
---

# Ingest Custom Properties from dbt

Ingest custom property values from `manifest.json` file to enrich table metadata with organization-specific attributes in OpenMetadata.

Custom properties allow you to extend the standard metadata model with additional fields specific to your organization's needs, such as SLA hours, data classification levels, or refresh frequencies.

## Requirements

{% note %}

For dbt Custom Properties, the custom properties must be pre-defined on the Table entity type in OpenMetadata before ingestion. If a custom property is not defined, a warning will be logged and that property will be skipped.

{% /note %}

## Steps for ingesting dbt Custom Properties

### 1. Define Custom Properties in OpenMetadata

Before ingesting custom properties from dbt, you need to define them on the Table entity type in OpenMetadata.

1. Navigate to **Settings > Custom Properties > Tables**
2. Click **Add Property**
3. Define the property name and type

For detailed instructions, refer to the [Custom Properties documentation](/how-to-guides/guide-for-data-users/custom).

### 2. Add Custom Properties in schema.yml file

To set custom property values for a table in your dbt model, add them under `model->name->meta->openmetadata->customProperties` in your `schema.yml` file.

For more details on dbt meta field follow the link [here](https://docs.getdbt.com/reference/resource-configs/meta).

```yml
models:
  - name: customers
    meta:
      openmetadata:
        customProperties:
          sla_hours: 24
          data_steward: "John Doe"
          refresh_frequency: "daily"
    description: This table has basic information about a customer

    columns:
      - name: customer_id
        description: This is a unique identifier for a customer
        tests:
          - unique
          - not_null
```

### 3. Supported Custom Property Types

OpenMetadata supports various custom property types. The following table shows all supported types and their expected formats:

| Type | Description | Example Value |
|------|-------------|---------------|
| `string` | Plain text value | `"value"` |
| `integer` | Whole number | `42` |
| `number` | Decimal number | `3.14` |
| `markdown` | Markdown formatted text | `"# Header\nContent"` |
| `sqlQuery` | SQL query string | `"SELECT * FROM table"` |
| `email` | Valid email address | `"user@example.com"` |
| `date-cp` | Date string | `"2024-01-15"` |
| `dateTime-cp` | DateTime string | `"2024-01-15T10:30:00"` |
| `time-cp` | Time string | `"10:30:00"` |
| `timestamp` | Milliseconds since epoch | `1705315200000` |
| `duration` | ISO 8601 duration format | `"P23DT23H"` |
| `enum` | Single or multi-select value | `"High"` or `["High", "Critical"]` |
| `entityReference` | Reference to another entity | See example below |
| `entityReferenceList` | List of entity references | See example below |
| `timeInterval` | Time interval with start/end | See example below |
| `table-cp` | Tabular data with rows | See example below |

### 4. Advanced Examples

#### Entity Reference

Reference another entity (user, team, dashboard, etc.) in OpenMetadata:

```yml
models:
  - name: customers
    meta:
      openmetadata:
        customProperties:
          data_owner:
            type: "user"
            fqn: "john.doe"
          related_dashboard:
            type: "dashboard"
            fqn: "service.dashboard_name"
```

#### Entity Reference List

Reference multiple entities:

```yml
models:
  - name: customers
    meta:
      openmetadata:
        customProperties:
          stakeholders:
            - type: "user"
              fqn: "john.doe"
            - type: "user"
              fqn: "jane.smith"
```

#### Time Interval

Specify a time range with start and end timestamps:

```yml
models:
  - name: customers
    meta:
      openmetadata:
        customProperties:
          valid_period:
            start: 1705315200000
            end: 1705401600000
```

#### Table Custom Property

For table-type custom properties with rows and columns:

```yml
models:
  - name: customers
    meta:
      openmetadata:
        customProperties:
          data_quality_rules:
            - rule_name: "not_null_check"
              threshold: 99.5
              severity: "high"
            - rule_name: "unique_check"
              threshold: 100
              severity: "critical"
```

### 5. Resulting manifest.json structure

After running your dbt workflow, the generated `manifest.json` file will include the custom properties under `node_name->config->meta->openmetadata->customProperties`:

```json
"model.jaffle_shop.customers": {
  "raw_sql": "sample_raw_sql",
  "compiled": true,
  "resource_type": "model",
  "depends_on": {},
  "database": "dev",
  "schema": "dbt_jaffle",
  "config": {
    "enabled": true,
    "alias": null,
    "meta": {
      "openmetadata": {
        "customProperties": {
          "sla_hours": 24,
          "data_steward": "John Doe",
          "refresh_frequency": "daily"
        }
      }
    }
  }
}
```

### 6. Viewing Custom Properties in OpenMetadata

Custom properties ingested from dbt can be viewed on the table details page under the **Custom Properties** section.


## Validation and Error Handling

The ingestion process validates custom property values against their defined types:

| Scenario | Behavior |
|----------|----------|
| Custom property not defined on Table entity | Warning logged, property skipped |
| Invalid value for property type | Warning logged with details, property skipped |
| Invalid enum value (single-select) | Warning logged, property skipped |
| Invalid enum value (multi-select) | Invalid values filtered out, valid values applied with warning |
| Missing required fields for complex types | Warning logged, property skipped |

Example warning message:
```
Validation failed for custom property 'sla_hours' (type: integer): Expected integer value. Provided value: "24 hours"
```

## Complete Example

Here's a comprehensive example showing multiple custom property types:

```yml
version: 2

models:
  - name: customers
    description: "Customer master data table"
    meta:
      openmetadata:
        domain: "Sales"
        tier: "Tier.Tier2"
        customProperties:
          sla_hours: 24
          data_classification: "Confidential"
          refresh_frequency: "hourly"
          last_certified: "2024-01-15"
          data_owner:
            type: "user"
            fqn: "john.doe"
          data_quality_rules:
            - rule_name: "completeness"
              threshold: 99.9
              severity: "high"
        owner:
          - "john_doe"
          - "data_engineering_team"

    columns:
      - name: customer_id
        description: "Unique customer identifier"
```
