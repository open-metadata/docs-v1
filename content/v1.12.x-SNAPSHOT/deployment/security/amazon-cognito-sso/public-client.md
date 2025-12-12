---
title: AWS Cognito SSO Setup Guide for Public Apps
description: Step-by-step guide to configure AWS Cognito SSO for public clients using OAuth 2.0—ideal for SPAs and mobile apps without client secrets.
slug: /deployment/security/amazon-cognito/public-client
collate: false
---

# AWS Cognito SSO Configuration (Public)

- [Troubleshooting](#troubleshooting)

AWS Cognito SSO enables users to log in using their credentials from a Cognito User Pool through OAuth 2.0 and OpenID Connect (OIDC). This guide walks you through configuring AWS Cognito as an authentication provider in OpenMetadata.

## Public Configuration Fields

{% image 
src="/images/v1.12/deployment/security/amazon-cognito-sso/cognito1.png" 
alt="AWS Cognito SSO Configuration - Public Client" /%}

### Provider Name

- **Definition:** Human-readable name for this Cognito SSO instance.
- **Example:** `AWS Cognito SSO`, `Company Cognito`
- **Note:** Used only for display and logging purposes.

### Client Type

- **Definition:** Defines whether the app is public (no secret) or confidential (requires client secret).
- **Options:** Public | Confidential
- **Example:** Confidential
- **Note:** 
  - Use **Public** for SPAs or mobile apps  
  - Use **Confidential** for web apps or backends

### OIDC Client ID

- **Definition:** Client ID from the Cognito User Pool App.
- **Example:** `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`
- **Note:** Found under **Cognito > User Pools > App Integration > App Clients**

### OIDC Callback URL

- **Definition:** URI where Cognito redirects after authentication.
- **Example:** `https://yourapp.company.com/callback`
- **Note:**
  - Must be registered in **Cognito > Allowed Callback URLs**
  - Use HTTPS in production

### Enable Self Signup

- **Definition:** Allows new users to auto-create accounts upon first login.
- **Example:** Enabled
- **Note:** Cognito must also allow sign-ups.

### Authority

- **Definition:** AWS Cognito token-issuing domain.
- **Example:** `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ABC123DEF`
- **Note:** Replace with your region and User Pool ID

### Public Key URLs

- **Definition:** JWKS URLs used to verify token signatures.
- **Example:** `["https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ABC123DEF/.well-known/jwks.json"]`

### Token Validation Algorithm

- **Definition:** Algorithm to validate JWT tokens.
- **Options:** RS256 | RS384 | RS512
- **Default:** RS256

### JWT Principal Claims

- **Definition:** Claims used to identify the user.
- **Example:** `["cognito:username", "email", "sub"]`
- **Note:** Typical Cognito claims include `cognito:username`, `email`, `sub`, `preferred_username`

### JWT Principal Claims Mapping

- **Definition:** Maps claims to OpenMetadata user fields.
- **Example:** `["email:email", "name:name", "firstName:given_name"]`
- **Note:** Format - `"openmetadata_field:jwt_claim"`

### Admin Principals

- **Definition:** List of users with admin access.
- **Example:** `["admin@company.com", "superuser@company.com"]`

### Principal Domain

- **Definition:** Default domain for users.
- **Example:** `company.com`
- **Note:** Helps construct full identity from usernames.

### Enforce Principal Domain

- **Definition:** Restrict access to users from a specific domain.
- **Example:** true
- **Default:** false

### Enable Secure Socket Connection

- **Definition:** Enables SSL/TLS for secure communication.
- **Example:** true
- **Default:** false
- **Note:** Recommended in production

## Summary Table

| **Field**                   | **Example / Default**                                                    |
|----------------------------|---------------------------------------------------------------------------|
| Provider Name              | AWS Cognito SSO                                                           |
| Client Type                | Confidential                                                              |
| OIDC Client ID             | 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p                                          |
| OIDC Callback URL          | https://yourapp.company.com/callback                                     |
| Enable Self Signup         | Enabled                                                                   |
| Authority                  | https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ABC123DEF           |
| Public Key URLs            | https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ABC123DEF/.well-known/jwks.json |
| Token Validation Algorithm | RS256                                                                     |
| JWT Principal Claims       | ["cognito:username", "email", "sub"]                                     |
| JWT Mapping                | ["email:email", "name:name", "firstName:given_name"]                      |
| Admin Principals           | ["admin@company.com"]                                                     |
| Principal Domain           | company.com                                                               |
| Enforce Principal Domain   | false                                                                     |
| SSL/TLS                    | true                                                                      |

{% partial file="/v1.12/deployment/sso-troubleshooting.md" /%}
