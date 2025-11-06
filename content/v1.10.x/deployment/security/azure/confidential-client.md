---
title: Azure SSO Configuration for Confidential Apps
description: Learn to configure Azure SSO for confidential clients with OIDC, secure token handling, and client secret setup for web and backend apps.
slug: /deployment/security/azure/confidential-client
collate: false
---

# Azure AD SSO Authentication – Confidential Client Configuration

- [Troubleshooting](#troubleshooting)

## Overview

**Azure Active Directory (Azure AD) Single Sign-On (SSO)** allows users to log in securely using their **Microsoft 365 / Entra ID** accounts via **OAuth 2.0** and **OpenID Connect (OIDC)**.

This guide covers the **Confidential Client** configuration, intended for **web applications and backend services** that can securely store secrets.

## Confidential Configuration Fields

{% image 
src="/images/v1.10/deployment/security/azure/azure2.png" 
alt="Azure AD SSO Configuration - Confidential Client" /%}

### 1. Client Type
- **Definition:** Defines whether the application is public (no client secret) or confidential (requires client secret).
- **Options:** `Public` | `Confidential`
- **Example:** `Confidential`
- **Why it matters:** Determines security level and OAuth flow.
- **Note:**
  - Use `Confidential` for secure applications and backend services.
  - Azure typically uses `Confidential` type.

### 2. Authority
- **Definition:** Azure AD endpoint that issues tokens for your tenant.
- **Example:** `https://login.microsoftonline.com/your-tenant-id`
- **Why it matters:** Tells OpenMetadata which Azure AD tenant to authenticate against.
- **Note:**
  - Replace `your-tenant-id` with your Azure AD tenant ID.
  - Use `common` for multi-tenant applications.

### 3. Public Key URLs
- **Definition:** List of URLs where Azure AD publishes public keys for token verification.
- **Example:** `["https://login.microsoftonline.com/common/discovery/v2.0/keys"]`
- **Why it matters:** Verifies JWT token signatures.
- **Note:** Usually auto-discovered via the discovery URI.

### 4. Token Validation Algorithm
- **Definition:** Algorithm used to validate JWT token signatures.
- **Options:** `RS256`, `RS384`, `RS512`
- **Default & Example:** `RS256`
- **Why it matters:** Must match Azure AD’s signing algorithm.
- **Note:** Azure AD typically uses `RS256`.

### 5. Client Type (OIDC IDP Type)
- **Definition:** Defines whether the application is public (no client secret) or confidential (requires client secret).
- **Options:** `Public` | `Confidential`
- **Example:** `Confidential`
- **Why it matters:** Determines security level and OAuth flow.
- **Note:**
  - Use `Confidential` for secure applications and backend services.
  - Azure typically uses `Confidential` type.

### 6. OIDC Client ID
- **Definition:** Application (client) ID for OIDC authentication with Azure AD.
- **Example:** `12345678-1234-1234-1234-123456789012`
- **Why it matters:** Identifies the application to Azure AD.
- **Note:** Same as the Application (client) ID in Azure AD app registration.

### 7. OIDC Client Secret
- **Definition:** Secret key for confidential client authentication.
- **Example:** `abc123def456ghi789jkl012mno345pqr678st`
- **Why it matters:** Required to securely authenticate with Azure AD.
- **Note:**
  - Create under **Certificates & secrets** in Azure AD.
  - Store securely and rotate periodically.

### 8. OIDC Request Scopes
- **Definition:** Permissions requested from Azure AD.
- **Default:** `openid email profile`
- **Example:** `openid email profile User.Read`
- **Why it matters:** Defines what user information OpenMetadata can access.
- **Note:** `openid email profile` is usually sufficient.

### 9. OIDC Discovery URI
- **Definition:** Azure AD’s OpenID Connect metadata endpoint.
- **Example:**  
  `https://login.microsoftonline.com/your-tenant-id/v2.0/.well-known/openid-configuration`
- **Why it matters:** Auto-discovers OIDC endpoints.
- **Note:** Replace `your-tenant-id` with your Azure AD tenant ID.

### 10. OIDC Use Nonce
- **Definition:** Prevents replay attacks.
- **Default & Example:** `true`
- **Why it matters:** Enhances OIDC request security.

### 11. OIDC Preferred JWS Algorithm
- **Default & Example:** `RS256`
- **Why it matters:** Must match Azure AD’s token signing algorithm.
- **Note:** Rarely needs to be changed.

### 12. OIDC Response Type
- **Definition:** OAuth response type expected.
- **Options:** `id_token` | `code`
- **Default & Example:** `id_token`
- **Why it matters:** Determines the OAuth flow (`code` is more secure).

### 13. OIDC Disable PKCE
- **Definition:** Disables Proof Key for Code Exchange.
- **Default & Example:** `false`
- **Why it matters:** PKCE provides additional security.
- **Note:** Should typically remain enabled (`false`).

### 14. OIDC Max Clock Skew
- **Definition:** Allowed time difference (in seconds) between systems.
- **Example:** `0`
- **Why it matters:** Prevents token rejection due to system clock differences.

### 15. OIDC Client Authentication Method
- **Definition:** How client authenticates with Azure AD.
- **Options:** `client_secret_basic`, `client_secret_post`, `client_secret_jwt`, `private_key_jwt`
- **Default & Example:** `client_secret_basic`
- **Why it matters:** Must align with Azure AD app registration.

### 16. OIDC Token Validity
- **Definition:** Duration in seconds that tokens remain valid.
- **Default:** `0` (use Azure AD default)
- **Example:** `3600`
- **Why it matters:** Balances token lifetime vs. security.

### 17. OIDC Tenant
- **Definition:** Azure AD tenant identifier.
- **Example:** `your-tenant-id` or `company.onmicrosoft.com`
- **Why it matters:** Defines which tenant to authenticate against.
- **Note:** Use `common` for multi-tenant apps.

### 18. OIDC Server URL

- **Definition:** Your OM server URL.
- **Example:** `https://yourapp.company.com`.
- **Why it matters:** specifies the URL at which OM is hosted.

### 19. Callback URL
- **Definition:** Redirect URI where Azure AD sends auth responses.
- **Example:** `https://yourapp.company.com/callback`
- **Why it matters:** Must match Azure AD registered redirect URI.
- **Note:**
  - Add to Azure AD → App registrations → Authentication.
  - Always use HTTPS.

### 20. OIDC Max Age
- **Definition:** Max authentication age before re-login is required.
- **Example:** `3600`
- **Why it matters:** Controls how often users must re-authenticate.

### 21. OIDC Prompt
- **Definition:** Controls login experience.
- **Options:** `none`, `login`, `consent`, `select_account`
- **Example:** `select_account`
- **Why it matters:** Defines how login prompts behave.
- **Note:**
  - `login`: Always prompt
  - `consent`: Prompt for permissions
  - `select_account`: Show account picker

### 22. OIDC Session Expiry
- **Definition:** How long user sessions remain valid (in seconds).
- **Default & Example:** `604800` (7 days)
- **Why it matters:** Controls session timeout for confidential clients.

### 23. JWT Principal Claims
- **Definition:** JWT fields used to identify users.
- **Example:** `["preferred_username", "email", "sub"]`
- **Why it matters:** Determines how users are mapped in OpenMetadata.
- **Note:** Common claims: `email`, `preferred_username`, `upn`, `sub`

### 24. JWT Principal Claims Mapping
- **Definition:** Maps JWT claims to OpenMetadata user fields.
- **Example:**
  ```json
  ["email:email", "name:displayName", "firstName:given_name"]
- **Why it matters:** Controls user profile mapping in OpenMetadata.
- **Note:** Format: `"openmetadata_field:jwt_claim"`

### 25. Admin Principals

- **Definition:** Users granted admin access in OpenMetadata.  
- **Example:** `["admin@company.com", "superuser@company.com"]`  
- **Why it matters:** Grants full admin privileges.  
- **Note:** Match these to your JWT claims.

### 26. Bot Principals

- **Definition:** Service/bot accounts used for background operations.  
- **Example:** `["metadata-bot@company.com"]`

### 27. Principal Domain

- **Definition:** Default domain for user principals.  
- **Example:** `company.com`  
- **Why it matters:** Helps construct full user identifiers.

### 28. Enforce Principal Domain

- **Definition:** Enforces user domain restriction.  
- **Default:** `false`  
- **Example:** `true`  
- **Why it matters:** Restricts logins to specified domains only.

### 29. Enable Secure Socket Connection

- **Definition:** Enables SSL/TLS for all SSO communication.  
- **Default:** `false`  
- **Example:** `true`  
- **Why it matters:** Ensures secure authentication flow.  
- **Note:** Recommended in production.

### Summary

| Field                      | Example / Default                                                  |
|---------------------------|---------------------------------------------------------------------|
| Client Type               | Confidential                                                       |
| OIDC Client ID            | 12345678-1234-1234-1234-123456789012                                |
| OIDC Client Secret        | abc123def456...                                                    |
| Callback URL              | https://yourapp.company.com/callback                               |
| Authority                 | https://login.microsoftonline.com/your-tenant-id                   |
| Discovery URI             | https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration |
| JWT Claims                | ["preferred_username", "email", "sub"]                             |
| JWT Mapping               | ["email:email", "name:displayName", "firstName:given_name"]        |
| Token Validation Algorithm| RS256                                                              |
| Request Scopes            | openid email profile User.Read                                     |
| Session Expiry            | 604800                                                             |


{% partial file="/v1.10/deployment/sso-troubleshooting.md" /%}
