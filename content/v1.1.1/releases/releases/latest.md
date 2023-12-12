---
title: Latest Release
slug: /releases/latest-release
---

# 1.1.1 Release 🎉

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.1.1!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

## UI Improvements

- User profile page UI / UX improvements
- Superset Connection fixes for Basic and IAM auth type
- Fix task flow bugs
- UI / UX improvements for Service, Database, and Schema pages.
- Support custom cron for schedule ingestion

## Data Quality
- Fix BigQuery, MSSQL, and Clickhouse profiling errors

## Ingestion
- Fixed Airflow lineage extraction.
- Added support for Databricks complex columns comments.
- Fixed Athena lineage and usage parameter validation.
- Airflow Managed APIs now support Airflow 2.6

## Connectors
- New [Qliksense](qlik.com) Connector.
- Hive supports extracting metadata directly from the metastore to speed up the execution. Users whose metastore is not exposed can still run the extraction pointing to Hive.
- Added Usage & Lineage connector for Trino.
- Impala scheme has been deprecated from Hive connector. Users can use the Impala connector instead.
- Snowflake can now ingest TRANSIENT tables.
- Added support for JSON fields in SingleStore.

## Backend
- Bumped table and column names length
- Aggregation Improvements for Search
- Test Suite Improvements
