---
title: SSO | OpenMetadata Security Integration
description: Set up a SSO provider for authentication, allowing flexible federation and secure access across deployments.
slug: /deployment/security/configuration
collate: false
---

# SSO

Follow the sections in this guide to set up SSO.

{% note %}

Security requirements for your **production** environment:
- **DELETE** the admin default account shipped by OM in case you had [Basic Authentication](/deployment/security/basic-auth)
  enabled before configuring the authentication with SSO.
- **UPDATE** the Private / Public keys used for the [JWT Tokens](/deployment/security/enable-jwt-tokens). The keys we provide
  by default are aimed only for quickstart and testing purposes. They should NEVER be used in a production installation.

{% /note %}

## Create Server Credentials

- Go to the console of your preferred SSO provider
- Create an OIDC client application with implicit flow enabled to get a client ID.

### Create Client ID and Secret Key

{% note %}

In a **Public** client configuration, only the **Client ID** is required. **Client Secret** should not be provided, as public clients cannot securely store sensitive credentials.

{% /note %}

- Navigate to your preferred OIDC provider console and create an OIDC client application.
- Generate client ID and secret key in JSON format.

After the applying these steps, you can update the configuration of your deployment:

{% inlineCalloutContainer %}
  {% inlineCallout
    color="violet-70"
    icon="celebration"
    bold="Docker Security"
    href="/deployment/security/configuration/docker" %}
    Configure SSO for your Docker Deployment.
  {% /inlineCallout %}
  {% inlineCallout
    color="violet-70"
    icon="storage"
    bold="Bare Metal Security"
    href="/deployment/security/configuration/bare-metal" %}
    Configure SSO for your Bare Metal Deployment.
  {% /inlineCallout %}
  {% inlineCallout
    color="violet-70"
    icon="fit_screen"
    bold="Kubernetes Security"
    href="/deployment/security/configuration/kubernetes" %}
    Configure SSO for your Kubernetes Deployment.
  {% /inlineCallout %}
{% /inlineCalloutContainer %}

{% partial file="/v1.10/deployment/configure-ingestion.md" /%}
