---
title: Query Runner Admin Configuration | Collate Query Runner Guide
description: Configure Query Runner for each database service, choose authentication methods, and control user overrides.
slug: /how-to-guides/query-runner/admin-configuration
collate: true
---

# Admin Configuration

Administrators must configure Query Runner for each database service before users can access it. This section describes the configuration process and authentication options for each supported service.

## Accessing Admin Configuration

1. Navigate to **Settings** → **Services** → **Database Services**
2. Select the database service you want to configure (e.g., `my-bigquery`, `production-snowflake`)
3. Click on the **Query Runner** tab
4. Click **Configure** to set up Query Runner

## Configuration Settings

All services share these common settings:

| Setting | Description | Default |
| --- | --- | --- |
| **Authentication Type** | How users authenticate (CollateSSO, ExternalOAuth, Basic) | Varies by service |
| **Enabled** | Whether Query Runner is active for this service | `false` |
| **Max Result Size** | Maximum number of rows returned per query | `100` |
| **User Configurable Fields** | Fields users can override (role, database, schema, warehouse, dataset) | `[]` (empty) |

## BigQuery Configuration

BigQuery supports three authentication methods:

## 2.1.1 CollateSSO (Recommended for Google Workspace)

Use this when OpenMetadata Collate is configured with Google SSO.

**Configuration**:
- **Auth Type**: Select `CollateSSO`
- **OAuth Credentials**: Auto-populated from system SSO settings
- **Scope**: `https://www.googleapis.com/auth/bigquery` (auto-populated)
- **User Configurable Fields**: Optionally allow users to override:
- `dataset` - Let users specify a default dataset

**How It Works**:
- Users authenticate using their Google Workspace account (same as Collate login)
- OAuth tokens are automatically managed and refreshed
- No additional credentials needed

**Prerequisites**:
- Google SSO must be configured in OpenMetadata Collate
- SSO client must have BigQuery API scope enabled

## 2.1.2 ExternalOAuth (For External Google OAuth)

Use this when you want users to authenticate with Google OAuth but Collate uses a different SSO provider.

**Configuration**:
- **Auth Type**: Select `ExternalOAuth`
- **OAuth Client Credentials**: Admin must provide:
- **Client ID**: From Google Cloud Console OAuth 2.0 Client
- **Client Secret**: From Google Cloud Console OAuth 2.0 Client
- **Redirect URL**: `https://your-collate-domain.com/api/v1/queryRunner/oauth/callback`
- **Scope**: `https://www.googleapis.com/auth/bigquery`
- **User Configurable Fields**: Same as CollateSSO

**Getting OAuth Credentials**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**
2. Create **OAuth 2.0 Client ID** (Web application type)
3. Add authorized redirect URI: `https://your-collate-domain.com/api/v1/queryRunner/oauth/callback`
4. Copy Client ID and Client Secret
5. Store credentials securely in **1Password** under `BigQuery Query Runner OAuth` (example)

**1Password (Collate Internal)**: https://share.1password.com/s#m3iREgcUOxPqyNOG01bGCKxDNdLcV8niBA1iQ18S_gQ 

## 2.1.3 Basic Authentication (Service Account)

Use this for non-interactive authentication using GCP Service Accounts.

**Configuration**:
- **Auth Type**: Select `Basic`
- **User Credentials**: Each user provides their own service account credentials
- **User Configurable Fields**: Optionally allow users to override:
- `dataset` - Default dataset for queries

**User Setup**:
Users will need to provide:
- Service Account JSON file downloaded from GCP Console
- Fields extracted from JSON: `private_key_id`, `private_key`, `client_email`, `client_id`

**Getting Service Account Credentials**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **IAM & Admin** → **Service Accounts**
2. Create or select a service account
3. Grant BigQuery roles: `BigQuery Data Viewer` or `BigQuery User`
4. Create JSON key and download
5. Store credentials securely in **1Password** under `BigQuery Service Account - {username}` (example)

**Important Notes**:
- Service accounts need `bigquery.jobs.create` permission to execute queries
- Project ID is taken from the database service connection configuration
- Credentials are encrypted before storage

## Snowflake Configuration

Snowflake supports two authentication methods:

## 2.2.1 ExternalOAuth (Recommended)

Use this for OAuth-based authentication with Snowflake.

**Configuration**:
- **Auth Type**: Select `ExternalOAuth`
- **OAuth Client Credentials**: Admin must provide:
- **Client ID**: From Snowflake OAuth integration
- **Client Secret**: From Snowflake OAuth integration
- **Redirect URL**: `https://your-collate-domain.com/api/v1/queryRunner/oauth/callback`
- **Scope**: `session:role-any` (or specific role scope)
- **User Configurable Fields**: Optionally allow users to override:
- `warehouse` - Compute warehouse to use
- `database` - Default database
- `schema` - Default schema
- `role` - Snowflake role for access control

**Getting OAuth Credentials**:
1. In Snowflake, create a security integration:

```jsx
-- SAMPLE
CREATE OR REPLACE SECURITY INTEGRATION OAUTH_SNOWFLAKE_INT
  TYPE = OAUTH
  OAUTH_CLIENT = CUSTOM
  OAUTH_CLIENT_TYPE = 'CONFIDENTIAL'
  OAUTH_REDIRECT_URI = 'https://<your-collate-domain>/api/v1/queryRunner/oauth/callback' --'http://localhost:5050/callback'  -- <== change if needed
  OAUTH_ALLOW_NON_TLS_REDIRECT_URI = TRUE -- dev/local only
  OAUTH_ISSUE_REFRESH_TOKENS = TRUE
  OAUTH_REFRESH_TOKEN_VALIDITY = 86400 -- 24h
  OAUTH_USE_SECONDARY_ROLES = 'IMPLICIT'
  ENABLED = TRUE;
```

 
2. Retrieve Client ID and Client Secret:
`SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('OAUTH_SNOWFLAKE_INT');`

**1Password (Collate Internal)**: https://share.1password.com/s#oY6eQL8891iFve3IeDn_iDhsFoK3aI1Cz9RAZZk2I4c

## 2.2.2 Basic Authentication (Username/Password or Key Pair)

Use this for username/password or key-pair authentication.

**Configuration**:
- **Auth Type**: Select `Basic`
- **User Credentials**: Each user provides their own credentials:
- Username + Password, OR
- Username + Private Key + Passphrase
- **User Configurable Fields**: Same as ExternalOAuth

**User Setup**:
Users will need to provide:
- **Username**: Snowflake username
- **Password** OR **Private Key + Passphrase** for key-pair authentication

**Getting Key Pair Credentials** (if using key-pair auth):
1. Generate RSA key pair:
`bash    openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt    openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub`
2. Upload public key to Snowflake:
`sql    ALTER USER myusername SET RSA_PUBLIC_KEY='MIIBIjANBgkqhki...';`

**Important Notes**:
- Account URL, warehouse, database, schema, and role are inherited from service connection unless user overrides
- Credentials are encrypted before storage

## Trino Configuration

Trino supports OAuth authentication only:

## 2.3.1 ExternalOAuth (Starburst OAuth)

Use this for OAuth-based authentication with Trino/Starburst clusters.

**Configuration**:
- **Auth Type**: Select `ExternalOAuth`
- **Host Port**: Auto-populated from service connection (e.g., `ometa.galaxy.starburst.io:443`)
- **OAuth Client Credentials**: Admin must provide:
- **Client ID**: From Azure AD or OAuth provider
- **Client Secret**: From Azure AD or OAuth provider
- **Redirect URL**: `https://your-collate-domain.com/api/v1/queryRunner/oauth/callback`
- **Scope**: Typically `openid profile email` or custom scope

**Getting OAuth Credentials** (Azure AD example for Starburst):
1. In Azure Portal, go to **Azure Active Directory** → **App registrations**
2. Create or select an application
3. Add redirect URI: `https://your-collate-domain.com/api/v1/queryRunner/oauth/callback`
4. Create client secret in **Certificates & secrets**
5. Copy Application (client) ID and Client Secret

**1Password (Collate Internal)**: https://share.1password.com/s#vTbmCrSSZQMmn3K-Xp7tQn1xL7E_o8-SRh7GqKia9YA

**Important Notes**:
- Host and port are automatically pulled from the database service connection
- OAuth endpoints are constructed as: `https://{hostPort}/oauth/v2/authorize` and `https://{hostPort}/oauth/v2/token`

## Enabling Query Runner

After configuring authentication:

1. Check the **Enabled** checkbox
2. Set **Max Result Size** (1-100 rows, default: 100)
3. Select **User Configurable Fields** if you want users to override connection settings
4. Click **Save**

Users will now see the service in SQL Studio and can connect to it.

## 3. User Configuration

Once an administrator has configured Query Runner for a database service, users can establish their own connections and begin querying.

## Understanding Connection Status

Your connection to a service can be in one of four states:

| Status | Indicator | Meaning | Action Required |
| --- | --- | --- | --- |
| **Not Configured** | ⚪ Gray | Default state, no authentication attempted | Authenticate to connect |
| **Pending** | 🟡 Yellow | Authentication completed, test connection in progress | Wait for test connection to complete |
| **Connected** | 🟢 Green | Test connection successful, ready to execute queries | None - you can query |
| **Expired** | 🔴 Red | Tokens expired, connection needs re-authentication | Re-authenticate to reconnect |

You can view your connection status in the SQL Studio sidebar next to the service name.
