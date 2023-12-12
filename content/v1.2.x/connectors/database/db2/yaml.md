---
title: Run the DB2 Connector Externally
slug: /connectors/database/db2/yaml
---

# Run the DB2 Connector Externally

{% multiTablesWrapper %}

| Feature            | Status                       |
| :----------------- | :--------------------------- |
| Stage              | PROD                         |
| Metadata           | {% icon iconName="check" /%} |
| Query Usage        | {% icon iconName="cross" /%} |
| Data Profiler      | {% icon iconName="check" /%} |
| Data Quality       | {% icon iconName="check" /%} |
| Stored Procedures            | {% icon iconName="cross" /%} |
| DBT                | {% icon iconName="check" /%} |
| Supported Versions | --                           |

| Feature      | Status                       |
| :----------- | :--------------------------- |
| Lineage      | Partially via Views          |
| Table-level  | {% icon iconName="check" /%} |
| Column-level | {% icon iconName="check" /%} |

{% /multiTablesWrapper %}

In this section, we provide guides and references to use the DB2 connector.

Configure and schedule DB2 metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Data Profiler](#data-profiler)
- [dbt Integration](#dbt-integration)

{% partial file="/v1.2/connectors/external-ingestion-deployment.md" /%}

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 0.12 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}



To create a new Db2 user please follow the guidelines mentioned [here](https://www.ibm.com/docs/ko/samfess/8.2.0?topic=schema-creating-users-manually)

Db2 user must have the below permissions to ingest the metadata:

- `SELECT` privilege on `SYSCAT.SCHEMATA` to fetch the metadata of schemas.
```sql
-- Grant SELECT on tables for schema metadata
GRANT SELECT ON SYSCAT.SCHEMATA TO USER_NAME;
```

- `SELECT` privilege on `SYSCAT.TABLES` to fetch the metadata of tables.
```sql
-- Grant SELECT on tables for table metadata
GRANT SELECT ON SYSCAT.TABLES TO USER_NAME;
```

- `SELECT` privilege on `SYSCAT.VIEWS` to fetch the metadata of views.
```sql
-- Grant SELECT on tables for view metadata
GRANT SELECT ON SYSCAT.VIEWS TO USER_NAME;
```

### Profiler & Data Quality
Executing the profiler workflow or data quality tests, will require the user to have `SELECT` permission on the tables/schemas where the profiler/tests will be executed. More information on the profiler workflow setup can be found [here](https://docs.open-metadata.org/connectors/ingestion/workflows/profiler) and data quality tests [here](https://docs.open-metadata.org/connectors/ingestion/workflows/data-quality).

### Python Requirements

To run the DB2 ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[db2]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/database/db2Connection.json)
you can find the structure to create a connection to DB2.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for DB2:


{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**username**: Specify the User to connect to DB2. It should have enough privileges to read all the metadata.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**password**: Password to connect to DB2.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**hostPort**: Enter the fully qualified hostname and port number for your DB2 deployment in the Host and Port field.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**database**: Database of the data source.

{% /codeInfo %}

{% partial file="/v1.2/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.2/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.2/connectors/yaml/workflow-config-def.md" /%}

#### Advanced Configuration

{% codeInfo srNumber=5 %}

**Connection Options (Optional)**: Enter the details for any additional connection options that can be sent to Athena during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent to Athena during the connection. These details must be added as Key-Value pairs.

- In case you are using Single-Sign-On (SSO) for authentication, add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "sso_login_url"`

{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml
source:
  type: db2
  serviceName: local_db2
  serviceConnection:
    config:
      type: Db2
```
```yaml {% srNumber=1 %}
      username: openmetadata_user
```
```yaml {% srNumber=2 %}
      password: openmetadata_password
```
```yaml {% srNumber=3 %}
      hostPort: localhost:5432
```
```yaml {% srNumber=4 %}
      # databaseSchema: schema
```
```yaml {% srNumber=5 %}
      # connectionOptions:
      #   key: value
```
```yaml {% srNumber=6 %}
      # connectionArguments:
      #   key: value
```


{% partial file="/v1.2/connectors/yaml/database/source-config.md" /%}

{% partial file="/v1.2/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.2/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.2/connectors/yaml/ingestion-cli.md" /%}

{% partial file="/v1.2/connectors/yaml/data-profiler.md" variables={connector: "db2"} /%}

## dbt Integration

{% tilesContainer %}

{% tile
  icon="mediation"
  title="dbt Integration"
  description="Learn more about how to ingest dbt models' definitions and their lineage."
  link="/connectors/ingestion/workflows/dbt" /%}

{% /tilesContainer %}
