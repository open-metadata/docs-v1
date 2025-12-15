---
title: Metadata Exporter – Configuration & User Guide
description: Exports DQ test results and profile data to Snowflake, BigQuery, or Databricks with flexible configs, scheduling, and export range options.
slug: /applications/metadata-exporter
collate: true
---

# 📘 Metadata Exporter Documentation

## Overview

The **Metadata Exporter** is a configurable application that enables organizations to export **Data Quality (DQ)** test results — such as pass/fail flags, rule IDs, asset metadata, timestamps — and **profile data** into downstream analytical or data storage systems like **Snowflake**, **BigQuery (BQ)**, and **Databricks**.

This functionality enables:
- Feeding downstream dashboards (e.g., Power BI, Tableau)
- Triggering alerting and remediation workflows
- Historical tracking and versioning of data quality scores (DQI)


## Key Features

### Destination Support:

- **Snowflake**
- **Databricks**
- **BigQuery**

### Export Cadence Options:

- **Manual**
- **Scheduled**

### Selective Export:

- Ability to decide what event to export (data quality or profile data)

## Navigation

To configure the Metadata Exporter:

- **Go to:** `Settings > Applications > Metadata Exporter`

{% image
src="/images/v1.12/applications/exporter/exporter1.png"
alt="Metadata Exporter Navigation"
caption="Metadata Exporter Navigation"
/%}

You’ll find the following tabs:

- `Schedule`
- `Configuration`
- `Recent Runs`

{% image
src="/images/v1.12/applications/exporter/exporter2.png"
alt="Metadata Exporter Tabs"
caption="Metadata Exporter Tabs"
/%}

## Configuration Options

### 1. Ingestion Runner

Defines the agent responsible for executing the ingestion pipeline.  
**Example:** `Collate SaaS Agent`

### 2. Connection Configuration

Establishes connectivity to your export destination (e.g., Snowflake, BigQuery, Databricks).

{% image
src="/images/v1.12/applications/exporter/exporter3.png"
alt="Configuration"
caption="Configuration"
/%}

#### Snowflake Configuration

| Field | Description |
|-------|-------------|
| **Service Type** | Snowflake |
| **Username** | Snowflake user login |
| **Password** | User password (optional if using private key) |
| **Account** | Snowflake account identifier (e.g., `AAAAA-99999`) |
| **Role** | Snowflake role to assume (e.g., `ACCOUNTADMIN`) |
| **Database** | Target database (e.g., `OBS_ANALYTICS`) |
| **Warehouse** | Target virtual warehouse (e.g., `COMPUTE_WH`) |
| **Query Tag** | Optional tagging for traceability |
| **Private Key & Passphrase** | For key-pair auth (optional, secure) |

**Advanced Option**:

- **Client Session Keep Alive** – Useful for long-running exports

#### BigQuery (BQ) Configuration

| Field | Description |
|-------|-------------|
| **Service Type** | Must be `BigQuery` |
| **Project ID** | GCP project where the BigQuery dataset resides |
| **Dataset ID** | Target dataset where the metadata will be exported |
| **Table Name** | Destination table name (BQ table to export metadata to) |
| **Service Account JSON** | Contents of the service account key in JSON format with write access |
| **Location** | BigQuery region (e.g., `us-central1`) |

{% note %}

**Security Note**: Ensure the service account has the **BigQuery Data Editor** and **BigQuery Job User** roles.

{% /note %}

#### Databricks (DBX) Configuration

| Field | Description |
|-------|-------------|
| **Service Type** | Must be `Databricks` |
| **Host URL** | Databricks workspace URL (e.g., `https://<region>.azuredatabricks.net`) |
| **Token** | Personal Access Token (PAT) for API authentication |
| **Cluster ID** | Target cluster where jobs will run |
| **Database Name** | Target database within the Databricks environment |
| **Schema Name** | Schema (if applicable) |
| **Table Name** | Destination table to store metadata |
| **Path (Optional)** | DBFS path or external location (if exporting to files instead of a table) |

**Requirements**:

- The token must have workspace-wide read/write access.
- The cluster must have access to the target database or mount location.

### 3. Export Range

Defines the **temporal scope** of the data to be exported.

| Field | Description |
|-------|-------------|
| **Range Type** (`exportRange.rangeType`) | Options: `ALL`, `LATEST`, or `DATE_RANGE` |
| **Interval** (`exportRange.interval`) | Used with `DATE_RANGE` (e.g., `7`) |
| **Unit** (`exportRange.unit`) | Time unit for the interval (e.g., `days`, `hours`) |
| **Event Types** | Select which types of DQ events to export (`All`, or specific types) |
| **Backfill** | Enable to process historical data on first run |

{% image
src="/images/v1.12/applications/exporter/exporter4.png"
alt="Export Range"
caption="Export Range"
/%}

### 4. Table Configuration

Specifies the target table where exported metadata will be written.

| Field | Description |
|-------|-------------|
| **Database Name** (`tableConfiguration.databaseName`) | e.g., `OBS_ANALYTICS` |
| **Schema Name** (`tableConfiguration.schemaName`) | e.g., `OBS_DATA` |
| **Table Name** (`tableConfiguration.tableName`) | e.g., `COLLATE_METADATA` |

{% image
src="/images/v1.12/applications/exporter/exporter5.png"
alt="Table Configuration"
caption="Table Configuration"
/%}

## Scheduling

Configure how often the metadata export runs:

- **Manual**: Click `Run Now` on the Schedule tab
- **Scheduled**: Setup periodic exports (feature roadmap)

{% image
src="/images/v1.12/applications/exporter/exporter6.png"
alt="Scheduling"
caption="Scheduling"
/%}

## Monitoring Runs

Under the **Recent Runs** tab:

- View status: **Success** or **Failed**
- Check:
  - **Run time**
  - **Duration**
  - **Logs** for troubleshooting
  - **Config** used during run

A successful export shows the **Status: Success**, with details on execution duration and timestamps.

{% image
src="/images/v1.12/applications/exporter/exporter7.png"
alt="Monitoring Runs"
caption="Monitoring Runs"
/%}

## MetadataExporterApplication Parameters (Developer Reference)

| Key | Description |
|-----|-------------|
| `exportRange.rangeType` | Defines range (`ALL`, `LATEST`, `DATE_RANGE`) |
| `exportRange.interval` | Interval number for `DATE_RANGE` |
| `exportRange.unit` | Time unit (`days`, `hours`) |
| `eventTypes` | Event types to export |
| `Backfill` | Boolean, historical data processing |
| `tableConfiguration.databaseName` | Target DB |
| `tableConfiguration.schemaName` | Target schema |
| `tableConfiguration.tableName` | Target table |
