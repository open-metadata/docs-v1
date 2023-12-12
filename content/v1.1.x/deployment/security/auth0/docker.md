---
title: Auth0 SSO for Docker
slug: /deployment/security/auth0/docker
---

# Auth0 SSO for Docker

To enable security for the Docker deployment, follow the next steps:

## 1. Create an .env file

Create an `openmetadata_auth0.env` file and add the following contents as an example. Use the information
generated when setting up the account.

```shell
# OpenMetadata Server Authentication Configuration
AUTHORIZER_CLASS_NAME=org.openmetadata.service.security.DefaultAuthorizer
AUTHORIZER_REQUEST_FILTER=org.openmetadata.service.security.JwtFilter
AUTHORIZER_ADMIN_PRINCIPALS=[admin]  # Your `name` from name@domain.com
AUTHORIZER_PRINCIPAL_DOMAIN=open-metadata.org # Update with your domain

AUTHENTICATION_PROVIDER=auth0
AUTHENTICATION_PUBLIC_KEYS=[{Domain}/.well-known/jwks.json,http://openmetadata:8585/api/v1/config/jwks] # Update with your Domain
AUTHENTICATION_AUTHORITY={Domain} # Update with your Domain
AUTHENTICATION_CLIENT_ID={Client ID} # Update with your Client ID
AUTHENTICATION_CALLBACK_URL=http://localhost:8585/callback
```

## 2. Start Docker

```commandline
docker compose --env-file ~/openmetadata_auth0.env up -d
```

{% partial file="/v1.1/deployment/configure-ingestion.md" /%}
