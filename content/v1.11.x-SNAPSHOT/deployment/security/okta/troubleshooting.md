---
title: Fix Timeout When Using Okta SSO
description: Learn how to resolve errors in OpenMetadata when using Okta, including a spinning wheel timeout with Okta redirects
slug: /deployment/security/okta/troubleshooting
collate: false
---

# FAQ: Security with Okta

## How to resolve spinnging timeout error when connecting to OpenMetadata with Okta SSO?

If you're using Okta to authenticate OpenMetadata with SSO, it may redirect to a blank screen with a spinning wheel, indicating a redirect issue.

### Resolution

To allow Okta to authenticate and redirect to OpenMetadata properly:

1. Ensure your callback URLs are pointing to OpenMetadata that Okta can reach. [Our guide](/deployment/security/okta/auth-code-flow) uses `localhost:8585` if you are not hosting OpenMetadata locally, you will need to update your sign-in redirect URIs, and possibly your sign-out redict URIs and base URIs if you have set those.
2. Keep only the callback URLs that OpenMetadata actually uses:

```
redirect_uris = [
  "http://localhost:8585/callback",
  "http://localhost:8585/silent-callback"  # Only if needed for silent refresh
]
```

OpenMetadata isn't configured to handle additional endpoints, so the frontend will spin indefinitely.
