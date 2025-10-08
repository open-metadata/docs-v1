---
title: Run the Google Drive Connector Externally
description: Use YAML to configure Google Drive metadata ingestion with profiling and schema extraction.
slug: /connectors/drive/googledrive/yaml
---

{% connectorDetailsHeader
name="Google Drive"
stage="BETA"
platform="Collate"
availableFeatures=["Metadata", "Owners", "Sample Data"]
/ %}

In this section, we provide guides and references to use the Google Drive connector.

Configure and schedule Google Drive metadata and profiler workflows from the OpenMetadata UI:

- [Requirements](#requirements)
- [Metadata Ingestion](#metadata-ingestion)

{% partial file="/v1.10/connectors/external-ingestion-deployment.md" /%}

## Requirements

### GCP Credentials

To connect to Google Drive, you'll need to set up a Google Cloud Platform (GCP) service account with the necessary permissions.

#### 1. Create a Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** > **Service Accounts**
3. Click **Create Service Account**
4. Provide a name and description for the service account
5. Grant the service account the necessary roles (at minimum: **Viewer** role)
6. Click **Done**

#### 2. Enable Google Drive API

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for "Google Drive API"
3. Click on it and enable the API

#### 3. Create and Download Service Account Key

1. Navigate back to **IAM & Admin** > **Service Accounts**
2. Click on your newly created service account
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Choose **JSON** as the key type
6. Download the JSON key file

#### 4. Domain-Wide Delegation (Optional)

If you need to access files owned by other users in your organization:

1. In the service account details, click **Show Domain-Wide Delegation**
2. Enable **Enable Google Workspace Domain-wide Delegation**
3. Note the **Client ID**
4. In Google Workspace Admin Console:
   - Navigate to **Security** > **API Controls** > **Domain-wide Delegation**
   - Add the Client ID with the following OAuth scopes:
     - `https://www.googleapis.com/auth/drive.readonly`
     - `https://www.googleapis.com/auth/spreadsheets.readonly`
5. Specify the delegated email address in the connection configuration

### Python Requirements

{% partial file="/v1.10/connectors/python-requirements.md" /%}

To run the Google Drive ingestion, you will need to install:

```bash
pip3 install "openmetadata-ingestion[googledrive]"
```

## Metadata Ingestion

All connectors are defined as JSON Schemas.
[Here](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/entity/services/connections/drive/googleDriveConnection.json)
you can find the structure to create a connection to Google Drive.

In order to create and run a Metadata Ingestion workflow, we will follow
the steps to create a YAML configuration able to connect to the source,
process the Entities if needed, and reach the OpenMetadata server.

The workflow is modeled around the following
[JSON Schema](https://github.com/open-metadata/OpenMetadata/blob/main/openmetadata-spec/src/main/resources/json/schema/metadataIngestion/workflow.json)

### 1. Define the YAML Config

This is a sample config for Google Drive:

{% codePreview %}

{% codeInfoContainer %}

#### Source Configuration - Service Connection

{% codeInfo srNumber=1 %}

**credentials**: GCP Credentials for Google Drive API. You can provide the credentials using:
- **GCP Credentials Path**: Path to the service account JSON file
- **GCP Credentials Values**: Direct JSON content of the service account credentials

{% /codeInfo %}

{% codeInfo srNumber=2 %}

**delegatedEmail**: (Optional) Email address to impersonate using domain-wide delegation. Required if you want to access files owned by other users in your organization.

{% /codeInfo %}

{% codeInfo srNumber=3 %}

**driveId**: (Optional) Specific shared drive ID to connect to. If provided, only this shared drive will be processed.

{% /codeInfo %}

{% codeInfo srNumber=4 %}

**includeTeamDrives**: Include shared/team drives in metadata extraction. Default is `true`.

{% /codeInfo %}

{% codeInfo srNumber=5 %}

**includeGoogleSheets**: Extract metadata only for Google Sheets files. When enabled, only Google Sheets will be processed. Default is `false`.

{% /codeInfo %}

{% codeInfo srNumber=6 %}

**directoryFilterPattern**: (Optional) Regex pattern to include or exclude directories from metadata extraction.

{% /codeInfo %}

{% codeInfo srNumber=7 %}

**fileFilterPattern**: (Optional) Regex pattern to include or exclude files from metadata extraction.

{% /codeInfo %}

{% codeInfo srNumber=8 %}

**spreadsheetFilterPattern**: (Optional) Regex pattern to include or exclude spreadsheets from metadata extraction (only applies when includeGoogleSheets is enabled).

{% /codeInfo %}

{% codeInfo srNumber=9 %}

**worksheetFilterPattern**: (Optional) Regex pattern to include or exclude worksheets within spreadsheets from metadata extraction (only applies when includeGoogleSheets is enabled).

{% /codeInfo %}

{% codeInfo srNumber=10 %}

**Connection Options (Optional)**: Enter the details for any additional connection options that can be sent during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}

{% codeInfo srNumber=11 %}

**Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent during the connection. These details must be added as Key-Value pairs.

{% /codeInfo %}

{% partial file="/v1.10/connectors/yaml/database/source-config-def.md" /%}

{% partial file="/v1.10/connectors/yaml/ingestion-sink-def.md" /%}

{% partial file="/v1.10/connectors/yaml/workflow-config-def.md" /%}

{% /codeInfoContainer %}

{% codeBlock fileName="filename.yaml" %}

```yaml {% isCodeBlock=true %}
source:
  type: GoogleDrive
  serviceName: local_google_drive
  serviceConnection:
    config:
      type: GoogleDrive
```
```yaml {% srNumber=1 %}
      credentials:
        gcpConfig:
          type: service_account  # REQUIRED
          projectId: project_id  # REQUIRED
          privateKeyId: private_key_id  # REQUIRED
          privateKey: |
            -----BEGIN PRIVATE KEY-----
            <your_private_key>
            -----END PRIVATE KEY-----
          clientEmail: service-account@project.iam.gserviceaccount.com  # REQUIRED
          clientId: client_id  # REQUIRED
```
```yaml {% srNumber=2 %}
      # delegatedEmail: user@example.com  # OPTIONAL - for domain-wide delegation
```
```yaml {% srNumber=3 %}
      # driveId: "0AK1A2B3C4D5E"  # OPTIONAL - specific shared drive ID
```
```yaml {% srNumber=4 %}
      includeTeamDrives: true  # Default: true
```
```yaml {% srNumber=5 %}
      includeGoogleSheets: false  # Default: false
```
```yaml {% srNumber=6 %}
      # directoryFilterPattern:
      #   includes:
      #     - "^/important-folder/.*"
      #   excludes:
      #     - "^/temp/.*"
```
```yaml {% srNumber=7 %}
      # fileFilterPattern:
      #   includes:
      #     - ".*\\.pdf$"
      #     - ".*\\.docx$"
      #   excludes:
      #     - "^draft-.*"
```
```yaml {% srNumber=8 %}
      # spreadsheetFilterPattern:
      #   includes:
      #     - "^Report.*"
      #   excludes:
      #     - ".*-backup$"
```
```yaml {% srNumber=9 %}
      # worksheetFilterPattern:
      #   includes:
      #     - "^Sheet.*"
      #   excludes:
      #     - "^_.*"
```
```yaml {% srNumber=10 %}
      # connectionOptions:
      #   key: value
```
```yaml {% srNumber=11 %}
      # connectionArguments:
      #   key: value
```

{% partial file="/v1.10/connectors/yaml/database/source-config.md" /%}

{% partial file="/v1.10/connectors/yaml/ingestion-sink.md" /%}

{% partial file="/v1.10/connectors/yaml/workflow-config.md" /%}

{% /codeBlock %}

{% /codePreview %}

{% partial file="/v1.10/connectors/yaml/ingestion-cli.md" /%}

{% partial file="/v1.10/connectors/yaml/data-profiler.md" variables={connector: "googledrive"} /%}
