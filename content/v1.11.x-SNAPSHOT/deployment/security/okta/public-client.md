---
title: Configuring Okta Public Authentication | OpenMetadata SSO Setup Guide
description: Learn how to configure Okta SSO (Public) authentication in OpenMetadata using OAuth 2.0 and OpenID Connect (OIDC).
slug: /deployment/security/okta/public
---

# Okta SSO Configuration (Public)

Okta Single Sign-On (SSO) enables users to log in to OpenMetadata with their **Okta credentials** using **OAuth 2.0** and **OpenID Connect (OIDC)**.  
This guide explains how to configure the **Public Client** setup for Okta authentication in OpenMetadata.

{% image 
src="/images/v1.11/deployment/security/okta/okta1.png" 
alt="Okta SSO Configuration - Public Client" /%}

## Provider Name

A human-readable name for this Okta SSO configuration instance.  
**Example:** `Okta SSO`, `Company Okta`, `Corporate Identity`  
**Why it matters:** Helps identify this SSO configuration in logs and the OpenMetadata user interface.  
**Note:** This is a display name and does not impact authentication functionality.

## Authentication Configuration (Public)

### Client Type

Defines whether the application is **public** (no client secret) or **confidential** (requires client secret).  
**Options:** Public | Confidential  
**Example:** Public  
**Why it matters:** Determines the authentication flow and security level.  
**Note:**  
- Choose **Public** for frontend or browser-based applications.  
- Choose **Confidential** for backend services or web apps.  
- Okta typically uses **Confidential** type, but **Public** is suitable for deployments without a client secret.

### Callback URL

Redirect URI where Okta sends authentication responses after successful login.  
**Example:** `https://yourapp.company.com/callback`  
**Why it matters:** This must exactly match the **Sign-in redirect URI** configured in your Okta application.  
**Note:**  
- Configure under **Okta → Applications → Your App → General → Sign-in Redirect URIs**.  
- Always use **HTTPS** for production environments.

### Enable Self Signup

Allows users to automatically create OpenMetadata accounts on their first login through Okta.  
**Options:** Enabled | Disabled  
**Example:** Enabled  
**Why it matters:** Controls whether new users can self-register or require admin approval.  
**Note:** Disable for stricter user access management policies.

### Authority

Specifies the Okta domain responsible for issuing authentication tokens.  
**Example:** `https://dev-123456.okta.com` or `https://company.okta.com`  
**Why it matters:** Informs OpenMetadata which Okta tenant to authenticate users against.  
**Note:** Use the complete Okta domain URL (including the `https://` prefix).

### Public Key URLs

A list of URLs where Okta publishes its **public keys** used to verify JWT token signatures.  
**Example:** `["https://dev-123456.okta.com/oauth2/v1/keys"]`  
**Why it matters:** OpenMetadata uses these keys to validate incoming tokens.  
**Note:** These URLs are typically auto-discovered from the OIDC discovery URI and rarely require manual configuration.

### Token Validation Algorithm

Defines the algorithm used to verify the JWT token signatures from Okta.  
**Options:** RS256 | RS384 | RS512  
**Default:** RS256  
**Example:** RS256  
**Why it matters:** Ensures the tokens are validated using the correct signing algorithm.  
**Note:** Okta typically uses **RS256**.

### JWT Principal Claims

Specifies which JWT claims identify the authenticated user.  
**Example:** `["preferred_username", "email", "sub"]`  
**Why it matters:** Determines how OpenMetadata identifies unique users during authentication.  
**Note:** Common Okta claims include `email`, `preferred_username`, `sub`, and `login`.

### JWT Principal Claims Mapping

Maps JWT claims from Okta to OpenMetadata user attributes.  
**Example:** `["email:email", "name:name", "firstName:given_name"]`  
**Why it matters:** Controls how user data from Okta is represented in OpenMetadata profiles.  
**Note:** Use the format `"openmetadata_field:jwt_claim"` (e.g., `email:email`).

### Admin Principals

Specifies a list of user principals who have **administrative privileges** in OpenMetadata.  
**Example:** `["admin@company.com", "superuser@company.com"]`  
**Why it matters:** Grants full platform access to designated users.  
**Note:** Ensure these match the `email` or `preferred_username` values from Okta tokens.

### Principal Domain

Defines the **default domain** used when constructing user principal names.  
**Example:** `company.com`  
**Why it matters:** Helps form complete usernames if only local parts (before @) are provided.  
**Note:** Typically corresponds to your organization’s primary domain.

### Enforce Principal Domain

Indicates whether all users must belong to the defined **Principal Domain**.  
**Default:** false  
**Example:** true  
**Why it matters:** Adds a layer of security by ensuring only users from approved domains can log in.  
**Note:** Useful for multi-tenant Okta setups where access should be limited to a specific organization.

### Enable Secure Socket Connection

Determines whether to use **SSL/TLS** for secure communication between OpenMetadata and Okta.  
**Default:** false  
**Example:** true  
**Why it matters:** Ensures encrypted data exchange during authentication.  
**Note:** This setting should always be **enabled in production** environments.

## Summary

| **Field** | **Example / Default** |
|------------|------------------------|
| Client Type | Public |
| Callback URL | https://yourapp.company.com/callback |
| Authority | https://dev-123456.okta.com |
| Public Key URLs | https://dev-123456.okta.com/oauth2/v1/keys |
| Token Validation Algorithm | RS256 |
| JWT Principal Claims | ["preferred_username", "email", "sub"] |
| JWT Mapping | ["email:email", "name:name", "firstName:given_name"] |
| Admin Principals | ["admin@company.com"] |
| Principal Domain | company.com |
| Enforce Principal Domain | false |
| SSL/TLS | true |

{% note %}

If users are automatically logged out and unable to log in again due to a bad authentication configuration, you can reset the security setup using the following command:

```

./bootstrap/openmetadata-ops.sh remove-security-config --force

```

After executing the command, **restart the server**. The authentication values from your YAML or Helm chart will then be reapplied on startup.

{% /note %}
