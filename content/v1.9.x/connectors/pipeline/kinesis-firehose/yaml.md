---
title: Run the AWS Kinesis Firehose Connector Externally
description: Set up AWS Kinesis Firehose ingestion using YAML to automate metadata syncing from delivery streams to your central catalog.
slug: /connectors/pipeline/kinesis-firehose/yaml
collate: true
---

{% connectorDetailsHeader
name="AWS Kinesis Firehose"
stage="PROD"
platform="Collate"
availableFeatures=["Pipelines", "Lineage"]
unavailableFeatures=["Owners", "Tags", "Pipeline Status"]
/ %}



In this section, we provide guides and references to use the AWS Kinesis Firehose connector.

Configure and schedule AWS Kinesis Firehose metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.9/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/pipeline/kinesis-firehose/yaml"} /%}

## Requirements

To extract metadata from AWS Kinesis Firehose, you need to configure AWS credentials with appropriate permissions:
- **AWS Credentials**: Valid AWS credentials (Access Key ID and Secret Access Key) or IAM role with permissions to access Kinesis Firehose
- **Permissions Required**:
  - `firehose:DescribeDeliveryStream` - To describe delivery stream details
  - `firehose:ListDeliveryStreams` - To list all delivery streams


### Python Requirements

{% partial file="/v1.9/connectors/python-requirements.md" /%}

To run the AWS Kinesis Firehose ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[kinesis-firehose]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/pipeline/kinesisFirehoseConnection.json)
you can find the structure to create a connection to AWS Kinesis Firehose.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for AWS Kinesis Firehose:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**awsAccessKeyId**: AWS Access Key ID is a unique identifier for your AWS account. It is used in combination with the Secret Access Key to authenticate API requests to AWS services. This is an optional field if you are using IAM roles or AWS profiles for authentication.

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**awsSecretAccessKey**: AWS Secret Access Key is a secret key that is used in combination with the Access Key ID to cryptographically sign API requests to AWS services. Keep this value secure and never share it. This is an optional field if you are using IAM roles or AWS profiles for authentication.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**awsRegion**: AWS Region where your Kinesis Firehose delivery streams are deployed. This is a required field.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**awsSessionToken**: AWS Session Token is a temporary credential that is required when using temporary security credentials. This field is optional.

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**endPointURL**: Custom endpoint URL for AWS services. Leave this field empty to use the default AWS endpoints.

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**profileName**: The name of an AWS profile configured in your AWS credentials file.

{% /codeInfo %}

{% codeInfo srNumber=7 %}

**assumeRoleArn**: The ARN of an IAM role to assume for accessing Kinesis Firehose resources.

{% /codeInfo %}

{% codeInfo srNumber=8 %}

**assumeRoleSessionName**: A unique identifier for the assumed role session. Default value: `OpenMetadataSession`

{% /codeInfo %}

{% codeInfo srNumber=9 %}

**assumeRoleSourceIdentity**: The source identity to associate with the assumed role session.

{% /codeInfo %}

{% codeInfo srNumber=10 %}

**messagingServiceName**: The Name of the ingested Kafka Messaging Service associated with this Firehose Pipeline Service upstream source.

{% /codeInfo %}

{% codeInfo srNumber=11 %}

**pipelineFilterPattern**: A regular expression pattern to filter which Kinesis Firehose delivery streams to include or exclude during metadata extraction.

{% /codeInfo %}


{% partial file="/v1.9/connectors/yaml/pipeline/source-config-def.md" /%}

{% partial file="/v1.9/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.9/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}


```yaml {% isCodeBlock=true %}
source:
  type: kinesis-firehose
  serviceName: kinesis_firehose_service
  serviceConnection:
    config:
      type: KinesisFirehose
```
```yaml {% srNumber=1 %}
      awsAccessKeyId: "YOUR_AWS_ACCESS_KEY_ID"
```
```yaml {% srNumber=2 %}
      awsSecretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY"
```
```yaml {% srNumber=3 %}
      awsRegion: "us-east-1"
```
```yaml {% srNumber=4 %}
      # awsSessionToken: "YOUR_SESSION_TOKEN"  # Optional
```
```yaml {% srNumber=5 %}
      # endPointURL: "https://firehose.us-east-1.amazonaws.com"  # Optional
```
```yaml {% srNumber=6 %}
      # profileName: "default"  # Optional
```
```yaml {% srNumber=7 %}
      # assumeRoleArn: "arn:aws:iam::123456789012:role/KinesisFirehoseReadOnlyRole"  # Optional
```
```yaml {% srNumber=8 %}
      # assumeRoleSessionName: "OpenMetadataSession"  # Optional
```
```yaml {% srNumber=9 %}
      # assumeRoleSourceIdentity: "openmetadata-ingestion-service"  # Optional
```
```yaml {% srNumber=10 %}
      # messagingServiceName: "local_kafka"  # Optional
```
```yaml {% srNumber=11 %}
      pipelineFilterPattern:
        includes:
          - ".*prod.*"  # Include only production delivery streams
        # excludes:
        #   - ".*test.*"  # Exclude test delivery streams
```

{% partial file="/v1.9/connectors/yaml/pipeline/source-config.md" /%}

{% partial file="/v1.9/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.9/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.9/connectors/yaml/ingestion-cli.md" /%}