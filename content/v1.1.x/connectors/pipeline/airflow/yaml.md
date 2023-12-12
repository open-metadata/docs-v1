---
title: Run the Airflow Connector Externally
slug: /connectors/pipeline/airflow/yaml
---

# Run the Airflow Connector Externally

In this section, we provide guides and references to use the Airflow connector.

Configure and schedule Airflow metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.1/connectors/external-ingestion-deployment.md" /%}

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 0.12 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{% /inlineCallout %}



### Python Requirements

To run the Airflow ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[airflow]"
```

Note that this installs the same Airflow version that we ship in the Ingestion Container, which is
Airflow `2.3.3` from Release `0.12`.

The ingestion using Airflow version 2.3.3 as a source package has been tested against Airflow 2.3.3 and Airflow 2.2.5.

**Note:** we only support officially supported Airflow versions. You can check the version list [here](https://airflow.apache.org/docs/apache-airflow/stable/installation/supported-versions.html).

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/pipeline/airflowConnection.json)
you can find the structure to create a connection to Airflow.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Airflow:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

- 
- 
**connection**: Airflow metadata database connection. See
  these [docs](https://airflow.apache.org/docs/apache-airflow/stable/howto/set-up-database.html)
  for supported backends.

In terms of `connection` we support the following selections:

- `backend`: Should not be used from the UI. This is only applicable when ingesting Airflow metadata locally by running
  the ingestion from a DAG. It will use the current Airflow SQLAlchemy connection to extract the data.
- `MySQL`, `Postgres`, `MSSQL` and `SQLite`: Pass the required credentials to reach out each of these services. We will
  create a connection to the pointed database and read Airflow data from there.

**hostPort**: URL to the Airflow instance.


{% /codeInfo %}

{% codeInfo srNumber=1 %}

**numberOfStatus**: Number of status we want to look back to in every ingestion (e.g., Past executions from a DAG).



{% /codeInfo %}

{% codeInfo srNumber=1 %}

**connection**: Airflow metadata database connection. See
  these [docs](https://airflow.apache.org/docs/apache-airflow/stable/howto/set-up-database.html)
  for supported backends.

In terms of `connection` we support the following selections:

- `backend`: Should not be used from the UI. This is only applicable when ingesting Airflow metadata locally by running
  the ingestion from a DAG. It will use the current Airflow SQLAlchemy connection to extract the data.
- `MySQL`, `Postgres`, `MSSQL` and `SQLite`: Pass the required credentials to reach out each of these services. We will
  create a connection to the pointed database and read Airflow data from there.

{% /codeInfo %}



#### Source Configuration - Source Config

{% codeInfo srNumber=5 %}

The `sourceConfig` is defined [here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/pipelineServiceMetadataPipeline.json):

**dbServiceNames**: Database Service Name for the creation of lineage, if the source supports it.

**includeTags**: Set the 'Include Tags' toggle to control whether to include tags as part of metadata ingestion.

**markDeletedPipelines**: Set the Mark Deleted Pipelines toggle to flag pipelines as soft-deleted if they are not present anymore in the source system.

**pipelineFilterPattern** and **chartFilterPattern**: Note that the `pipelineFilterPattern` and `chartFilterPattern` both support regex as include or exclude.

{% /codeInfo %}


#### Sink Configuration

{% codeInfo srNumber=6 %}

To send the metadata to OpenMetadata, it needs to be specified as `type: metadata-rest`.

{% /codeInfo %}

{% partial file="/v1.1/connectors/workflow-config.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml
source:
  type: airflow
  serviceName: airflow_source
  serviceConnection:
    config:
      type: Airflow
```
```yaml {% srNumber=6 %}
      hostPort: http://localhost:8080
```
```yaml {% srNumber=6 %}
      numberOfStatus: 10
```
```yaml {% srNumber=6 %}
      # Connection needs to be one of Mysql, Postgres, Mssql or Sqlite
      connection:
        type: Mysql
        username: airflow_user
        password: airflow_pass
        databaseSchema: airflow_db
        hostPort: localhost:3306
        # #
        # type: Postgres
        # username: airflow_user
        # password: airflow_pass
        # database: airflow_db
        # hostPort: localhost:3306
        # #
        # type: Mssql
        # username: airflow_user
        # password: airflow_pass
        # database: airflow_db
        # hostPort: localhost:3306
        # uriString: http://... (optional)
        # #
        # type: Sqlite
        # username: airflow_user
        # password: airflow_pass
        # database: airflow_db
        # hostPort: localhost:3306
        # databaseMode: ":memory:" (optional)
```
```yaml {% srNumber=6 %}
  sourceConfig:
    config:
      type: PipelineMetadata
      # markDeletedPipelines: True
      # includeTags: True
      # includeLineage: true
      # pipelineFilterPattern:
      #   includes:
      #     - pipeline1
      #     - pipeline2
      #   excludes:
      #     - pipeline3
      #     - pipeline4
```
```yaml {% srNumber=6 %}
sink:
  type: metadata-rest
  config: {}
```

{% partial file="/v1.1/connectors/workflow-config-yaml.md" /%}

{% /codeBlock %}

{% /codePreview %}

### 2. Run with the CLI

First, we will need to save the YAML file. Afterward, and with all requirements installed, we can run:

```bash
metadata ingest -c <path-to-yaml>
```

Note that from connector to connector, this recipe will always be the same. By updating the YAML configuration,
you will be able to extract metadata from different sources.

