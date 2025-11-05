---
title: Auth0 SSO Setup Guide for Public Apps
description: Step-by-step guide to configure Auth0 SSO for public clients using OAuth 2.0—ideal for SPAs and mobile apps without client secrets.
slug: /deployment/security/auth0/public-client
collate: false
---

# Auth0 SSO Configuration Public

- [Troubleshooting](#troubleshooting)

Auth0 SSO enables users to authenticate into OpenMetadata using their Auth0 credentials. This configuration supports OAuth 2.0 and OpenID Connect (OIDC) standards, making it easy to integrate with enterprise identity solutions using Auth0.

## Public Configuration Fields

{% image 
src="/images/v1.11/deployment/security/auth0/auth01.png" 
alt="Azure AD SSO Configuration - Public Client" /%}

### Provider Name

- **Definition:** A human-readable name for this Auth0 SSO configuration.
- **Example:** `Auth0 SSO`, `Company Auth0`, `Custom Identity Provider`
- **Why it matters:** Helps identify this configuration in the UI and logs.
- **Note:** Display-only, does not affect authentication.

### Client Type

- **Definition:** Defines the type of application.
- **Options:** Public | Confidential
- **Example:** Confidential
- **Why it matters:** Determines whether a client secret is required.
- **Note:**  
  - Use **Confidential** for backend services and web apps  
  - Use **Public** only if you're not storing secrets (not recommended for production)  
  - **Auth0 typically uses Confidential**

### Client ID

- **Definition:** Application ID issued by Auth0.
- **Example:** `abc123def456ghi789jkl012mno345pqr`
- **Why it matters:** Used to identify your application during authentication.
- **Note:** Available under **Auth0 → Applications → [Your App] → Application ID**

### Callback URL

- **Definition:** Redirect URI for Auth0 to send authentication responses.
- **Example:** `https://yourapp.company.com/callback`
- **Why it matters:** Must match what’s registered in Auth0 or login will fail.
- **Note:**  
  - Register in **Auth0 → Applications → Redirect URIs**  
  - Use HTTPS in production

### Enable Self Signup

- **Definition:** Allows new users to be created on first login.
- **Options:** Enabled | Disabled
- **Example:** Enabled
- **Why it matters:** Controls auto-provisioning of users from Auth0.
- **Note:** Disable to restrict sign-ups to known users only.

### Authority

- **Definition:** Auth0 domain that issues tokens.
- **Example:** `https://dev-abc123.us.auth0.com`
- **Why it matters:** Tells OpenMetadata where to direct login requests.
- **Note:** Replace with your Auth0 tenant domain.

### Public Key URLs

- **Definition:** URL(s) to fetch Auth0's public signing keys.
- **Example:** `["https://dev-abc123.us.auth0.com/.well-known/jwks.json"]`
- **Why it matters:** Used to validate Auth0 JWT signatures.
- **Note:** Usually auto-discovered from the OIDC metadata URL.

### Token Validation Algorithm

- **Definition:** Algorithm for validating JWT tokens.
- **Options:** RS256 | RS384 | RS512
- **Default:** RS256
- **Example:** RS256
- **Why it matters:** Must match Auth0's signing algorithm.

### JWT Principal Claims

- **Definition:** JWT claims that identify the user principal.
- **Example:** `["preferred_username", "email", "sub"]`
- **Why it matters:** Used to determine the OpenMetadata user from the Auth0 token.
- **Note:** Typical Auth0 claims include `email`, `preferred_username`, `sub`.

### JWT Principal Claims Mapping

- **Definition:** Maps JWT claims to OpenMetadata user attributes.
- **Example:** `["email:email", "name:displayName", "firstName:given_name"]`
- **Why it matters:** Ensures Auth0 user details populate correctly in OpenMetadata.
- **Note:** Format: `openmetadata_field:jwt_claim`

### Admin Principals

- **Definition:** List of users who should have admin privileges.
- **Example:** `["admin@company.com", "superuser@company.com"]`
- **Why it matters:** These users will have full access to OpenMetadata.
- **Note:** Must match values from the JWT principal claims.

### Principal Domain

- **Definition:** Default domain used for user identifiers.
- **Example:** `company.com`
- **Why it matters:** Used to build full email addresses when only username is provided.

### Enforce Principal Domain

- **Definition:** Restricts logins to a specific domain.
- **Default:** false
- **Example:** true
- **Why it matters:** Enhances security by limiting authentication to approved domains.

### Enable Secure Socket Connection

- **Definition:** Whether to use SSL/TLS for authentication requests.
- **Default:** false
- **Example:** true
- **Why it matters:** Ensures encrypted communication between OpenMetadata and Auth0.
- **Note:** Always enable in production.

## Summary Table

| **Field**                     | **Example / Default**                                       |
|------------------------------|-------------------------------------------------------------|
| Provider Name                | Auth0 SSO                                                  |
| Client Type                  | Confidential                                               |
| Client ID                    | abc123def456ghi789jkl012mno345pqr                          |
| Callback URL                 | https://yourapp.company.com/callback                       |
| Authority                    | https://dev-abc123.us.auth0.com                            |
| Public Key URLs              | https://dev-abc123.us.auth0.com/.well-known/jwks.json      |
| Token Validation Algorithm   | RS256                                                      |
| JWT Principal Claims         | ["preferred_username", "email", "sub"]                     |
| JWT Mapping                  | ["email:email", "name:displayName", "firstName:given_name"]|
| Admin Principals             | ["admin@company.com"]                                      |
| Principal Domain             | company.com                                                |
| Enforce Principal Domain     | false                                                      |
| SSL/TLS                      | true                                                       |

{% partial file="/v1.11/deployment/sso-troubleshooting.md" /%}
