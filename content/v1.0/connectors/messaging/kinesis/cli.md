---
title: Run Kinesis Connector using the CLI
slug: /connectors/messaging/kinesis/cli
---

# Run Kinesis using the metadata CLI

In this section, we provide guides and references to use the Kinesis connector.

Configure and schedule Kinesis metadata workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

## Requirements

{%inlineCallout icon="description" bold="OpenMetadata 0.12 or later" href="/deployment"%}
To deploy OpenMetadata, check the Deployment guides.
{%/inlineCallout%}

To run the Ingestion via the UI you'll need to use the OpenMetadata Ingestion Container, which comes shipped with
custom Airflow plugins to handle the workflow deployment.

OpenMetadata retrieves information about streams and sample data from the streams in the AWS account.
The user must have following policy set to access the metadata from Kinesis.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "KinesisPolicy",
            "Effect": "Allow",
            "Action": [
                "kinesis:ListStreams",
                "kinesis:DescribeStreamSummary",
                "kinesis:ListShards",
                "kinesis:GetShardIterator",
                "kinesis:GetRecords"
            ],
            "Resource": "*"
        }
    ]
}
```

For more information on Kinesis permissions visit the [AWS Kinesis official documentation](https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html).

### Python Requirements

To run the Kinesis ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[kinesis]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/messaging/kinesisConnection.json)
you can find the structure to create a connection to Kinesis.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Kinesis:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

- **awsAccessKeyId** & **awsSecretAccessKey**: When you interact with AWS, you specify your AWS security credentials to verify who you are and whether you have
  permission to access the resources that you are requesting. AWS uses the security credentials to authenticate and
  authorize your requests ([docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html)).

Access keys consist of two parts: An **access key ID** (for example, `AKIAIOSFODNN7EXAMPLE`), and a **secret access key** (for example, `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`).

You must use both the access key ID and secret access key together to authenticate your requests.

You can find further information on how to manage your access keys [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

{% /codeInfo %}

{% codeInfo srNumber=2 %}
**awsSessionToken**: If you are using temporary credentials to access your services, you will need to inform the AWS Access Key ID
and AWS Secrets Access Key. Also, these will include an AWS Session Token.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**awsRegion**: Each AWS Region is a separate geographic area in which AWS clusters data centers ([docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)).

As AWS can have instances in multiple regions, we need to know the region the service you want reach belongs to.

Note that the AWS Region is the only required parameter when configuring a connection. When connecting to the
services programmatically, there are different ways in which we can extract and use the rest of AWS configurations.

You can find further information about configuring your credentials [here](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials).

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**endPointURL**: To connect programmatically to an AWS service, you use an endpoint. An *endpoint* is the URL of the
entry point for an AWS web service. The AWS SDKs and the AWS Command Line Interface (AWS CLI) automatically use the
default endpoint for each service in an AWS Region. But you can specify an alternate endpoint for your API requests.

Find more information on [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html).

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**profileName**: A named profile is a collection of settings and credentials that you can apply to a AWS CLI command.
When you specify a profile to run a command, the settings and credentials are used to run that command.
Multiple named profiles can be stored in the config and credentials files.

You can inform this field if you'd like to use a profile other than `default`.

Find here more information about [Named profiles for the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html).

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**assumeRoleArn**: Typically, you use `AssumeRole` within your account or for cross-account access. In this field you'll set the
`ARN` (Amazon Resource Name) of the policy of the other account.

A user who wants to access a role in a different account must also have permissions that are delegated from the account
administrator. The administrator must attach a policy that allows the user to call `AssumeRole` for the `ARN` of the role in the other account.

This is a required field if you'd like to `AssumeRole`.

Find more information on [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html).
{% /codeInfo %}

{% codeInfo srNumber=7 %}

**assumeRoleSessionName**: An identifier for the assumed role session. Use the role session name to uniquely identify a session when the same role
is assumed by different principals or for different reasons.

By default, we'll use the name `OpenMetadataSession`.

Find more information about the [Role Session Name](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#:~:text=An%20identifier%20for%20the%20assumed%20role%20session.).

{% /codeInfo %}

{% codeInfo srNumber=8 %}

**assumeRoleSourceIdentity**: The source identity specified by the principal that is calling the `AssumeRole` operation. You can use source identity
information in AWS CloudTrail logs to determine who took actions with a role.

Find more information about [Source Identity](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#:~:text=Required%3A%20No-,SourceIdentity,-The%20source%20identity).

{% /codeInfo %}

#### Source Configuration - Source Config

{% codeInfo srNumber=9 %}

The sourceConfig is defined [here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/messagingServiceMetadataPipeline.json):

**generateSampleData:** Option to turn on/off generating sample data during metadata extraction.

**topicFilterPattern:** Note that the `topicFilterPattern` supports regex as include or exclude.

{% /codeInfo %}

#### Sink Configuration

{% codeInfo srNumber=10 %}

To send the metadata to OpenMetadata, it needs to be specified as `type: metadata-rest`.

{% /codeInfo %}

#### Workflow Configuration

{% codeInfo srNumber=11 %}

The main property here is the `openMetadataServerConfig`, where you can define the host and security provider of your OpenMetadata installation.

For a simple, local installation using our docker containers, this looks like:

{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}


```yaml
source:
  type: kinesis
  serviceName: local_kinesis
  serviceConnection:
    config:
      type: Kinesis
      awsConfig:
```
```yaml {% srNumber=1 %}
        awsAccessKeyId: KEY
        awsSecretAccessKey: SECRET
```
```yaml {% srNumber=2 %}
        # awsSessionToken: TOKEN
```
```yaml {% srNumber=3 %}
        awsRegion: us-east-2
```
```yaml {% srNumber=4 %}
        # endPointURL: https://athena.us-east-2.amazonaws.com/custom
```
```yaml {% srNumber=5 %}
        # profileName: profile
```
```yaml {% srNumber=6 %}
        # assumeRoleArn: "arn:partition:service:region:account:resource"
```
```yaml {% srNumber=7 %}
        # assumeRoleSessionName: session
```
```yaml {% srNumber=8 %}
        # assumeRoleSourceIdentity: identity
```
```yaml {% srNumber=9 %}
  sourceConfig:
    config:
      type: MessagingMetadata
      topicFilterPattern:
        excludes:
          - _confluent.*
        # includes:
        #   - topic1
      # generateSampleData: true

```
```yaml {% srNumber=10 %}
sink:
  type: metadata-rest
  config: {}
```

```yaml {% srNumber=11 %}
workflowConfig:
  openMetadataServerConfig:
    hostPort: "http://localhost:8585/api"
    authProvider: openmetadata
    securityConfig:
      jwtToken: "{bot_jwt_token}"
```

{% /codeBlock %}

{% /codePreview %}

### Workflow Configs for Security Provider

We support different security providers. You can find their definitions [here](https://github.com/open-metadata/OpenMetadata/tree/main/openmetadata-spec/src/main/resources/json/schema/security/client).

## Openmetadata JWT Auth

- JWT tokens will allow your clients to authenticate against the OpenMetadata server. To enable JWT Tokens, you will get more details [here](/deployment/security/enable-jwt-tokens).

```yaml
workflowConfig:
  openMetadataServerConfig:
    hostPort: "http://localhost:8585/api"
    authProvider: openmetadata
    securityConfig:
      jwtToken: "{bot_jwt_token}"
```

- You can refer to the JWT Troubleshooting section [link](/deployment/security/jwt-troubleshooting) for any issues in your JWT configuration. If you need information on configuring the ingestion with other security providers in your bots, you can follow this doc [link](/deployment/security/workflow-config-auth).

### 2. Run with the CLI

First, we will need to save the YAML file. Afterward, and with all requirements installed, we can run:

```bash
metadata ingest -c <path-to-yaml>
```

Note that from connector to connector, this recipe will always be the same. By updating the YAML configuration,
you will be able to extract metadata from different sources.
