---
title: Releases
slug: /releases
---

# 1.0 Release 🎉

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.0!
{% /inlineCallout %}
{% /inlineCalloutContainer %}


## APIs & Schema
- **Stabilized** and improved the Schemas and APIs.
- The APIs are **backward compatible**.

## Ingestion
- Connecting to your data sources has never been easier. Find all the necessary **permissions** and **connection details** directly in the UI.
- When testing the connection, we now have a comprehensive list of **validations** to let you know which pieces of metadata can be extracted with the provided configuration.
- **Performance** improvements when extracting metadata from sources such as Snowflake, Redshift, Postgres, and dbt.
- New **Apache Impala** connector.

## Storage Services
- Based on your [feedback](https://github.com/open-metadata/OpenMetadata/discussions/8124), we created a new service to extract metadata from your **cloud storage**.
- The Data Lake connector ingested one table per file, which covered only some of the use cases in a Data Platform. With **Storage Services**, you can now present accurate metadata from your tables, even when **partitioned**.
- The first implementation has been done on **S3**, and we will keep adding support for other sources in the upcoming releases.

## Dashboard Data Models
- Dashboard Services now support the concept of **Data Models**: data that can be directly defined and managed in the Dashboard tooling itself, e.g., LookML models in Looker.
- Data Models will help us close the gap between engineering and business by providing all the necessary metadata from sources typically used and managed by analysts or business users.
- The first implementation has been done for **Tableau** and **Looker**.

## Queries
- Improved UI for **SQL Queries**, with faster loading times and allowing users to **vote** for popular queries!
- Users can now create and share a **Query** directly from the UI, linking it to multiple tables if needed.

## Localization
- In 1.0, we have added **Localization** support for OpenMetadata.
- Now you can use OpenMetadata in **English**, **French**, **Chinese**, **Japanese**, **Portuguese**, and **Spanish**.

## Glossary
- New and Improved **Glossary UI**
- Easily search for Glossaries and any Glossary Term directly in the **global search**.
- Instead of searching and tagging their assets individually, users can add Glossary Terms to multiple **assets** from the Glossary UI.

## Auto PII Classification
- Implemented an automated way to **tag PII data**.
- The auto-classification is an optional step of the **Profiler** workflow. We will analyze the column names, and if sample data is being ingested, we will run NLP models on top of it.

## Search
- **Improved Relevancy**, with added support for partial matches.
- **Improved Ranking**, with most used or higher Tier assets at the top of the search.
- Support for **Classifications** and **Glossaries** in the global search.

## Security
- **SAML** support has been added.
- Added option to mask passwords in the API response except for the `ingestion-bot` by setting the environment variable `MASK_PASSWORDS_API=true`. More info [here](/deployment/security/enable-password-masking).
- **Deprecation Notice**: **SSO** Service accounts for Bots will be deprecated. **JWT** authentication will be the preferred method for creating Bots.

## Lineage
- Enhanced Lineage UI to display a large number of **nodes (1000+)**.
- Improved UI for **better navigation**.
- Improved **SQL parser** to extract lineage in the Lineage Workflows.

## Chrome Browser Extension
- All the metadata is at your fingertips while browsing Looker, Superset, etc., with the OpenMetadata Chrome Browser Extension.
- **Chrome extension** supports Google SSO, Azure SSO, Okta, and AWS Cognito authentication.
- You can Install the Chrome extension from **Chrome Web Store**.

## Other Changes
- The **Explore page** cards will now display a maximum of **ten tags**.
- **Entity names** support apostrophes.
- The **Summary panel** has been improved to be consistent across the UI.
