---
title: Azure SSO for Kubernetes
slug: /deployment/security/azure/kubernetes
---

# Azure SSO for Kubernetes

Check the Helm information [here](https://artifacthub.io/packages/search?repo=open-metadata).

Get the `Client Id` and `Tenant ID` from Azure Application configured in [Step 3](/deployment/security/azure#step-3-where-to-find-the-credentials).

See the snippet below for an example of where to place the values and update the authorizer configurations in the `values.yaml`.

```yaml
openmetadata:
  config:
    authorizer:
      className: "org.openmetadata.service.security.DefaultAuthorizer"
      containerRequestFilter: "org.openmetadata.service.security.JwtFilter"
      initialAdmins:
        - "user1"
        - "user2"
      principalDomain: "open-metadata.org"
    authentication:
      provider: "azure"
      publicKeys:
      - "{your domain}/api/v1/system/config/jwks" # Update with your Domain and Make sure this "/api/v1/system/config/jwks" is always configured to enable JWT tokens
      - "https://login.microsoftonline.com/common/discovery/keys"
      authority: "https://login.microsoftonline.com/{Tenant ID}"
      clientId: "{Client ID}" # Azure Application
      callbackUrl: "http://localhost:8585/callback"
```

{% note %}

Altering the order of claims in `jwtPrincipalClaims` may lead to problems when matching a user from a token with an existing user in the system. The mapping process relies on the specific order of claims, so changing it can result in inconsistencies or authentication failures, as the system cannot ensure correct user mapping with a new claim order.

{% /note %}

{% partial file="/v1.4/deployment/configure-ingestion.md" /%}
