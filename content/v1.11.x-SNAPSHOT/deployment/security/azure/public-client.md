---
title: Azure SSO Setup Guide for Public Apps
description: Step-by-step guide to configure Azure SSO for public clients using OAuth 2.0—ideal for SPAs and mobile apps without client secrets.
slug: /deployment/security/azure/public-client
collate: false
---

# Azure AD SSO Authentication – Public Client Configuration

## Overview

**Azure Active Directory (Azure AD) Single Sign-On (SSO)** enables users to authenticate using their **Microsoft 365 / Entra ID** accounts via **OAuth 2.0** and **OpenID Connect (OIDC)** protocols.

This guide covers the **Public Client** setup, intended for applications that cannot securely store client secrets.

## Public Configuration Fields

{% image 
src="/images/v1.10/deployment/security/azure/azure1.png" 
alt="Azure AD SSO Configuration - Public Client" /%}

### 1. Client Type
- **Definition:** Defines whether the application is public (no client secret) or confidential (requires client secret).
- **Options:** `Public` | `Confidential`
- **Example:** `Public`
- **Why it matters:** Determines the OAuth flow and security level.
- **Note:**
  - Use `Public` for clients that cannot store secrets.
  - Azure typically recommends `Confidential` for secure apps.

### 2. Client ID
- **Definition:** The Application (Client) ID assigned to your app in Azure AD.
- **Example:** `12345678-1234-1234-1234-123456789012`
- **Why it matters:** Azure AD uses this to identify your application.
- **Note:** Found in Azure Portal → **Azure Active Directory** → **App registrations** → Your App → **Overview** → *Application (client) ID*

### 3. Callback URL
- **Definition:** The redirect URI where Azure AD sends authentication responses.
- **Example:** `https://yourapp.company.com/callback`
- **Why it matters:** Must exactly match what's registered in Azure AD; mismatches will cause authentication failures.
- **Note:**
  - Configure in Azure AD → **App registrations** → **Authentication** → *Redirect URIs*
  - Always use **HTTPS** in production environments.

### 4. Authority
- **Definition:** Azure AD endpoint that issues tokens for your tenant.
- **Example:** `https://login.microsoftonline.com/your-tenant-id`
- **Why it matters:** Tells OpenMetadata which Azure tenant to use for authentication.
- **Note:**
  - Replace `your-tenant-id` with your actual tenant GUID.
  - For multi-tenant apps, use `common` instead of the tenant ID.

### 5. Public Key URLs
- **Definition:** URL(s) where Azure AD publishes public keys used for verifying JWT tokens.
- **Example:** `["https://login.microsoftonline.com/common/discovery/v2.0/keys"]`
- **Why it matters:** Required to validate token signatures.
- **Note:** Typically auto-discovered from Azure’s OIDC metadata; manual configuration rarely needed.

### 6. Token Validation Algorithm
- **Definition:** The algorithm used to validate JWT token signatures.
- **Options:** `RS256`, `RS384`, `RS512`
- **Default:** `RS256`
- **Example:** `RS256`
- **Why it matters:** Must match Azure AD’s signing algorithm.
- **Note:** Azure AD typically uses `RS256`.

### 7. JWT Principal Claims
- **Definition:** Claims in the JWT token used to identify users.
- **Example:** `["preferred_username", "email", "sub"]`
- **Why it matters:** These claims are used to recognize and map users in OpenMetadata.
- **Note:** Common claims include: `email`, `preferred_username`, `upn`, `sub`

### 8. Admin Principals
- **Definition:** A list of users (by email or UPN) granted admin access.
- **Example:** `["admin@company.com", "superuser@company.com"]`
- **Why it matters:** Grants administrative permissions within OpenMetadata.
- **Note:** Entries must match the value from the selected JWT principal claim.

### 9. Bot Principals
- **Definition:** A list of service accounts or bot users for automated operations.
- **Example:** `["metadata-bot@company.com"]`
- **Why it matters:** Designates non-human principals for running background jobs or automation tasks.

### 10. Principal Domain
- **Definition:** Default domain used for user principal resolution.
- **Example:** `company.com`
- **Why it matters:** Used to complete email addresses or usernames if only the prefix is provided.
- **Note:** Typically matches your organization’s primary domain.

### 11. Enforce Principal Domain
- **Definition:** Whether to restrict login to users from a specific domain.
- **Default:** `false`
- **Example:** `true`
- **Why it matters:** Adds security by limiting access to a known domain space.

### 12. Enable Secure Socket Connection
- **Definition:** Enables TLS/SSL for all SSO communication.
- **Default:** `false`
- **Example:** `true`
- **Why it matters:** Encrypts all communication with Azure AD for added security.
- **Note:** Should be enabled for production environments.

## Summary

| Key Field              | Example / Default                                             |
|------------------------|---------------------------------------------------------------|
| Client Type            | `Public`                                                      |
| Client ID              | `12345678-1234-1234-1234-123456789012`                        |
| Callback URL           | `https://yourapp.company.com/callback`                        |
| Authority              | `https://login.microsoftonline.com/your-tenant-id`            |
| Public Key URLs        | `https://login.microsoftonline.com/common/discovery/v2.0/keys`|
| Token Validation       | `RS256`                                                       |
| JWT Claims             | `["preferred_username", "email", "sub"]`                      |
| Admin Principals       | `["admin@company.com"]`                                       |
| Enforce Domain         | `true`                                                        |
| Use TLS (SSL)          | `true`                                                        |


{% note %}

If users are automatically logged out and unable to log in again due to a bad authentication configuration, you can reset the security setup using the following command:

```

./bootstrap/openmetadata-ops.sh remove-security-config --force

```

After executing the command, **restart the server**. The authentication values from your YAML or Helm chart will then be reapplied on startup.

{% /note %}
