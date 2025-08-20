---
sidebar_position: 1
title: Quick Start Guide
description: Get started with OpenMetadata quickly
---

# Quick Start Guide

This guide will help you get OpenMetadata up and running in your environment quickly.

## Choose Your Deployment Method

<TilesContainer>
  <Tile
    title="Docker Deployment"
    description="Perfect for development and testing. Get started in minutes with Docker Compose."
    link="/docs/quick-start/local-docker-deployment"
  />
  <Tile
    title="Kubernetes Deployment"
    description="Production-ready deployment on Kubernetes with scalability and reliability."
    link="/docs/quick-start/local-kubernetes-deployment"
  />
  <Tile
    title="Try the Sandbox"
    description="Experience OpenMetadata without any setup using our online sandbox."
    link="/docs/quick-start/sandbox"
  />
</TilesContainer>

## Step-by-Step Installation

<StepsContainer>
  <Step srNumber={1}>
    <StepDescription title="Prerequisites">
      Make sure you have the required dependencies installed:
      
      - Docker and Docker Compose (for Docker deployment)
      - kubectl and Helm (for Kubernetes deployment)
      - At least 4GB of RAM available
    </StepDescription>
    <StepVisualInfo>
      
      ```bash
      # Check Docker version
      docker --version
      docker-compose --version
      ```
    </StepVisualInfo>
  </Step>

  <Step srNumber={2}>
    <StepDescription title="Download OpenMetadata">
      Clone the OpenMetadata repository or download the release package.
    </StepDescription>
    <StepVisualInfo>
      
      ```bash
      git clone https://github.com/open-metadata/OpenMetadata.git
      cd OpenMetadata
      ```
    </StepVisualInfo>
  </Step>

  <Step srNumber={3}>
    <StepDescription title="Start OpenMetadata">
      Run the deployment command for your chosen method.
    </StepDescription>
    <StepVisualInfo>
      
      ```bash
      # For Docker deployment
      docker-compose up -d
      ```
    </StepVisualInfo>
  </Step>
</StepsContainer>

<Note noteType="Tip">
After installation, OpenMetadata will be available at `http://localhost:8585`. The default login is `admin@openmetadata.org` with password `admin`.
</Note>

## Multi-Language Code Example

<CodeWithLanguageSelector
  title="Connect to OpenMetadata"
  id="connect-example"
  languagesArray={["python", "java", "bash"]}
>

```python
from metadata.ingestion.ometa.ometa_api import OpenMetadata
from metadata.generated.schema.security.client.openMetadataJWTClientConfig import (
    OpenMetadataJWTClientConfig,
)

server_config = OpenMetadataJWTClientConfig(
    jwtToken="your-jwt-token"
)
metadata = OpenMetadata(server_config)
```

```java
import org.openmetadata.client.OpenMetadataClientConfig;
import org.openmetadata.client.OpenMetadataClient;

OpenMetadataClientConfig config = new OpenMetadataClientConfig();
config.setOpenMetadataServerConfig("http://localhost:8585");
OpenMetadataClient client = new OpenMetadataClient(config);
```

```bash
# Test OpenMetadata API
curl -X GET "http://localhost:8585/api/v1/services/databaseServices" \
  -H "Authorization: Bearer your-jwt-token"
```

</CodeWithLanguageSelector>

## What's Next?

<InlineCalloutContainer>
  <InlineCallout
    icon="settings"
    bold="Configure Connectors"
    href="/docs/connectors"
  >
    Connect your data sources to start ingesting metadata.
  </InlineCallout>
  
  <InlineCallout
    icon="group"
    bold="Set Up Teams"
    href="/docs/how-to-guides"
  >
    Create teams and assign ownership to your data assets.
  </InlineCallout>
  
  <InlineCallout
    icon="analytics"
    bold="Explore Features"
    href="/docs/features"
  >
    Discover all the powerful features OpenMetadata offers.
  </InlineCallout>
</InlineCalloutContainer>