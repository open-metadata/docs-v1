---
title: Run the Looker Connector Externally
slug: /connectors/dashboard/looker/yaml
---

# Run the Looker Connector Externally

| Stage      | PROD                         |
|------------|------------------------------|
| Dashboards | {% icon iconName="check" /%} |
| Charts     | {% icon iconName="check" /%} |
| Owners     | {% icon iconName="check" /%} |
| Tags       | {% icon iconName="cross" /%} |
| Datamodels | {% icon iconName="check" /%} |
| Lineage    | {% icon iconName="check" /%} |

In this section, we provide guides and references to use the Looker connector.

Configure and schedule Looker metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.1/connectors/external-ingestion-deployment.md" /%}

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 0.12 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}

There are two types of metadata we ingest from Looker:
- Dashboards & Charts
- LookML Models

For the `project` metadata being ingested:
- We get the actual LookML Project an Explore or View is developed in.
- For Dashboards, we use the folder name from the UI, since there is no other hierarchy involved there.

In terms of permissions, we need a user with access to the Dashboards and LookML Explores that we want to ingest. You can
create your API credentials following these [docs](https://cloud.google.com/looker/docs/api-auth).

However, LookML Views are not present in the Looker SDK. Instead, we need to extract that information directly from
the GitHub repository holding the source `.lkml` files. In order to get this metadata, we will require a GitHub token
with read only access to the repository. You can follow these steps from the GitHub [documentation](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

{% note %}

The GitHub credentials are completely optional. Just note that without them, we won't be able to ingest metadata
out of LookML Views, including their lineage to the source databases.

{% /note %}

### Python Requirements

To run the Looker ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[looker]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas. 
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/dashboard/lookerConnection.json)
you can find the structure to create a connection to Looker.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Looker:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**clientId**: Specify the Client ID to connect to Looker. It should have enough privileges to read all the metadata.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**clientSecret**: Client Secret to connect to Looker.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**hostPort**: URL to the Looker instance.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**githubCredentials** (Optional): GitHub API credentials to extract LookML Views' information by parsing the source `.lkml` files. There are three
properties we need to add in this case:

- **repositoryOwner**: The owner (user or organization) of a GitHub repository. For example, in https://github.com/open-metadata/OpenMetadata, the owner is `open-metadata`.
- **repositoryName**: The name of a GitHub repository. For example, in https://github.com/open-metadata/OpenMetadata, the name is `OpenMetadata`.
- **token**: Token to use the API. This is required for private repositories and to ensure we don't hit API limits.

Follow these [steps](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token) in order to create a fine-grained personal access token.

When configuring, give repository access to `Only select repositories` and choose the one containing your LookML files. Then, we only need `Repository Permissions` as `Read-only` for `Contents`.


{% /codeInfo %}

#### Source Configuration - Source Config

{% codeInfo srNumber=5 %}

The `sourceConfig` is defined [here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/dashboardServiceMetadataPipeline.json):

- **dbServiceNames**: Database Service Names for ingesting lineage if the source supports it.
- **dashboardFilterPattern**, **chartFilterPattern**, **dataModelFilterPattern**: Note that all of them support regex as include or exclude. E.g., "My dashboard, My dash.*, .*Dashboard".
- **includeOwners**: Set the 'Include Owners' toggle to control whether to include owners to the ingested entity if the owner email matches with a user stored in the OM server as part of metadata ingestion. If the ingested entity already exists and has an owner, the owner will not be overwritten.
- **includeTags**: Set the 'Include Tags' toggle to control whether to include tags in metadata ingestion.
- **includeDataModels**: Set the 'Include Data Models' toggle to control whether to include tags as part of metadata ingestion.
- **markDeletedDashboards**: Set the 'Mark Deleted Dashboards' toggle to flag dashboards as soft-deleted if they are not present anymore in the source system.

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
  type: looker
  serviceName: local_looker
  serviceConnection:
    config:
      type: Looker
```
```yaml {% srNumber=1 %}
      clientId: Client ID
```
```yaml {% srNumber=2 %}
      clientSecret: Client Secret
```
```yaml {% srNumber=3 %}
      hostPort: http://hostPort
```
```yaml {% srNumber=4 %}
      gitCredentials:
        type: GitHub # Or BitBucket, depending on your hosting
        repositoryOwner: open-metadata
        repositoryName: OpenMetadata
        token: XYZ
```
```yaml {% srNumber=5 %}
  sourceConfig:
    config:
      type: DashboardMetadata
      overrideOwner: True
      # dbServiceNames:
      #   - service1
      #   - service2
      # dashboardFilterPattern:
      #   includes:
      #     - dashboard1
      #     - dashboard2
      #   excludes:
      #     - dashboard3
      #     - dashboard4
      # chartFilterPattern:
      #   includes:
      #     - chart1
      #     - chart2
      #   excludes:
      #     - chart3
      #     - chart4

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
