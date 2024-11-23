---
title: Auth0 SSO for Bare Metal
slug: /deployment/security/auth0/bare-metal
---

# Auth0 SSO for Bare Metal

## Update conf/openmetadata.yaml

Once the `Client Id` is generated, add the `Client Id` in `openmetadata.yaml` file in `client_id` field.

```yaml
authenticationConfiguration:
  provider: "auth0"
  publicKeyUrls: 
    - "https://parth-panchal.us.auth0.com/.well-known/jwks.json"
    - "{your domain}/api/v1/system/config/jwks" #Make sure this URL is always configured to enable JWT tokens
  authority: "https://parth-panchal.us.auth0.com/"
  clientId: "{Client ID}"
  callbackUrl: "http://localhost:8585/callback"
```

Then, 
- Update `authorizerConfiguration` to add login names of the admin users in `adminPrincipals` section as shown below.
- Update the `principalDomain` to your company domain name.

```yaml
authorizerConfiguration:
  className: "org.openmetadata.service.security.DefaultAuthorizer"
  # JWT Filter
  containerRequestFilter: "org.openmetadata.service.security.JwtFilter"
  adminPrincipals:
    - "user1"
    - "user2"
  principalDomain: "open-metadata.org"
```

{% partial file="/v1.4/deployment/configure-ingestion.md" /%}
