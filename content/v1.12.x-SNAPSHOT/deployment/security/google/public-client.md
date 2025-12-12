---
title: Google SSO Configuration Guide | Public Client Setup
description: Learn how to configure Google SSO for public applications using OAuth 2.0. Ideal for SPAs and mobile apps without client secrets, with secure callback and JWT setup.
slug: /deployment/security/google/public-client
collate: false
---

# Google SSO Authentication Documentation - Public Client

- [Troubleshooting](#troubleshooting)

## Overview

OpenMetadata supports Single Sign-On (SSO) integration with various identity providers, enabling secure, centralized user authentication.

  - **Navigate to:** `Settings > SSO`

{% image 
src="/images/v1.12/deployment/security/google/sso1.png" 
alt="SSO Authentication" /%}

  - Select Google as the service Provider

{% image 
src="/images/v1.12/deployment/security/google/sso2.png" 
alt="Supported Providers" /%}

## Google SSO Configuration 

This configuration is recommended for **public applications**, such as **SPAs (Single Page Applications)** and **mobile apps**. It does **not require a client secret**.

{% image 
src="/images/v1.12/deployment/security/google/google1.png" 
alt="Google SSO Configuration - Public Client" /%}

### 1. Client Type

- **Definition:** Defines whether the application is `Public` (no client secret) or `Confidential` (requires client secret).
- **Options:** `Public` | `Confidential`
- **Example:** `Public`
- **Why it matters:** Determines the security level and OAuth flow type.
- **Note:**
  - Choose `Public` for SPAs and mobile apps.
  - Google typically uses `Confidential` for server-side apps.

### 2. Callback URL

- **Definition:** Redirect URL where Google sends authentication responses.
- **Example:** `https://yourapp.company.com/callback`
- **Why it matters:** Must match exactly with Google Cloud Console’s registered redirect URL.
- **Note:**
  - Must be registered under **OAuth 2.0 Client > Authorized Redirect URLs**.
  - Always use **HTTPS** in production.

### 3. Enable Self Signup

- **Definition:** Allows users to automatically create accounts on first login.
- **Options:** `Enabled` | `Disabled`
- **Example:** `Enabled`
- **Why it matters:** Controls whether new users are auto-created.
- **Note:** Set to `Disabled` for stricter access control.

### 4. Authority

- **Definition:** Google’s OAuth 2.0 authorization server.
- **Default & Example:** `https://accounts.google.com`
- **Why it matters:** Specifies where OpenMetadata should send auth requests.
- **Note:** Usually does not need to be changed.

### 5. Public Key URLs

- **Definition:** URL(s) where Google publishes its JWT signing keys.
- **Example:** `["https://www.googleapis.com/oauth2/v3/certs"]`
- **Why it matters:** Required to verify JWT token signatures.
- **Note:** Typically auto-discovered via OIDC discovery endpoint.

### 6. Token Validation Algorithm

- **Definition:** Algorithm used to validate JWT tokens.
- **Options:** `RS256` | `RS384` | `RS512`
- **Default & Example:** `RS256`
- **Why it matters:** Must match Google’s signing algorithm.
- **Note:** Google typically uses `RS256`.

### 7. JWT Principal Claims

- **Definition:** JWT fields used to identify the user.
- **Example:** `["email", "sub"]`
- **Why it matters:** Identifies the user in OpenMetadata.
- **Note:** Use `email` for consistency and compatibility. For domain scoping, use the `hd` claim.

### 8. JWT Principal Claims Mapping

- **Definition:** Maps JWT claims to OpenMetadata user attributes.
- **Example:**
  ```json

  ["email:email", "name:name", "firstName:given_name", "lastName:family_name"]
  
  ```
- **Why it matters:** Maps identity information to OpenMetadata user profiles.
- **Note:** Use the format `openmetadata_field:jwt_claim`.

### 9. Admin Principals

- **Definition:** List of email addresses with admin access.
- **Example:** `["admin@company.com", "superuser@company.com"]`
- **Why it matters:** Grants admin-level privileges in the system.
- **Note:** Email must match a JWT claim.

### 10. Principal Domain

- **Definition:** Default domain for constructing user emails.
- **Example:** `company.com`
- **Why it matters:** Helps form complete user identifiers from partial input.
- **Note:** Matches your Google Workspace domain.

### 11. Enforce Principal Domain

- **Definition:** Restrict login to users from a specific domain.
- **Default:** false
- **Example:** `true`
- **Why it matters:** Adds domain-level access control.
- **Note:** Use with hd parameter in custom OIDC config.

### 12. Enable Secure Socket Connection

- **Definition:** Enables SSL/TLS for secure communications.
- **Default:** false
- **Example:** `true`
- **Why it matters:** Ensures secure token exchange and communication.
- **Note:** Must be true in production.

{% partial file="/v1.12/deployment/sso-troubleshooting.md" /%}
