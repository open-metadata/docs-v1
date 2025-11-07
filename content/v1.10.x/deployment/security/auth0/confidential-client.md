---
title: Auth0 SSO Configuration for Confidential Apps
description: Learn to configure Auth0 SSO for confidential clients with OIDC, secure token handling, and client secret setup for web and backend apps.
slug: /deployment/security/auth0/confidential-client
collate: false
---

# Auth0 SSO Configuration (Confidential)

- [Troubleshooting](#troubleshooting)

Auth0 SSO enables users to log in to OpenMetadata using their Auth0 credentials via OAuth 2.0 and OpenID Connect (OIDC). This configuration supports **Confidential Clients** using both Client ID and Client Secret for secure backend authentication.

## Confidential Configuration Fields

{% image 
src="/images/v1.10/deployment/security/auth0/auth02.png" 
alt="Auth0 SSO Configuration - Confidential Client" /%}

### Provider Name

- **Definition:** A human‑readable name for this Auth0 SSO configuration instance.  
- **Example:** `Auth0 SSO`, `Company Auth0`, `Custom Identity Provider`  
- **Why it matters:** Helps identify this specific SSO configuration in logs and interfaces.  
- **Note:** Display only; does not impact authentication logic.

### Client Type

- **Definition:** Whether the application is Public (no secret) or Confidential (requires a secret).  
- **Options:** Public | Confidential  
- **Example:** Confidential  
- **Why it matters:** Determines security level and authentication flow. Confidential clients can securely store secrets.  
- **Note:**  
  - Use **Public** for simple or frontend‑only apps  
  - Use **Confidential** for backend services or web applications  
  - Auth0 typically uses Confidential client type

### Enable Self Signup

- **Definition:** Allows users to automatically create accounts on first login.  
- **Options:** Enabled | Disabled  
- **Example:** Enabled  
- **Why it matters:** Controls whether new users from Auth0 can join automatically or require approval.  
- **Note:** Disable for tighter control of access.

### Authority

- **Definition:** The Auth0 domain endpoint that issues tokens for your tenant.  
- **Example:** `https://dev‑abc123.us.auth0.com/your‑auth0‑domain`  
- **Why it matters:** Tells OpenMetadata which Auth0 tenant to authenticate against.  
- **Note:**  
  - Replace `your‑auth0‑domain` with your Auth0 tenant ID  
  - For multi‑tenant use, you may use `common`

### Public Key URLs

- **Definition:** List of URLs where Auth0 publishes public keys for token verification.  
- **Example:** `["https://dev‑abc123.us.auth0.com/common/discovery/v2.0/keys"]`  
- **Why it matters:** Used to verify JWT token signatures from Auth0.  
- **Note:** Usually auto‑discovered from the discovery URI; manual configuration rarely needed.

### Token Validation Algorithm

- **Definition:** Algorithm used to validate JWT token signatures.  
- **Options:** RS256 | RS384 | RS512  
- **Default:** RS256  
- **Example:** RS256  
- **Why it matters:** Must match the algorithm used by Auth0 to sign tokens.

### OIDC Client ID

- **Definition:** Application (client) ID for OIDC authentication with Auth0.  
- **Example:** `abc123def456ghi789jkl012mno345pqr`  
- **Why it matters:** Identifies your application in Auth0 OIDC flows.  
- **Note:** Same ID shown in Auth0 app registration.

### OIDC Client Secret

- **Definition:** Secret key for confidential client authentication with Auth0.  
- **Example:** `abc123def456ghi789jkl012mno345pqr678st`  
- **Why it matters:** Required for confidential clients to securely authenticate with Auth0.  
- **Note:**  
  - Generate in **Auth0 → Applications → Certificates & Secrets**  
  - Store securely and rotate regularly.  
  - Only required for Confidential client type.

### OIDC Request Scopes

- **Definition:** Permissions requested from Auth0 during authentication.  
- **Default:** `openid email profile`  
- **Example:** `openid email profile User.Read`  
- **Why it matters:** Determines what user information OpenMetadata can access.  
- **Note:** Usually `openid email profile` is sufficient.

### OIDC Discovery URI

- **Definition:** Auth0’s OpenID Connect metadata endpoint.  
- **Example:** `https://dev‑abc123.us.auth0.com/your‑auth0‑domain/v2.0/.well‑known/openid‑configuration`  
- **Why it matters:** Allows OpenMetadata to automatically discover Auth0’s OIDC endpoints.  
- **Note:** Replace `your‑auth0‑domain` with your actual tenant ID.

### OIDC Use Nonce

- **Definition:** Security feature to prevent replay attacks in OIDC flows.  
- **Default:** true  
- **Example:** true  
- **Why it matters:** Ensures each authentication request is unique.  
- **Note:** Should generally be enabled.

### OIDC Preferred JWS Algorithm

- **Definition:** Algorithm used to verify JWT token signatures from Auth0.  
- **Default:** RS256  
- **Example:** RS256  
- **Why it matters:** Must match Auth0’s token signing algorithm.

### OIDC Response Type

- **Definition:** Type of response expected during authentication.  
- **Default:** `id_token`  
- **Options:** `id_token` | `code`  
- **Example:** `id_token`  
- **Why it matters:** Determines OAuth flow type (implicit vs authorization code).

### OIDC Disable PKCE

- **Definition:** Whether to disable Proof Key for Code Exchange (PKCE).  
- **Default:** false  
- **Example:** false  
- **Why it matters:** PKCE adds security to the authorization code flow.  
- **Note:** Should typically remain enabled (`false`) for secure flows.

### OIDC Max Clock Skew

- **Definition:** Maximum allowed time difference between systems when validating tokens.  
- **Example:** 0 (seconds)  
- **Why it matters:** Prevents token validation failures due to minor time differences.

### OIDC Client Authentication Method

- **Definition:** Method used to authenticate the client with Auth0.  
- **Default:** `client_secret_basic`  
- **Options:** `client_secret_basic` | `client_secret_post` | `client_secret_jwt` | `private_key_jwt`  
- **Example:** `client_secret_basic`  
- **Why it matters:** Must match the configuration in your Auth0 app.

### OIDC Token Validity

- **Definition:** Duration (in seconds) for which issued tokens remain valid.  
- **Default:** 0 (use provider default)  
- **Example:** 3600 (1 hour)  
- **Why it matters:** Controls token lifetime and session duration.

### OIDC Tenant

- **Definition:** Auth0 tenant identifier for multi‑tenant applications.  
- **Example:** `your‑auth0‑domain` or `company.onmicrosoft.com`  
- **Why it matters:** Specifies which Auth0 tenant to authenticate against.

### OIDC Server URL

- **Definition:** Your OM server url.
- **Example:** `https://yourapp.company.com`.
- **Why it matters:** Specifies the URL at which OM is hosted.

### OIDC Callback URL

- **Definition:** Redirect URI for OIDC authentication responses.  
- **Example:** `https://yourapp.company.com/callback`  
- **Why it matters:** Must match the redirect URI configured in Auth0.  
- **Note:** Must be registered in Auth0 app registration.

### OIDC Max Age

- **Definition:** Maximum authentication age (in seconds) before re‑authentication is required.  
- **Example:** 3600  
- **Why it matters:** Controls how often users must re‑authenticate.

### OIDC Prompt

- **Definition:** Controls authentication prompts shown to users.  
- **Options:** `none` | `login` | `consent` | `select_account`  
- **Example:** `select_account`  
- **Why it matters:** Affects user experience during login.

### OIDC Session Expiry

- **Definition:** How long user sessions remain valid (in seconds).  
- **Default:** 604800 (7 days)  
- **Example:** 604800  
- **Why it matters:** Controls how often users need to sign in.

### JWT Principal Claims

- **Definition:** JWT claims used to identify the user principal.  
- **Example:** `["preferred_username", "email", "sub"]`  
- **Why it matters:** Determines which claim from the token identifies the user.

### JWT Principal Claims Mapping

- **Definition:** Maps JWT claims to OpenMetadata user attributes.  
- **Example:** `["email:email", "name:displayName", "firstName:given_name"]`  
- **Why it matters:** Controls how user information from Auth0 maps to OpenMetadata profiles.  
- **Note:** Format: `"openmetadata_field:jwt_claim"`

### Admin Principals

- **Definition:** List of user principals who will have admin access.  
- **Example:** `["admin@company.com", "superuser@company.com"]`  
- **Why it matters:** These users will have full administrative privileges.  
- **Note:** Use email addresses or UPNs matching JWT principal claims.

### Principal Domain

- **Definition:** Default domain for user principals.  
- **Example:** `company.com`  
- **Why it matters:** Used to build full user principal names when only username is provided.

### Enforce Principal Domain

- **Definition:** Whether to enforce that all users belong to the principal domain.  
- **Default:** false  
- **Example:** true  
- **Why it matters:** Adds a layer of security by restricting access to a specific domain.

### Enable Secure Socket Connection

- **Definition:** Whether to use SSL/TLS for secure connections.  
- **Default:** false  
- **Example:** true  
- **Why it matters:** Ensures encrypted communication for secure authentication flows.  
- **Note:** Should be enabled in production environments.

## Summary Table

| **Field**                   | **Example / Default**                                       |
|-----------------------------|--------------------------------------------------------------|
| Provider Name               | Auth0 SSO                                                   |
| Client Type                 | Confidential                                                |
| Client ID                   | abc123def456ghi789jkl012mno345pqr                           |
| Client Secret               | (hidden)                                                    |
| Callback URL                | https://yourapp.company.com/callback                        |
| Authority                   | https://dev‑abc123.us.auth0.com                             |
| Public Key URLs             | https://dev‑abc123.us.auth0.com/.well‑known/jwks.json       |
| Token Validation Algorithm  | RS256                                                       |
| JWT Principal Claims        | ["preferred_username", "email", "sub"]                       |
| JWT Mapping                 | ["email:email", "name:displayName", "firstName:given_name"] |
| Admin Principals            | ["admin@company.com"]                                       |
| Principal Domain            | company.com                                                 |
| Enforce Principal Domain    | false                                                       |
| SSL/TLS                     | true                                                        |

{% partial file="/v1.10/deployment/sso-troubleshooting.md" /%}
