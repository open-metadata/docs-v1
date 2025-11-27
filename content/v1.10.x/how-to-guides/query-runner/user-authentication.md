---
title: User Authentication | Collate Query Runner Guide
description: Walk through OAuth and basic authentication flows users follow to connect Query Runner to database services.
slug: /how-to-guides/query-runner/user-authentication
collate: true
---

### User Authentication Flow

### Step 1: Access SQL Studio

1. Log in to OpenMetadata Collate
2. Navigate to **SQL Studio** from the main navigation menu
3. If this is your first time, you’ll see a landing page with available services

### Step 2: Select a Service

1. From the SQL Studio sidebar, click the **Service Selection** dropdown
2. Choose the database service you want to connect to
3. If you haven’t configured a connection yet, you’ll see a **Not Connected** status

### Step 3: Authenticate

The authentication process depends on the **authentication type** configured by your administrator:

### OAuth Authentication (CollateSSO or ExternalOAuth)

If your service is configured for OAuth:

1. Click **Connect with OAuth** button
2. A popup window opens with the OAuth provider's login page
3. **Sign in** with your credentials:
    - **BigQuery CollateSSO**: Use your Google Workspace account (same as Collate login)
    - **BigQuery ExternalOAuth**: Use your Google account
    - **Snowflake OAuth**: Use your Snowflake credentials
    - **Trino OAuth**: Use Azure AD or configured OAuth provider
4. **Grant permissions** when prompted (e.g., "Allow access to BigQuery")
5. The popup closes automatically, and you're redirected back to SQL Studio
6. Connection status changes to **Pending** 🟡 while test connection is triggered
7. Once test connection succeeds, status changes to **Connected** 🟢

**OAuth Token Expiration**:
- OAuth tokens typically expire after a few hours or days
- When expired, your status changes to **Expired** 🔴
- Click **Refresh Token** to renew without re-authenticating
- If refresh fails, click **Reconnect** to go through OAuth flow again

### Basic Authentication

If your service is configured for Basic Auth:

### BigQuery Basic Auth

1. Click **Configure Connection** or **Connect**
2. A modal opens requesting your GCP Service Account credentials
3. You can either:
    - **Upload JSON**: Click **Upload Service Account JSON** and select your downloaded `.json` file
    - **Manual Entry**: Enter fields individually:
        - **Private Key ID**: From `private_key_id` field in JSON
        - **Private Key**: From `private_key` field in JSON (full PEM-formatted key)
        - **Client Email**: From `client_email` field in JSON
        - **Client ID**: From `client_id` field in JSON
4. (Optional) If admin allowed, override **Dataset**
5. Click **Test Connection** to verify credentials
6. Connection status changes to **Pending** 🟡 while test is in progress
7. If test succeeds, click **Save** to complete setup
8. Connection status changes to **Connected** 🟢

**Where to Get Credentials**:
- Download service account JSON from [Google Cloud Console](https://console.cloud.google.com/) → **IAM & Admin** → **Service Accounts**
- Store credentials in your password manager (e.g., 1Password)
- Retrieve credentials: `op://vault/BigQuery-ServiceAccount-{yourname}/credentials.json`

### Snowflake Basic Auth

1. Click **Configure Connection** or **Connect**
2. A modal opens requesting your Snowflake credentials
3. Enter your **Username** (required)
4. Choose authentication method:
    - **Password-based**: Enter **Password**
    - **Key-pair based**: Enter **Private Key** and **Passphrase**
5. (Optional) If admin allowed, override connection settings:
    - **Warehouse**: Compute warehouse to use (e.g., `COMPUTE_WH`)
    - **Database**: Default database (e.g., `ANALYTICS`)
    - **Schema**: Default schema (e.g., `PUBLIC`)
    - **Role**: Role for access control (e.g., `ANALYST`)
6. Click **Test Connection** to verify credentials
7. Connection status changes to **Pending** 🟡 while test is in progress
8. If test succeeds, click **Save** to complete setup
9. Connection status changes to **Connected** 🟢

**Where to Get Credentials**:
- Username and password: Provided by your Snowflake administrator
- Key pair: Generate using `openssl` and upload public key to Snowflake
- Store credentials in your password manager (e.g., 1Password)

### Test Connection Flow

After entering credentials or completing OAuth authentication, the **Test Connection** process is automatically triggered:

1. Connection status changes to **Pending** 🟡
2. Backend validates your credentials by:
    - Attempting to connect to the database service
    - Executing a simple test query (e.g., `SELECT 1`)
3. **If successful**:
    - Connection status changes to **Connected** 🟢
    - Last connection timestamp is recorded
    - You can now execute queries
4. **If failed**:
    - Connection status is Pending 🟡
    - Review your credentials and try again

**Troubleshooting Test Connection Failures**:
- **Invalid credentials**: Double-check username, password, keys, etc.
- **Insufficient permissions**: Verify you have query permissions in the database (e.g., BigQuery `bigquery.jobs.create`, Snowflake `USAGE` on warehouse)
- **Network issues**: Ensure the backend can reach the database service (firewall rules, VPN)
- **Incorrect configuration**: Verify service connection is properly configured in OpenMetadata

## 4. Using SQL Studio

Once connected, you can write and execute SQL queries in SQL Studio. For detailed instructions on using SQL Studio, see the [SQL Studio User Guide](https://www.notion.so/SQL-Studio-User-Guide-8a3d1f6a412248faa0782e630ef494dc?pvs=21).

## 5. Summary

Query Runner provides a seamless experience for querying database services directly from OpenMetadata Collate:

1. **Admin** configures Query Runner with authentication method (CollateSSO, OAuth, Basic)
2. **User** authenticates and establishes connection (OAuth flow or credential entry)
3. **User** writes and executes SQL queries in SQL Studio
4. **Results** are displayed with execution time and row counts
5. **User** saves queries for reuse and explores database metadata

### Quick Reference

| Task | Steps |
| --- | --- |
| **Connect to service** | SQL Studio → Select service → Connect (OAuth or Basic) |
| **Execute query** | Write query → Click Run (or Cmd/Ctrl+Enter) |
| **Save query** | Click Save Query → Enter name → Save |
| **Load saved query** | Saved Queries sidebar → Click query name |
| **Explore databases** | Database Explorer sidebar → Expand hierarchy |
| **Refresh OAuth token** | Click Refresh Token button when status is Expired |
| **Disconnect** | Settings icon → Delete Connection |

Enjoy exploring your data with Query Runner!
