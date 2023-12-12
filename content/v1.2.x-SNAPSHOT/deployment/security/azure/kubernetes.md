---
title: Azure SSO for Kubernetes
slug: /deployment/security/azure/kubernetes
---

# Azure SSO for Kubernetes

Check the Helm information [here](https://artifacthub.io/packages/search?repo=open-metadata).

Get the `Client Id` and `Tenant ID` from Azure Application configured in [Step 3](/deployment/security/azure#step-3-where-to-find-the-credentials).

Get the Azure Service Application `Client Id`, `Client Secret`, `Authority`, `Scopes` from the information collected in [Step 9](/deployment/security/azure#step-9-note-down-the-clientid-and-authority).

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
      - "http://openmetadata:8585/api/v1/config/jwks"
      - "https://login.microsoftonline.com/common/discovery/keys"
      authority: "https://login.microsoftonline.com/{Tenant ID}"
      clientId: "{Client ID}" # Azure Application
      callbackUrl: "http://localhost:8585/callback"
```

{% partial file="/v1.2/deployment/configure-ingestion.md" /%}
