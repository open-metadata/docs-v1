---
title: Custom OIDC SSO Configuration | OpenMetadata
description: Step-by-step guide to configure Custom OIDC-based SSO using ADFS, Okta, or Shibboleth for secure enterprise authentication and federated login in OpenMetadata.
slug: /deployment/security/custom-oidc/custom-odic-configuration
---

# Custom OIDC SSO Configuration

- [Troubleshooting](#troubleshooting)

Custom OIDC authentication enables integration with any OpenID Connect (OIDC) compliant identity provider such as Auth0, Google, Azure AD, PingIdentity, or internal enterprise solutions.

This guide walks you through configuring OpenMetadata with a Custom OIDC provider using **Confidential client** settings (Client ID + Client Secret).

{% image 
src="/images/v1.11/deployment/security/custom-oidc/custom1.png"
alt="Custom OIDC Configuration" /%}

## Configuration Fields

### Custom Provider Name

- **Definition:** A display name for your OIDC provider shown to users during login.
- **Example:** `"Company SSO"`, `"Internal Auth"`
- **Why it matters:** Used in UI and logs for easy identification.
- **Optional:** Defaults to `"Custom OIDC"` if not specified.

### Enable Self Signup

- **Definition:** Allows new users to create accounts on first login via OIDC.
- **Default:** false
- **Why it matters:** Controls auto-provisioning of user accounts.
- **Security Consideration:** Enable only if all OIDC users are trusted.

### Authority / Issuer URL

- **Definition:** The base URL of your OIDC provider’s authentication server.
- **Example:** `https://auth.yourcompany.com`
- **Why it matters:** Used for discovering OIDC metadata and validating tokens.
- **Required:** Yes
- **Note:** Must return a valid discovery document from `/.well-known/openid-configuration`.

### Public Key / JWK URL

- **Definition:** URL to the JSON Web Key Set (JWKS) used to validate tokens.
- **Example:** `https://auth.yourcompany.com/.well-known/jwks.json`
- **Why it matters:** Validates the signature of JWT tokens.
- **Note:** Usually auto-resolved from the discovery document.

### Token Validation Algorithm

- **Definition:** Algorithm used to validate JWTs.
- **Options:** RS256 | RS384 | RS512 | HS256 | HS384 | HS512
- **Default:** RS256
- **Why it matters:** Must match your OIDC provider’s signing algorithm.
- **Note:** RS256 is recommended.

### Client Type

- **Value:** `custom-oidc`
- **Definition:** Identifies this integration type.

### Client ID

- **Definition:** OAuth2 client ID issued by your OIDC provider.
- **Example:** `my-custom-oidc-client-12345`
- **Required:** Yes

### Client Secret

- **Definition:** OAuth2 client secret from your OIDC provider.
- **Example:** `abc123-secret-xyz789`
- **Required:** Yes
- **Note:** Keep this value secure. Never expose in frontend code.

### Scopes

- **Definition:** OAuth2 scopes requested from your provider.
- **Default:** `openid profile email`
- **Example:** `openid profile email groups`
- **Why it matters:** Controls what user data OpenMetadata can access.
- **Common scopes:**
  - `openid` – Required for OIDC
  - `profile` – Access basic user profile
  - `email` – Access user email
  - `groups` – Access group membership (if supported)

### OIDC Discovery URI

- **Definition:** URL to your OIDC provider's discovery document.
- **Example:** `https://auth.yourcompany.com/.well-known/openid-configuration`
- **Why it matters:** Used to auto-configure token and auth endpoints.

### Use Nonce

- **Definition:** Prevents replay attacks in OIDC authentication.
- **Default:** false
- **Example:** true

### Preferred JWS Algorithm

- **Definition:** Signature algorithm for JWT validation.
- **Default:** RS256

### Response Type

- **Definition:** OAuth response type.
- **Default:** `code`
- **Options:** `id_token`, `code`
- **Why it matters:** Authorization code flow is recommended for backend services.

### Disable PKCE

- **Definition:** Whether to disable Proof Key for Code Exchange.
- **Default:** false

### Max Clock Skew

- **Definition:** Allowed time difference (in seconds) between client and server.
- **Example:** `0`

### Client Authentication Method

- **Definition:** How your app authenticates to the OIDC provider.
- **Options:** `client_secret_basic` | `client_secret_post` | `client_secret_jwt` | `private_key_jwt`
- **Default:** `client_secret_basic`

### Token Validity

- **Definition:** Duration (in seconds) for which the token is valid.
- **Example:** `3600`
- **Note:** Use `0` to inherit provider’s default.

### Tenant

- **Definition:** Optional identifier for your OIDC tenant.
- **Example:** `company-idp`

### Server URL

- **Definition:** Base server URL of the OIDC provider.
- **Example:** `https://auth.yourcompany.com`

### Callback URL

- **Definition:** Redirect URI where users land after authentication.
- **Example:** `https://yourapp.company.com/callback`
- **Required:** Yes
- **Note:** This must be registered in your OIDC provider's allowed redirect URIs.

### Max Age

- **Definition:** Max age (in seconds) since user last authenticated.
- **Example:** `3600`

### Prompt

- **Definition:** Controls login experience.
- **Options:** `none`, `login`, `consent`, `select_account`
- **Example:** `login`

### Session Expiry

- **Definition:** How long the user session lasts in seconds.
- **Default:** 604800 (7 days)

### JWT Principal Claims

- **Definition:** Claims in the JWT used to identify the user.
- **Default:** `["email", "preferred_username", "sub"]`
- **Example:** `["email", "username", "sub"]`

### JWT Principal Claims Mapping

- **Definition:** Maps JWT claims to OpenMetadata user profile fields.
- **Example:** `["email:email", "name:name", "firstName:given_name"]`
- **Format:** `"openmetadata_field:jwt_claim"`

### Admin Principals

- **Definition:** Users granted admin rights.
- **Example:** `["admin@company.com", "security@company.com"]`

### Bot Principals

- **Definition:** Service account(s) used for automation.
- **Example:** `["ingestion-bot@example.com"]`

### Principal Domain

- **Definition:** Default domain appended to usernames.
- **Example:** `company.com`

### Enforce Principal Domain

- **Definition:** Restrict user logins to a specific domain.
- **Default:** false
- **Example:** true

### Enable Secure Socket Connection

- **Definition:** Use SSL/TLS for secure communications.
- **Default:** false
- **Example:** true

## Summary Table

| **Field**                       | **Example / Default**                                      |
|----------------------------------|-------------------------------------------------------------|
| Type                             | custom-oidc                                                 |
| Client Type                      | Confidential                                                |
| Client ID                        | my-custom-oidc-client-12345                                 |
| Client Secret                    | abc123-secret-xyz789                                        |
| Authority / Issuer URL          | https://auth.yourcompany.com                                |
| Discovery URI                    | https://auth.yourcompany.com/.well-known/openid-configuration |
| Callback URL                     | https://yourapp.company.com/callback                        |
| Token Validation Algorithm       | RS256                                                       |
| Response Type                    | code                                                        |
| Scopes                           | openid profile email groups                                 |
| JWT Principal Claims             | ["email", "preferred_username", "sub"]                      |
| JWT Mapping                      | ["email:email", "name:name", "firstName:given_name"]        |
| Admin Principals                 | ["admin@company.com"]                                       |
| Bot Principals                   | ["ingestion-bot@example.com"]                               |
| Principal Domain                 | company.com                                                 |
| Enforce Principal Domain         | false                                                       |
| SSL/TLS                          | true                                                        |

{% partial file="/v1.11/deployment/sso-troubleshooting.md" /%}
