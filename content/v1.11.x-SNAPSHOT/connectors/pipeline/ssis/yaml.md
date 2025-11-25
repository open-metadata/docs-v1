---
title: Run the SSIS Connector Externally
slug: /connectors/pipeline/ssis/yaml
collate: true
---

{% connectorDetailsHeader
name="SSIS"
stage="BETA"
platform="Collate"
availableFeatures=["Pipelines", "Pipeline Status", "Lineage"]
unavailableFeatures=["Tags", "Owners"]
/ %}

In this section, we provide guides and references to use the SSIS connector.

Configure and schedule SSIS metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.11/connectors/external-ingestion-deployment.md" /%}

## Requirements

### Python Requirements

{% partial file="/v1.11/connectors/python-requirements.md" /%}

To run the SSIS ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[ssis]"
```


{% /note %}


## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/pipeline/ssisConnection.json)
you can find the structure to create a connection to SSIS.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for SSIS:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**databaseConnection**:

In terms of `databaseConnection` we support the following selections:

- `Mssql`: Pass the required credentials to reach out this service. We will
  create a connection to the pointed database and read SSIS data from there.

{% /codeInfo %}

{% codeInfo srNumber=7 %}

**packageConnection**:

To fetch task dependencies and lineage information from your SSIS pipelines, the connector requires access to the SSIS package XML files. You have two options:

- **Local Path**: Specify the local directory path where your SSIS package files are stored. The connector will read the XML files directly from this location during metadata extraction.

{% note noteType="Warning" %}
**Important:**
If you are using the **Local Path** option to provide your SSIS package files, you must run the ingestion workflow through the **CLI** instead of the UI. This is because the ingestion process needs direct access to your local filesystem, which is not available when running ingestion jobs from the UI or server.
{% /note %}

When configuring the SSIS connector to extract metadata from a **local path**, you need to provide the path up to the directory containing your SSIS project folders.

For example, if your projects are organized as:
```
/home/user/repos/
  project1/
    project1/
      ... .dtsx files
  project2/
    project2/
      ... .dtsx files
```

You should specify the path up to `/home/user/repos/` in your connector configuration. The connector will recursively scan this directory to locate all SSIS project folders and their package XML files.

- **S3 Bucket**: Upload your SSIS project folders containing the package XML files to an S3 bucket. Then, provide the S3 credentials (such as `awsAccessKeyId`, `awsSecretAccessKey`, and region) along with the bucket name in the connector configuration. The connector will retrieve the package files from your S3 storage.

When configuring the SSIS connector to extract metadata from S3 storage, you need to upload your SSIS project folders containing all your package files to your S3 bucket.

Typically, SSIS organizes projects in a structure like:
```
repos/
  project1/
    project1/
      ... .dtsx files
  project2/
    project2/
      ... .dtsx files
```

You should upload the inner project folders (e.g., `project1/project1/`, `project2/project2/`, etc.) into your S3 bucket. For example, if your bucket name is `packages`, the structure in your bucket should look like:
```
packages/
  project1/
    project1/
      ... .dtsx files
  project2/
    project2/
      ... .dtsx files
```

It is necessary to provide the same bucket name (e.g., `packages`) along with the credentials for your S3 storage when configuring the connector.

{% /codeInfo %}

{% partial file="/v1.11/connectors/yaml/pipeline/source-config-def.md" /%}

{% partial file="/v1.11/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.11/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: SSIS
  serviceName: ssis_source
  serviceConnection:
    config:
      type: SSIS
```
```yaml {% srNumber=6 %}
      databaseConnection:
        type: Mssql
        username: user
        password: pass
        database: db
        hostPort: localhost:1433
```
```yaml {% srNumber=7 %}
      packageConnection: /home/user/repos/
      # For S3:
      # packageConnection:
      #   type: S3
      #   awsConfig:
      #     awsAccessKeyId: test
      #     awsSecretAccessKey: test
      #     awsRegion: us-east-2
      #     endPointURL: https://packages.s3.us-east-2.amazonaws.com
      #   bucketNames:
      #     - bucket_name
```

{% partial file="/v1.11/connectors/yaml/pipeline/source-config.md" /%}

{% partial file="/v1.11/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.11/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.11/connectors/yaml/ingestion-cli.md" /%}
