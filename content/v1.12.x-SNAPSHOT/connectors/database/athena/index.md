---
title: Athena | OpenMetadata Database Connector Configuration
description: Connect Amazon Athena to OpenMetadata effortlessly. Complete setup guide, configuration steps, and best practices for database metadata ingestion.
slug: /connectors/database/athena
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
    - [Service Name](#service-name)
    - [Connection Details](#connection-details)
    - [Metadata Ingestion Options](#metadata-ingestion-options)
- [Data Lineage](/how-to-guides/data-lineage/workflow)
- [Troubleshooting](/connectors/database/athena/troubleshooting)
  - [Workflow Deployment Error](#workflow-deployment-error)
- [Related](#related)
{% collateContent %}
- [Reverse Metadata](#reverse-metadata)
{% /collateContent %}


{% partial file="/v1.12/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/database/athena/yaml"} /%}

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
  - <<WORKGROUP_NAME>>: Athena workgroup name (use `primary` if using default)
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

## Metadata Ingestion

{% partial 
  file="/v1.12/connectors/metadata-ingestion-ui.md" 
  variables={
    connector: "Athena", 
    selectServicePath: "/images/v1.12/connectors/athena/select-service.png",
    addNewServicePath: "/images/v1.12/connectors/athena/add-new-service.png",
    serviceConnectionPath: "/images/v1.12/connectors/athena/service-connection.png",
} 
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **AWS Access Key ID** & **AWS Secret Access Key**: When you interact with AWS, you specify your AWS security credentials to verify who you are and whether you have
  permission to access the resources that you are requesting. AWS uses the security credentials to authenticate and
  authorize your requests ([docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html)).

Access keys consist of two parts: An **access key ID** (for example, `AKIAIOSFODNN7EXAMPLE`), and a **secret access key** (for example, `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`).

You must use both the access key ID and secret access key together to authenticate your requests.

You can find further information on how to manage your access keys [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

- **AWS Region**: Each AWS Region is a separate geographic area in which AWS clusters data centers ([docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)).

As AWS can have instances in multiple regions, we need to know the region the service you want reach belongs to.

Note that the AWS Region is the only required parameter when configuring a connection. When connecting to the
services programmatically, there are different ways in which we can extract and use the rest of AWS configurations.

You can find further information about configuring your credentials [here](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials).

- **AWS Session Token (optional)**: If you are using temporary credentials to access your services, you will need to inform the AWS Access Key ID
  and AWS Secrets Access Key. Also, these will include an AWS Session Token.

You can find more information on [Using temporary credentials with AWS resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).

- **Endpoint URL (optional)**: To connect programmatically to an AWS service, you use an endpoint. An *endpoint* is the URL of the
  entry point for an AWS web service. The AWS SDKs and the AWS Command Line Interface (AWS CLI) automatically use the
  default endpoint for each service in an AWS Region. But you can specify an alternate endpoint for your API requests.

Find more information on [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html).

- **Profile Name**: A named profile is a collection of settings and credentials that you can apply to a AWS CLI command.
  When you specify a profile to run a command, the settings and credentials are used to run that command.
  Multiple named profiles can be stored in the config and credentials files.

You can inform this field if you'd like to use a profile other than `default`.

Find here more information about [Named profiles for the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html).

- **Assume Role Arn**: Typically, you use `AssumeRole` within your account or for cross-account access. In this field you'll set the
  `ARN` (Amazon Resource Name) of the policy of the other account.

A user who wants to access a role in a different account must also have permissions that are delegated from the account
administrator. The administrator must attach a policy that allows the user to call `AssumeRole` for the `ARN` of the role in the other account.

This is a required field if you'd like to `AssumeRole`.

Find more information on [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html).

{%note%}
When using Assume Role authentication, ensure you provide the following details:  
- **AWS Region**: Specify the AWS region for your deployment.  
- **Assume Role ARN**: Provide the ARN of the role in your AWS account that OpenMetadata will assume.  
{%/note%}

- **Assume Role Session Name**: An identifier for the assumed role session. Use the role session name to uniquely identify a session when the same role
  is assumed by different principals or for different reasons.

By default, we'll use the name `OpenMetadataSession`.

Find more information about the [Role Session Name](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#:~:text=An%20identifier%20for%20the%20assumed%20role%20session.).

- **Assume Role Source Identity**: The source identity specified by the principal that is calling the `AssumeRole` operation. You can use source identity
  information in AWS CloudTrail logs to determine who took actions with a role.

Find more information about [Source Identity](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#:~:text=Required%3A%20No-,SourceIdentity,-The%20source%20identity).

- **S3 Staging Directory**: S3 location where Athena stores query results (e.g., `s3://my-bucket/athena-results/`). The bucket must exist and be accessible with the S3 permissions from the requirements. To setup this for the first time check [Specify a query result location](https://docs.aws.amazon.com/athena/latest/ug/query-results-specify-location.html)
- **Athena Workgroup**: Select here the workgroup that the ingestion workflow should use. Ensure the workgroup name matches the `<<WORKGROUP_NAME>>` in your IAM policy. You can find more information about [How workgroups work](https://docs.aws.amazon.com/athena/latest/ug/workgroups-manage-queries-control-costs.html).

{% note %}
**Using a custom Data Catalog name:**

If you're using a non-default Data Catalog (not `awsdatacatalog`), you need to specify it as a **Connection Argument**:

1. In the **Advanced Configuration** section below, add a Connection Argument:
  - Key: `catalog_name`
  - Value: Your custom catalog name (e.g., `MyCatalog`)

{% /note %}

{% partial file="/v1.12/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.12/connectors/test-connection.md" /%}

{% partial file="/v1.12/connectors/database/configure-ingestion.md" /%}

{% partial file="/v1.12/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% collateContent %}
{% partial file="/v1.12/connectors/database/athena/reverse-metadata.md" /%}
{% /collateContent %}


{% partial file="/v1.12/connectors/database/related.md" /%}
