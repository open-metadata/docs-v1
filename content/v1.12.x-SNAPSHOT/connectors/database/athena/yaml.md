---
title: Run the Athena Connector Externally
description: Configure OpenMetadata'sAthena database connector with YAML - step-by-step setup guide, connection parameters, and configuration examples for seamless integration.
slug: /connectors/database/athena/yaml
---

{% connectorDetailsHeader
name="Athena"
stage="PROD"
platform="OpenMetadata"
availableFeatures=["Metadata", "Query Usage", "Lineage", "Column-level Lineage", "Data Profiler", "Auto-Classification", "Data Quality", "Tags", "dbt", "Sample Data", "Reverse Metadata (Collate Only)"]
unavailableFeatures=["Owners", "Stored Procedures"]
/ %}

In this section, we provide guides and references to use the Athena connector.

Configure and schedule Athena metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)
- [Query Usage](#query-usage)
- [Lineage](#lineage)
- [Data Profiler](#data-profiler)
- [Data Quality](#data-quality)
- [dbt Integration](#dbt-integration)
{% collateContent %}
- [Reverse Metadata](/applications/reverse-metadata)
{% /collateContent %}

{% partial file="/v1.12/connectors/external-ingestion-deployment.md" /%}

## Requirements

The Athena connector ingests metadata through JDBC connections.

{% note %}

According to AWS's official [documentation](https://docs.aws.amazon.com/athena/latest/ug/policy-actions.html):

*If you are using the JDBC or ODBC driver, ensure that the IAM
permissions policy includes all of the actions listed in [AWS managed policy: AWSQuicksightAthenaAccess](https://docs.aws.amazon.com/athena/latest/ug/managed-policies.html#awsquicksightathenaaccess-managed-policy).*

{% /note %}

The Athena connector requires an IAM role or user with permissions to:

- `Athena` – Execute queries and retrieve metadata.
- `Glue` – Access the Glue Data Catalog (databases, tables, partitions).
- `S3` - Read source data and write query results.

Below is the minimum IAM policy for OpenMetadata to ingest Athena metadata:

```json
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "athena:StartQueryExecution",
          "athena:GetQueryExecution",
          "athena:GetQueryResults",
          "athena:BatchGetQueryExecution"
        ],
        "Resource": "arn:aws:athena:<<AWS_REGION>>:<<ACCOUNT_ID>>:workgroup/<<WORKGROUP_NAME>>"
      },
      {
        "Effect": "Allow",
        "Action": [
          "athena:ListDatabases",
          "athena:ListTableMetadata",
          "athena:GetTableMetadata"
        ],
        "Resource": "arn:aws:athena:<<AWS_REGION>>:<<ACCOUNT_ID>>:datacatalog/<<CATALOG_NAME>>"
      },
      {
        "Effect": "Allow",
        "Action": [
          "athena:ListWorkGroups",
          "athena:ListQueryExecutions"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "glue:GetDatabases",
          "glue:GetTable",
          "glue:GetTables",
          "glue:GetPartitions"
        ],
        "Resource": [
          "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:catalog",
          "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:database/<<DATABASE_NAME>>",
          "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:table/<<DATABASE_NAME>>/*"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "s3:GetObject",
          "s3:PutObject"
        ],
        "Resource": "arn:aws:s3:::<<S3_BUCKET_NAME>>/*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "s3:ListBucket",
          "s3:GetBucketLocation"
        ],
        "Resource": "arn:aws:s3:::<<S3_BUCKET_NAME>>"
      }
    ]
}
```

#### Replace these placeholders
  - <<AWS_REGION>>: Your AWS region (e.g., us-east-1)
  - <<ACCOUNT_ID>>: Your AWS account ID
  - <<WORKGROUP_NAME>>: Athena workgroup name (use primary if using default)
  - <<CATALOG_NAME>>: Data catalog name (use `awsdatacatalog` for default Glue catalog)
  - <<DATABASE_NAME>>: Glue database names you want to ingest.
    -  Use `*` for all databases
    - For specific databases, add multiple Resource entries:
      ```
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:database/sales",
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:database/marketing",
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:table/sales/*",
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:table/marketing/*"
      ```
  - <<S3_BUCKET_NAME>>: S3 bucket for Athena query results

{% note %}
**Data Catalog Case Sensitivity**: While AWS Console displays the default catalog as `AwsDataCatalog`, use lowercase `awsdatacatalog` in the IAM policy to match the connector's default. Data Catalog names are case-insensitive in Athena, but IAM Policy resources are not.
{% /note %}

### Lake Formation Tags (Optional)

**Skip this section if you don't use AWS Lake Formation for data governance.**

If your tables/columns have Lake Formation tags (LF-Tags), add this permission to ingest them as classifications in OpenMetadata:

```json
  {
    "Effect": "Allow",
    "Action": "lakeformation:GetResourceLFTags",
    "Resource": [
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:database/<<DATABASE_NAME>>",
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:table/<<DATABASE_NAME>>/*",
      "arn:aws:glue:<<AWS_REGION>>:<<ACCOUNT_ID>>:column/<<DATABASE_NAME>>/*/<<COLUMN_NAME>>"
    ]
  }
```

Then enable `Include Tags` in the OpenMetadata ingestion configuration.

#### How to check if you use LF-Tags:
1. Go to AWS Lake Formation console
2. Navigate to Permissions -> LF-Tags and Permissions
3. If you see tags defined, you're using LF-Tags

### Federated Query / UDFs (Optional)

**Skip this section if you only query Glue Catalog tables.**

If you use [federated queries](https://docs.aws.amazon.com/athena/latest/ug/federated-queries.html) (Query external sources like DynamoDB) or User-Defined Functions (UDFs), add:

```json
  {
    "Effect": "Allow",
    "Action": "lambda:InvokeFunction",
    "Resource": "arn:aws:lambda:<<AWS_REGION>>:<<ACCOUNT_ID>>:function:<<LAMBDA_FUNCTION_NAME>>"
  }
```

### KMS Encryption (Optional)

**Skip this section if your S3 data uses Amazon S3-managed encryption (SSE-S3) or is unencrypted.**

If your S3 data or Athena query results are encrypted with AWS KMS keys (SSE-KMS), add:

```json
  {
    "Effect": "Allow",
    "Action": [
      "kms:Decrypt",
      "kms:DescribeKey",
      "kms:GenerateDataKey"
    ],
    "Resource": "arn:aws:kms:<<AWS_REGION>>:<<ACCOUNT_ID>>:key/<<KMS_KEY_ID>>"
  }
```

#### How to check if you use KMS encryption:
1. Go to your S3 Bucket -> Properties -> Default Encryption
  - If it shows `AWS KMS Key`, you need KMS permissions
  - If it shows `Amazon S3-managed keys (SSE-S3)`, you don't need KMS permissions


You can find further information on the Athena connector in the [docs](/connectors/database/athena).

### Python Requirements

{% partial file="/v1.12/connectors/python-requirements.md" /%}

To run the Athena ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[athena]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/database/athenaConnection.json)
you can find the structure to create a connection to Athena.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Athena:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% partial file="/v1.12/connectors/yaml/common/aws-config-def.md" /%}

{% codeInfo srNumber=9 %}

**s3StagingDir**: The S3 staging directory is an optional parameter. Enter a staging directory to override the default staging directory for AWS Athena.

{% /codeInfo %}

{% codeInfo srNumber=10 %}

**workgroup**: The Athena workgroup is an optional parameter. If you wish to have your Athena connection related to an existing AWS workgroup add your workgroup name here.

{% /codeInfo %}

{% partial file="/v1.12/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.12/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.12/connectors/yaml/workflow-config-def.md" /%}

#### Advanced Configuration

{% codeInfo srNumber=11 %}

**Connection Options (Optional)**: Enter the details for any additional connection options that can be sent to database during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}

{% codeInfo srNumber=12 %}

**Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent to database during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: athena
  serviceName: local_athena
  serviceConnection:
    config:
      type: Athena
      awsConfig:
```

{% partial file="/v1.12/connectors/yaml/common/aws-config.md" /%}

```yaml {% srNumber=9 %}
      s3StagingDir: s3 directory for datasource
```
```yaml {% srNumber=10 %}
      workgroup: workgroup name
```
```yaml {% srNumber=11 %}
      # connectionOptions:
        # key: value
```
```yaml {% srNumber=12 %}
      # connectionArguments:
        # key: value
        # catalog_name: MyCatalog  -- If you are using a custom catalog with a different name
```

{% partial file="/v1.12/connectors/yaml/database/source-config.md" /%}

{% partial file="/v1.12/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.12/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.12/connectors/yaml/ingestion-cli.md" /%}

{% partial file="/v1.12/connectors/yaml/query-usage.md" variables={connector: "athena"} /%}

{% partial file="/v1.12/connectors/yaml/lineage.md" variables={connector: "athena"} /%}

{% partial file="/v1.12/connectors/yaml/data-profiler.md" variables={connector: "athena"} /%}

{% partial file="/v1.12/connectors/yaml/auto-classification.md" variables={connector: "athena"} /%}

{% partial file="/v1.12/connectors/yaml/data-quality.md" /%}

## dbt Integration

{% tilesContainer %}

{% tile
  icon="mediation"
  title="dbt Integration"
  description="Learn more about how to ingest dbt models' definitions and their lineage."
  link="/connectors/ingestion/workflows/dbt" /%}

{% /tilesContainer %}
