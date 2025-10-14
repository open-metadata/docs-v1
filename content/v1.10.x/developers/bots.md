---
title: How to Set Up Bots | OpenMetadata Developer Guide
description: Create and manage bots for task automation, data notifications, and metadata workflows.
slug: /developers/bots
---

# How to Set Up Bots

The default account for any ingestion pipeline deployed from the UI is `ingestion-bot`. To configure `ingestion-bot` from the UI, go to the settings page and access the `Bots` tile.

{% image
src="/images/v1.10/developers/settings-bot.png"
alt="settings-bot"
/%}

{% image
src="/images/v1.10/developers/bot-listing.png"
alt="bot-listing"
/%}

You can either create a new bot or update the existing `ingestion-bot`.

### Update `ingestion-bot`

Click on `ingestion-bot` and you will be redirected to it's details page, there you can

- Revoke the token if already present
- Copy the generated token

{% image
src="/images/v1.10/developers/bot-token-page.png"
alt="bot-listing"
/%}

- Generate new token

{% image
src="/images/v1.10/developers/generate-new-token.png"
alt="generate new token"
/%}

{% image
src="/images/v1.10/developers/bot-token-generate.png"
alt="token generate page"
/%}

### Create a new bot

Click the `Add bot` button, and you will be directed to the bot creation page. Fill in the required details and then click on the `Create` button.

{% image
src="/images/v1.10/developers/create-bot.png"
alt="create bot"
/%}


### Notes:

**1. `ingestion-bot`**

The `ingestion-bot` bot is created (or updated if it already exists) as a system bot that cannot be deleted, and
the credentials used for this bot, if they did not exist before, will be the ones present in the OpenMetadata configuration.
Otherwise, a JWT Token will be generated to be the default authentication mechanism of the `ingestion-bot`.

**2. JWT Token auth mechanism**

If you decide to configure a JWT Token for the authentication mechanism ensure that you have also the value `http://localhost:8585/api/v1/system/config/jwks`
in your `publicKeyUrls` list:

- For **bare metal** configuration:

```yaml
authenticationConfiguration:
  provider: "google"
  publicKeyUrls:
    - "https://www.googleapis.com/oauth2/v3/certs"
    - "http://localhost:8585/api/v1/system/config/jwks"
```

- For **docker** configuration, the value to be updated is `AUTHENTICATION_PUBLIC_KEYS`:

```bash
AUTHENTICATION_PUBLIC_KEYS=[https://www.googleapis.com/oauth2/v3/certs, http://localhost:8585/api/v1/system/config/jwks]
```

- In the case of **kubernetes**, you have to update `publicKeys` values:

```yaml
openmetadata:
  config:
    authentication:
      publicKeys:
        - "https://www.googleapis.com/oauth2/v3/certs"
        - "http://localhost:8585/api/v1/system/config/jwks" 
```

**3. Redeploying ingestion pipelines**

When the `ingestion-bot` is updated, we must redeploy our ingestion pipelines since the credentials used by the bot have been updated,
and they will no longer be valid.

## Default System Bots

OpenMetadata ships with several **predefined system bots** that are essential for automating core metadata operations.  
These bots have **scoped access** and are used by the platform to execute ingestion pipelines, metadata processing tasks, governance automation, and more.

These bots are created **by default during installation** and can be viewed under:

  - **Settings → Bots**

### List of Default Bots

| **Bot Name** | **Description** |
|---------------|-----------------|
| **AutoClassificationBot** | Detects and tags PII/sensitive data using sample data and classification rules. |
| **AutoPilotApplicationBot** | Orchestrates automated metadata actions like enrichment and policy execution. |
| **DataContractValidationApp** | Validates data contracts for schema consistency and contract adherence. |
| **DataInsightsApplicationBot** | Generates insights on data quality, usage, and ownership for dashboards. |
| **DataRetentionApplicationBot** | Enforces data retention policies by identifying and managing expired data. |
| **GovernanceBot** | Automates policy enforcement, approvals, and stewardship notifications. |
| **IngestionBot** | Runs metadata ingestion pipelines to sync external sources with OpenMetadata. |
| **LineageBot** | Captures data flow and dependencies to build and update lineage graphs. |
| **McpApplicationBot** | Processes metadata change proposals like updates to tags or ownership. |
| **ProfilerBot** | Ingests profiling stats and sample data to assess and monitor data quality. |
| **SCIM Bot** | Syncs user and group data via SCIM protocol for identity management. |
| **SearchIndexingApplicationBot** | Keeps the search index updated for accurate metadata discovery. |
| **TestSuiteBot** | Executes data quality tests and tracks results for validation and reporting. |
| **UsageBot** | Collects usage metrics to analyze data popularity and user interactions. |

### JWT Configuration Note

When using **JWT-based authentication**, each bot that executes ingestion or metadata operations may require its **own valid JWT token**.  
This includes bots such as:

- `LineageBot`
- `ProfilerBot`
- `TestSuiteBot`
- `IngestionBot`

**Make sure you:**
1. Generate a JWT token for each relevant bot.  
2. Match the correct `Key ID (kid)` and public/private key file paths.  
3. Redeploy ingestion pipelines so the bot picks up the new JWT configuration.

{% note %}

If JWT tokens or key IDs are mismatched, ingestion pipelines (especially lineage) may fail with internal server errors.

{% /note %}
