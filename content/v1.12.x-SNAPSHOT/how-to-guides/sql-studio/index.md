---
title: SQL Studio | Collate SQL Studio Guide
description: Execute SQL queries directly against your configured database services with SQL Studio - a powerful, unified query interface in Collate.
slug: /how-to-guides/sql-studio
collate: true
---

# SQL Studio

SQL Studio is Collate's integrated query execution environment that enables you to run SQL queries directly against your configured database services. With SQL Studio, you can explore data, validate queries, and perform ad-hoc analysis without leaving the Collate platform.

## What is SQL Studio?

SQL Studio provides a unified interface for executing SQL queries across multiple database services from within Collate. It eliminates the need to switch between different database clients and provides a consistent experience regardless of which database you're querying.

### Key Features

- **Multi-Service Support**: Execute queries across multiple database services from a unified interface
- **SELECT Query Execution**: Run SELECT queries and view results in the studio for different services in a single place
- **Secure Authentication**: Multiple authentication methods with encrypted credential storage
- **Query Management**: Save, organize, and reuse frequently-used queries

## How SQL Studio Works

SQL Studio follows a three-step workflow:

```
1. App Installation → 2. Admin Configuration → 3. User Connection → 4. Query Execution
```

1. **Install the Application**: Admins install the SQL Studio ([Query Runner](/applications/query-runner)) application from the App Marketplace
2. **Configure Services**: Admins configure SQL Studio for each database service and set authentication methods
3. **Authenticate**: Users connect to services using the configured authentication method
4. **Execute Queries**: Users write and run SQL queries, save queries, and explore data

## Supported Database Services

SQL Studio currently supports:

- **BigQuery** 
- **Snowflake**
- **Trino** (Starburst)

Each service supports different authentication methods and has service-specific configuration options. See [Admin Configuration](/how-to-guides/sql-studio/admin-configuration) for detailed setup instructions.

## Authentication Methods

SQL Studio supports three authentication methods, each designed for different use cases:

### Collate SSO

**Best for**: Organizations using Google OIDC for Collate login

Collate SSO leverages your existing Google SSO configuration in Collate to authenticate with database services. Instead of configuring separate OAuth credentials, SQL Studio automatically uses already configured fields from Collate login.

**How it works**:

**Admin Setup**:
- Admin selects authentication type as "Collate SSO" in the database service configuration
- Fields in the UI (Client ID, Client Secret, Scope) are optional and not mandatory to fill
- Once the admin saves the form, these fields are automatically prefetched from Collate's SSO settings
- Admin can then view the auto-enriched values

**User Connection**:
- Users click "Connect" in SQL Studio for the configured database service
- A popup opens for users to allow/grant permissions defined in the scope (e.g., BigQuery access)
- OAuth tokens are securely fetched, stored, and automatically used for query execution
- No additional credential entry required from users or admin

{% note noteType="Note" %}

**SSO Support**: As of now, Collate SSO flow is only supported for **Google OIDC (OpenID Connect)**.

{% /note %}

**Supported services**:
- **BigQuery** (with Google Workspace SSO)

**Admin setup**: Minimal or no configuration required - OAuth credentials (Client ID, Client Secret, Scope) are automatically pulled from Collate's SSO settings.

### External OAuth

**Best for**: Organizations that want OAuth authentication but use a different SSO provider or email & password for Collate login

External OAuth allows users to authenticate directly with the database service provider (Google (for BigQuery), Snowflake, Starburst (for Trino)) using OAuth 2.0, separate from their Collate login.

**How it works**:

**Admin Setup**:
- Admin fills in the OAuth configuration fields:
  - Client ID (required)
  - Client Secret (required)
  - Redirect URL (optional)
  - Scope (optional)
- Admin saves the configuration

**User Connection**:
- Users click "Connect" in SQL Studio for the configured database service
- Users are redirected to the database provider's authentication page (Google for BigQuery, Snowflake for Snowflake, Azure AD for Trino)
- Users authenticate with their database provider credentials
- Access token exchange happens automatically
- OAuth tokens are securely stored and used for query execution

**Supported services**:
- **BigQuery** (Google OAuth)
- **Snowflake** (Snowflake Security Integration - Custom Oauth)
- **Trino** (Starburst OAuth Client)

**Admin setup**: Admins must configure OAuth client credentials (Client ID, Client Secret) for each service.

### Basic Authentication

**Best for**: Service accounts, automated access, or when OAuth is not available

Basic Authentication allows users to provide direct credentials such as username/password or service account keys.

**How it works**:

**Admin Setup**:
- Admin selects authentication type as "Basic" in the database service configuration
- Admin saves the configuration

**User Connection**:
- Users enter their own credentials in SQL Studio:
  - BigQuery: Service Account JSON credentials
  - Snowflake: Username/Password or Private Key + Passphrase
  - Trino: Username/Password
- Credentials are encrypted and stored securely
- Credentials remain valid until manually changed by the user

**Supported services**:
- **BigQuery** (GCP Service Account JSON)
- **Snowflake** (Username/Password or Key Pair)
- **Trino** (Username/Password)

**Admin setup**: Admins enable Basic Auth mode - users provide their own credentials.

## Authentication Comparison

| Method | User Experience | Admin Setup | Use Case |
|--------|----------------|-------------|----------|
| **Collate SSO** | Seamless - no additional login | Minimal - auto-configured | Google Workspace organizations |
| **External OAuth** | One-time OAuth popup | Moderate - requires OAuth app setup | OAuth-enabled services with separate IdP |
| **Basic Auth** | Manual credential entry | Minimal - just enable mode | Service accounts, key-based access |

## Getting Started

Ready to start using SQL Studio? Follow these guides:

1. **[Query Runner Application](/applications/query-runner)** - Install the Query Runner application to enable SQL Studio (admins only)
2. **[Admin Configuration](/how-to-guides/sql-studio/admin-configuration)** - Configure SQL Studio for your database services (admins only)
3. **[User Authentication](/how-to-guides/sql-studio/user-authentication)** - Connect to database services as a user
4. **[Query Execution](/how-to-guides/sql-studio/query-execution)** - Learn how to write and execute queries in SQL Studio


## Next Steps

- **Admins**: Start with [Query Runner Application](/applications/query-runner) to install and enable SQL Studio
- **Users**: Jump to [User Authentication](/how-to-guides/sql-studio/user-authentication) to connect to your first service
- **Learn More**: Explore [Query Execution](/how-to-guides/sql-studio/query-execution) to master SQL Studio features
