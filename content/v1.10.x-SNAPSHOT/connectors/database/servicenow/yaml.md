---
title: Run the ServiceNow Connector Externally
description: Learn how to configure and run ServiceNow connector externally with YAML. Set up metadata ingestion workflows, requirements, and advanced options.
slug: /connectors/database/servicenow/yaml
Collate: true
---

{% connectorDetailsHeader
name="ServiceNow"
stage="BETA"
platform="Collate"
availableFeatures=["Metadata", "Lineage"]
unavailableFeatures=["Query Usage", "Data Profiler", "Data Quality", "dbt", "Stored Procedures", "Owners", "Tags", "Sample Data", "Auto-Classification"]
/ %}

In this section, we provide guides and references to use the ServiceNow connector.

Configure and schedule ServiceNow metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.9/connectors/external-ingestion-deployment.md" /%}

## Requirements

To fetch metadata from ServiceNow into OpenMetadata you will need:

1. An accessible ServiceNow instance URL (e.g. `https://your-instance.service-now.com`).
2. A ServiceNow username with read access to `sys_db_object` and `sys_dictionary` tables.
3. The password for the ServiceNow user.

## Metadata Ingestion

All connectors are defined as JSON Schemas. Here you can find the structure to create a connection to ServiceNow.

In order to create and run a Metadata Ingestion workflow, we will follow the steps to create a YAML configuration able to connect to the source, process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following [JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/database/serviceNowConnection.json)

### 1. Define the YAML Config

This is a sample config for ServiceNow:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**hostPort**: Your ServiceNow instance URL (e.g., `https://your-instance.service-now.com`).

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**username**: Username to connect to ServiceNow. This user should have read access to `sys_db_object` and `sys_dictionary` tables.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**password**: Password to connect to ServiceNow.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**includeScopes**: If true, ServiceNow application scopes will be imported as database schemas. Otherwise, a single default schema will be used. Default: `false`.

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**includeSystemTables**: If true, both admin and system tables (`sys_*` tables) will be fetched. If false, only admin tables will be fetched. Default: `false`.

{% /codeInfo %}

{% partial file="/v1.9/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.9/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.9/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: servicenow
  serviceName: local_servicenow
  serviceConnection:
    config:
      type: ServiceNow
      hostPort: https://your-instance.service-now.com  # {% srNumber=1 %}
      username: your_username  # {% srNumber=2 %}
      password: your_password  # {% srNumber=3 %}
      includeScopes: false  # {% srNumber=4 %}
      includeSystemTables: false  # {% srNumber=5 %}
  sourceConfig:
    config:
      type: DatabaseMetadata
      # tableFilterPattern:
      #   includes:
      #     - table1
      #     - table2
      #   excludes:
      #     - table3
      #     - table4

sink:
  type: metadata-rest
  config:
    api_endpoint: <OpenMetadata host and port>
    auth_provider_type: <OpenMetadata auth provider>

workflowConfig:
  # loggerLevel: DEBUG  # DEBUG, INFO, WARN or ERROR
  openMetadataServerConfig:
    hostPort: <OpenMetadata host and port>
    authProvider: <OpenMetadata auth provider>
```

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.9/connectors/yaml/workflow-config.md" /%}

{% partial file="/v1.9/connectors/yaml/ingestion-cli.md" /%}

## Advanced Configuration

### Connection Options

Additional connection options can be configured in YAML:

```yaml
source:
  type: servicenow
  serviceConnection:
    config:
      type: ServiceNow
      hostPort: https://your-instance.service-now.com
      username: your_username
      password: your_password
      connectionOptions:
        key: value
```

### Connection Arguments

Additional connection arguments can be configured in YAML:

```yaml
source:
  type: servicenow
  serviceConnection:
    config:
      type: ServiceNow
      hostPort: https://your-instance.service-now.com
      username: your_username
      password: your_password
      connectionArguments:
        key: value
```

### Table Filter Pattern

You can filter tables to include or exclude using regex patterns:

```yaml
source:
  type: servicenow
  serviceConnection:
    config:
      type: ServiceNow
      hostPort: https://your-instance.service-now.com
      username: your_username
      password: your_password
      tableFilterPattern:
        includes:
          - "^sys_.*"  # Include all system tables
          - "^u_.*"    # Include all user-defined tables
        excludes:
          - ".*_temp$"  # Exclude temporary tables
```