---
title: Google Drive Connector | OpenMetadata Drive Integration
description: Connect Google Drive to OpenMetadata with our comprehensive drive connector guide. Step-by-step setup, configuration examples, and metadata extraction tips.
slug: /connectors/drive/googledrive
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
- [Data Profiler](/how-to-guides/data-quality-observability/profiler/workflow)
- [Troubleshooting](/connectors/drive/googledrive/troubleshooting)

{% partial file="/v1.11/connectors/ingestion-modes-tiles.md" variables={yamlPath: "/connectors/drive/googledrive/yaml"} /%}

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

### Permissions Required

The service account needs:
- Read access to the Google Drive files and folders you want to ingest
- If using shared drives: Access to the specific shared drive
- If using domain-wide delegation: Domain-wide delegation enabled with appropriate scopes

## Metadata Ingestion

{% partial
  file="/v1.11/connectors/metadata-ingestion-ui.md"
  variables={
    connector: "Google Drive",
    selectServicePath: "/images/v1.11/connectors/googledrive/select-service.png",
    addNewServicePath: "/images/v1.11/connectors/googledrive/add-new-service.png",
    serviceConnectionPath: "/images/v1.11/connectors/googledrive/service-connection.png",
}
/%}

{% stepsContainer %}
{% extraContent parentTagName="stepsContainer" %}

#### Connection Details

- **GCP Credentials**: Provide the GCP credentials to access Google Drive API. You can provide the credentials in one of the following ways:
  - **GCP Credentials Path**: Path to the GCP service account credentials JSON file
  - **GCP Credentials Values**: Paste the content of the GCP service account credentials JSON file directly

- **Delegated Email (Optional)**: Email address to impersonate using domain-wide delegation. This is required if you want to access files owned by other users in your organization using domain-wide delegation.

- **Drive ID (Optional)**: Specific shared drive ID to connect to. If provided, only this shared drive will be processed. Leave empty to process all accessible drives.

- **Include Team Drives**: Enable to include shared/team drives in metadata extraction. Default is `true`.

- **Include Google Sheets**: Enable to extract metadata only for Google Sheets files. When enabled, only Google Sheets will be processed. Default is `false`.

- **Directory Filter Pattern (Optional)**: Regex pattern to include or exclude directories from metadata extraction.

- **File Filter Pattern (Optional)**: Regex pattern to include or exclude files from metadata extraction.

- **Spreadsheet Filter Pattern (Optional)**: Regex pattern to include or exclude spreadsheets from metadata extraction (only applies when Include Google Sheets is enabled).

- **Worksheet Filter Pattern (Optional)**: Regex pattern to include or exclude worksheets within spreadsheets from metadata extraction (only applies when Include Google Sheets is enabled).

{% partial file="/v1.11/connectors/database/advanced-configuration.md" /%}

{% /extraContent %}

{% partial file="/v1.11/connectors/test-connection.md" /%}

{% partial file="/v1.11/connectors/database/configure-ingestion.md" /%}

{% partial file="/v1.11/connectors/ingestion-schedule-and-deploy.md" /%}

{% /stepsContainer %}

{% partial file="/v1.11/connectors/database/related.md" /%}
