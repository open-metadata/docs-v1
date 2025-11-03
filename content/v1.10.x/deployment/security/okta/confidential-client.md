---
title: Okta SSO Configuration Guide | Confidential Client Setup
description: Comprehensive guide to setting up Okta SSO for confidential clients using OIDC. Includes client secret configuration, secure token handling, and advanced security options.
slug: /deployment/security/okta/confidential-client
collate: false
---

# Okta SSO Configuration (Confidential Client)

Okta Single Sign-On (SSO) enables users to log in to OpenMetadata with their Okta credentials using **OAuth 2.0** and **OpenID Connect (OIDC)** protocols.

{% image 
src="/images/v1.10/deployment/security/okta/okta2.png" 
alt="Okta SSO Configuration - Confidential Client" /%}

## Provider Name

Defines a human-readable name to identify this Okta SSO configuration.

- **Example:** `Okta SSO`, `Company Okta`
- **Note:** This is for display purposes only and does not affect authentication functionality.

## Authentication Configuration (Confidential)

### Enable Self Signup

Allows users to create OpenMetadata accounts on first login.

- **Options:** Enabled | Disabled
- **Recommended:** Disabled (for tighter access control)

---

### Authority

Your Okta domain URL used to issue tokens.

- **Example:** `https://dev-123456.okta.com` or `https://company.okta.com`
- **Note:** This must match your Okta domain exactly.

---

### Public Key URLs

URLs where Okta publishes its public signing keys.

- **Example:** `["https://dev-123456.okta.com/oauth2/v1/keys"]`
- **Note:** Usually auto-discovered via discovery URI.

---

### Token Validation Algorithm

Specifies the JWT algorithm to validate token signatures.

- **Options:** RS256 | RS384 | RS512
- **Default:** RS256

---

### Client Type

Defines the application type: public (no secret) or confidential (requires client secret).

- **Recommended:** Confidential (for backend services and web apps)

---

### OIDC Client ID

The client ID from your Okta app registration.

- **Example:** `0oabc123def456ghi789`

---

### OIDC Client Secret

The client secret for authenticating your confidential client.

- **Example:** `abc123def456ghi789jkl012mno345pqr678st`
- **Note:** Only used for confidential clients. Rotate regularly.

---

### OIDC Request Scopes

Permissions requested during authentication.

- **Default:** `openid email profile`
- **Optional:** Add `groups` for group-based authorization.

---

### OIDC Discovery URI

URI to retrieve Okta’s OIDC metadata.

- **Example:** `https://dev-123456.okta.com/.well-known/openid-configuration`

---

### OIDC Use Nonce

Enables anti-replay protection.

- **Default:** true

---

### OIDC Preferred JWS Algorithm

Preferred JWT signing algorithm.

- **Default:** RS256

---

### OIDC Response Type

Defines the OAuth flow type.

- **Options:** `id_token` | `code`
- **Recommended:** `code` (authorization code flow)

---

### OIDC Disable PKCE

Disables PKCE (Proof Key for Code Exchange).

- **Default:** false
- **Note:** Should generally remain enabled for security.

---

### OIDC Max Clock Skew

Allowed time difference (in seconds) between systems during token validation.

- **Example:** `0`

---

### OIDC Client Authentication Method

Specifies how the client authenticates with Okta.

- **Options:** `client_secret_basic` | `client_secret_post` | `client_secret_jwt` | `private_key_jwt`
- **Default:** `client_secret_basic`

---

### OIDC Token Validity

How long tokens remain valid (in seconds).

- **Default:** `0` (uses Okta’s default)
- **Example:** `3600` (1 hour)

---

### OIDC Tenant

Your Okta organization subdomain.

- **Example:** `dev-123456`, `company`

---

### OIDC Server URL

Base URL for your Okta server.

- **Example:** `https://dev-123456.okta.com`

---

### Callback URL

Redirect URI for handling login responses.

- **Example:** `https://yourapp.company.com/callback`
- **Note:** Must match exactly in Okta → Applications → Sign-in redirect URIs

---

### OIDC Max Age

Maximum time (in seconds) before forcing re-authentication.

- **Example:** `3600`
- **Optional:** Leave empty to use default behavior.

---

### OIDC Prompt

Controls authentication behavior.

- **Options:** `none` | `login` | `consent` | `select_account`
- **Recommended:** `login` (forces credential prompt)

---

### OIDC Session Expiry

Controls user session duration (in seconds).

- **Default:** `604800` (7 days)

---

### JWT Principal Claims

JWT fields used to identify the authenticated user.

- **Example:** `["preferred_username", "email", "sub"]`

---

### JWT Principal Claims Mapping

Maps JWT claims to OpenMetadata user profile fields.

- **Example:** `["email:email", "name:name", "firstName:given_name"]`
- **Note:** Format: `"openmetadata_field:jwt_claim"`

---

### Admin Principals

List of users with full admin access.

- **Example:** `["admin@company.com", "superuser@company.com"]`
- **Note:** Must match one of the JWT claim values.

---

### Principal Domain

Default domain for user identifiers.

- **Example:** `company.com`

---

### Enforce Principal Domain

Restricts access to users within the configured domain.

- **Default:** false
- **Example:** true

---

### Enable Secure Socket Connection

Enforces secure (SSL/TLS) communication.

- **Default:** false
- **Recommended:** true for production environments

## Summary

| **Field**                         | **Example / Default**                                    |
|----------------------------------|-----------------------------------------------------------|
| Client Type                      | Confidential                                              |
| OIDC Client ID                   | 0oabc123def456ghi789                                      |
| OIDC Client Secret               | abc123def456ghi789jkl012mno345pqr678st                    |
| Callback URL                     | https://yourapp.company.com/callback                     |
| Authority                        | https://dev-123456.okta.com                               |
| OIDC Discovery URI               | https://dev-123456.okta.com/.well-known/openid-configuration |
| Public Key URLs                  | https://dev-123456.okta.com/oauth2/v1/keys                |
| Token Validation Algorithm       | RS256                                                     |
| OIDC Response Type               | code                                                      |
| OIDC Request Scopes              | openid email profile groups                               |
| OIDC Preferred JWS Algorithm     | RS256                                                     |
| OIDC Use Nonce                   | true                                                      |
| OIDC Disable PKCE                | false                                                     |
| OIDC Client Authentication Method| client_secret_basic                                       |
| OIDC Max Clock Skew              | 0                                                         |
| OIDC Token Validity              | 3600                                                      |
| OIDC Max Age                     | 3600                                                      |
| OIDC Prompt                      | login                                                     |
| OIDC Session Expiry              | 604800                                                    |
| OIDC Tenant                      | dev-123456                                                |
| OIDC Server URL                  | https://dev-123456.okta.com                               |
| JWT Principal Claims             | ["preferred_username", "email", "sub"]                   |
| JWT Mapping                      | ["email:email", "name:name", "firstName:given_name"]     |
| Admin Principals                 | ["admin@company.com"]                                     |
| Principal Domain                 | company.com                                               |
| Enforce Principal Domain         | false                                                     |
| SSL/TLS                          | true                                                      |

{% note %}

If users are automatically logged out and unable to log in again due to a bad authentication configuration, you can reset the security setup using the following command:

```

./bootstrap/openmetadata-ops.sh remove-security-config --force

```

After executing the command, **restart the server**. The authentication values from your YAML or Helm chart will then be reapplied on startup.

{% /note %}
