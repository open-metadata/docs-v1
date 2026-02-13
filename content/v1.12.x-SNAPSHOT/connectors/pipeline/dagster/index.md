---
title: Dagster Connector | OpenMetadata Pipeline Integration
description: Connect Dagster pipelines to OpenMetadata with our comprehensive integration guide. Learn setup, configuration, and metadata extraction in minutes.
slug: /connectors/pipeline/dagster
---

{% connectorDetailsHeader
name="Dagster"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Pipelines", "Pipeline Status", "Tags", "Usage", "Lineage"]
unavailableFeatures=["Owners"]
/ %}


In this section, we provide guides and references to use the Dagster connector.

Configure and schedule Dagster metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
  - [Dagster Versions](#dagster-versions)
- [Metadata Ingestion](#metadata-ingestion)
    - [Service Name](#service-name)
    - [Connection Details](#connection-details)
    - [Metadata Ingestion Options](#metadata-ingestion-options)
- [Lineage](#lineage)
  - [Extracting Lineage](#extracting-lineage)
  - [Best Practices for Lineage](#best-practices-for-lineage)
- [Troubleshooting](/connectors/pipeline/dagster/troubleshooting)
  - [Workflow Deployment Error](#workflow-deployment-error)

{% partial file="/v1.12/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/dagster/yaml"} /%}

## Requirements

### Dagster Versions

OpenMetadata is integrated with dagster up to version [1.0.13](https://docs.dagster.io/getting-started) and will continue to work for future dagster versions.

The ingestion framework uses [dagster graphql python client](https://docs.dagster.io/_apidocs/libraries/dagster-graphql#dagster_graphql.DagsterGraphQLClient) to connect to the dagster instance and perform the API calls

## Metadata Ingestion

{% partial 
  file="/v1.12/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Dagster", 
    selectServicePath: "/images/v1.12/connectors/dagster/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/dagster/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/dagster/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

{% collateContent %}

{% note %} 

When using a **Hybrid Ingestion Runner**, any sensitive credential fields—such as passwords, API keys, or private keys—must reference secrets using the following format:

```
password: secret:/my/database/password
```

This applies **only to fields marked as secrets** in the connection form (these typically mask input and show a visibility toggle icon).

For a complete guide on managing secrets in hybrid setups, see the [Hybrid Ingestion Runner Secret Management Guide](https://docs.getcollate.io/getting-started/day-1/hybrid-saas/hybrid-ingestion-runner#3.-manage-secrets-securely).

{% /note %}

{% /collateContent %}

- **Host**: Host of the dagster eg.`https://localhost:300` or `https://127.0.0.1:3000` or `https://<yourorghere>.dagster.cloud/prod`
- **Token** : Need pass token if connecting to `dagster cloud` instance
  - Log in to your Dagster account.
  - Click on the "Settings" link in the top navigation bar.
  - Click on the "API Keys" tab.
  - Click on the "Create a New API Key" button.
  - Give your API key a name and click on the "Create API Key" button.
  - Copy the generated API key to your clipboard and paste it in the field.
- **Strip Asset Key Prefix Length**: Number of leading segments to remove from asset key paths before resolving to tables. Dagster asset keys are path-like identifiers (e.g., `["project", "environment", "schema", "table"]`). 
OpenMetadata matches these to tables using `database.schema.table` or `schema.table` format. 
If your asset keys include additional prefix segments (project, environment, etc.), use this setting to strip them. 
For example, setting value to `2` on asset key `["project", "env", "schema", "table"]` results in `schema.table`. 
Default: `0` (no stripping). See [detailed examples](#lineage) in the Lineage section below.

{% /extraContent %}

{% partial file="/v1.12/connectors/test-connection.md" /%}

{% partial file="/v1.12/connectors/pipeline/configure-ingestion.md" /%}

{% partial file="/v1.12/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

## Lineage

OpenMetadata extracts **asset-based lineage** from Dagster. When your Dagster assets have dependencies on other assets, OpenMetadata creates lineage edges between the corresponding tables in your data catalog.

```
[Source Table] --> [Dagster Pipeline] --> [Target Table]
```

### Prerequisites for Lineage Extraction

For OpenMetadata to extract lineage from your Dagster instance, you need:

1. **Software-Defined Assets** - Your Dagster pipelines must use [Software-Defined Assets](https://docs.dagster.io/concepts/assets/software-defined-assets) (not legacy ops/solids without assets)
2. **Asset Dependencies** - Assets must declare their upstream dependencies using the `deps` parameter
3. **Matching Tables in OpenMetadata** - The tables referenced by your assets must already exist in OpenMetadata (ingested from your database services)

### Extracting Lineage

#### Lineage Will Be Extracted When:

**1. Assets Use Database-Style Naming (Recommended)**

If your asset keys follow the `database.schema.table` naming pattern, lineage extraction works automatically:

```python
from dagster import asset

@asset(key=["my_database", "my_schema", "customers"])
def customers():
    # Reads from source and writes to my_database.my_schema.customers
    ...

@asset(
    key=["my_database", "my_schema", "customer_orders"],
    deps=[customers]  # Declares dependency on customers asset
)
def customer_orders():
    # This creates lineage: customers -> customer_orders
    ...
```

**Supported key formats:**

| Asset Key | Interpretation |
|-----------|----------------|
| `["database", "schema", "table"]` | Full path - best for lineage |
| `["schema", "table"]` | Schema and table only |
| `["table"]` | Table name only |

**Using stripAssetKeyPrefixLength for Asset Keys with Prefixes**

If your asset keys include additional prefix segments (e.g., project name, environment), use the `stripAssetKeyPrefixLength` configuration to remove them before matching to tables:

**Example 1: Stripping Environment Prefix**

```python
# Your Dagster asset keys include environment prefix
@asset(key=["prod", "analytics_db", "public", "customers"])
def customers():
    ...

@asset(
    key=["prod", "analytics_db", "public", "orders"],
    deps=[customers]
)
def orders():
    ...
```

**Configuration:**
```yaml
sourceConfig:
  config:
    stripAssetKeyPrefixLength: 1  # Remove the first segment ("prod")
```

**Result:** Asset keys become `["analytics_db", "public", "customers"]` and `["analytics_db", "public", "orders"]`, which match the table format `database.schema.table`.

**Example 2: Stripping Multiple Prefixes**

```python
# Asset keys with project and environment prefixes
@asset(key=["my_project", "staging", "warehouse", "raw", "users"])
def users():
    ...
```

**Configuration:**
```yaml
sourceConfig:
  config:
    stripAssetKeyPrefixLength: 2  # Remove first two segments ("my_project", "staging")
```

**Result:** Asset key becomes `["warehouse", "raw", "users"]`, matching `warehouse.raw.users` in OpenMetadata.

**2. Assets Include Table Metadata in Materializations**

If your assets don't use database-style keys, you can still get lineage by including table metadata when materializing:

```python
from dagster import asset, MaterializeResult, MetadataValue

@asset(key=["raw_customers"])  # Custom naming
def raw_customers():
    # Your transformation logic
    return MaterializeResult(
        metadata={
            "database": MetadataValue.text("analytics_db"),
            "schema": MetadataValue.text("raw"),
            "table": MetadataValue.text("customers"),
        }
    )
```

**Recognized metadata labels:**
- Database: `database`, `db`, `database_name`
- Schema: `schema`, `schema_name`
- Table: `table`, `table_name`

**3. Assets Are Associated with Jobs**

Assets must be part of a Dagster job for lineage to be associated with that pipeline:

```python
from dagster import asset, define_asset_job, Definitions

@asset
def my_asset():
    ...

# Assets must be included in a job
my_job = define_asset_job("my_pipeline", selection=[my_asset])

defs = Definitions(
    assets=[my_asset],
    jobs=[my_job],
)
```

#### Lineage Will NOT Be Extracted When:

**1. Using Legacy Ops/Solids Without Assets**

```python
# This won't produce lineage
@op
def my_op():
    ...
```

**2. Assets Without Dependencies Declared**

```python
# No lineage - dependency not declared
@asset
def target_table():
    df = read_from_source_table()  # Implicit dependency
    ...

# Lineage works - dependency declared
@asset(deps=["source_table"])
def target_table():
    df = read_from_source_table()
    ...
```

**3. Assets Not Part of Any Job**

Assets that exist but aren't included in any job won't appear in pipeline lineage.

**4. Tables Don't Exist in OpenMetadata**

The source and target tables must be ingested into OpenMetadata from your database service. Run database metadata ingestion before pipeline ingestion.

**5. Asset Keys Don't Match Table Names**

```python
# Won't match if table in database is "user_data"
@asset(key=["users"])
def users():
    ...
```

### Specifying Database Services for Lineage

To help OpenMetadata find the correct tables, specify which database services to search in the ingestion configuration:

```yaml
sourceConfig:
  config:
    type: PipelineMetadata
    lineageInformation:
      dbServiceNames:
        - my_postgres
        - my_snowflake
```

If not specified, OpenMetadata searches all database services (which may be slower or produce incorrect matches if table names are duplicated across services).

### Best Practices for Lineage

1. **Use 3-Part Asset Keys**
   ```python
   @asset(key=["database", "schema", "table"])
   ```

2. **Always Declare Dependencies Explicitly**
   ```python
   @asset(deps=["upstream_asset"])
   def downstream_asset():
       ...
   ```

3. **Include Assets in Jobs**
   ```python
   my_job = define_asset_job("pipeline_name", selection="*")
   ```

4. **Add Metadata for Custom Naming**
   ```python
   return MaterializeResult(
       metadata={
           "database": MetadataValue.text("db_name"),
           "schema": MetadataValue.text("schema_name"),
           "table": MetadataValue.text("table_name"),
       }
   )
   ```

5. **Ingest Database Metadata First**
   - Run your database service ingestion before Dagster ingestion
   - Ensure tables exist in OpenMetadata before extracting pipeline lineage

### Troubleshooting Lineage

| Issue | Solution |
|-------|----------|
| No lineage appears | Check that assets have explicit `deps` declared |
| Tables not found | Ensure database metadata is ingested first |
| Wrong tables matched | Specify `dbServiceNames` in configuration |
| Assets missing from pipeline | Ensure assets are included in a job definition |
| Partial lineage | Check that both source and target tables exist in OpenMetadata |
