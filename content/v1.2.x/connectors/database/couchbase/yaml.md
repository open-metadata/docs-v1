---
title: Run the Couchbase Connector Externally
slug: /connectors/database/couchbase/yaml
---

# Run the Couchbase Connector Externally

{% multiTablesWrapper %}

| Feature            | Status                       |
| :----------------- | :--------------------------- |
| Stage              | PROD                         |
| Metadata           | {% icon iconName="check" /%} |
| Query Usage        | {% icon iconName="cross" /%} |
| Data Profiler      | {% icon iconName="cross" /%} |
| Data Quality       | {% icon iconName="cross" /%} |
| Stored Procedures            | {% icon iconName="cross" /%} |
| DBT                | {% icon iconName="check" /%} |
| Supported Versions | --                           |

| Feature      | Status                       |
| :----------- | :--------------------------- |
| Lineage      | {% icon iconName="cross" /%}          |
| Table-level  | {% icon iconName="cross" /%} |
| Column-level | {% icon iconName="cross" /%} |

{% /multiTablesWrapper %}

In this section, we provide guides and references to use the Couchbase connector.

Configure and schedule Couchbase metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.2/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/couchbase/yaml"} /%}

{% partial file="/v1.2/connectors/external-ingestion-deployment.md" /%}

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 0.12 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}

### Python Requirements

To run the Couchbase ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[couchbase]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/database/couchbaseConnection.json)
you can find the structure to create a connection to Couchbase.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Couchbase:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**username**: Username to connect to Couchbase.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**password**: Password to connect to Couchbase.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**hostport**: If couchbase is hosted on cloud then the hostport parameter specifies the connection string and if you are using couchbase server then the hostport parameter specifies hostname of the Couchbase. This should be specified as a string in the format `hostname` or `xyz.cloud.couchbase.com`. E.g., `localhost`.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**bucketName**: Optional name to give to the bucket name in OpenMetadata. If left blank, we will ingest all the bucket names.

{% /codeInfo %}

{% partial file="/v1.2/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.2/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.2/connectors/yaml/workflow-config-def.md" /%}

#### Advanced Configuration

{% codeInfo srNumber=7 %}

**Connection Options (Optional)**: Enter the details for any additional connection options that can be sent to Athena during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}


{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml
source:
  type: couchbase
  serviceName: local_couchbase
  serviceConnection:
    config:
      type: Couchbase
```
```yaml {% srNumber=1 %}
        username: username
```
```yaml {% srNumber=2 %}
        password: password
```
```yaml {% srNumber=3 %}
        hostport: localhost
```

```yaml {% srNumber=4 %}
      bucket: custom_bucket_name
```

{% partial file="/v1.2/connectors/yaml/database/source-config.md" /%}

{% partial file="/v1.2/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.2/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.2/connectors/yaml/ingestion-cli.md" /%}

## Related

{% tilesContainer %}

{% tile
    title="Ingest with Airflow"
    description="Configure the ingestion using Airflow SDK"
    link="/connectors/database/mongodb/airflow"
  / %}

{% /tilesContainer %}
