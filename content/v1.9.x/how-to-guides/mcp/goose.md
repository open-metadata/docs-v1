---
title: Getting Started with Goose Desktop
description: Learn how to connect Goose Desktop with MCP Server, create tokens, and enable secure AI-powered access to your data platform.
slug: /how-to-guides/mcp/goose
---

# Getting Started with Goose Desktop

Configure {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}'s MCP Server to interact with block's AI agent [Goose](https://github.com/block/goose).

## Prerequisites
For this guide, you will need:
- [nvm](https://github.com/nvm-sh/nvm) and npx/node version 22
- {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} v1.8.0 or later- You can upgrade your version of {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} with [this guide](https://docs.open-metadata.org/latest/deployment/upgrade)
- [Goose Desktop](https://block.github.io/goose/docs/quickstart/)
- {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} [MCP Application and Personal Access Token](https://docs.open-metadata.org/v1.9.x/how-to-guides/mcp#installing-mcp-server)

## Adding your {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} MCP Server to Goose Desktop
This how-to guide uses Goose Desktop for macOS. Make sure that you already have an [LLM Provider configured](https://block.github.io/goose/docs/quickstart/#configure-provider) before prompting.

- Navigate to Goose Desktop's Settings, then under *Extensions*, select *+Add custom extension*. 

{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-settings.jpg"
alt="Goose settings"
caption="Settings are where you add custom extensions like OpenMetadata MCP Server"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-settings.jpg"
alt="Goose settings"
caption="Settings are where you add custom extensions like Collate MCP Server"
/%}
{% /collateContent %}

- The custom extension should have the following information:
  - *Extension Name* {% collateContent %}`Collate`{% /collateContent %}{% ossContent %}`OpenMetadata`{% /ossContent %}
  - *Command* paste the following command:
    ```
    npx -y mcp-remote <YOUR_OpenMetadata_SERVER>/mcp --auth-server-url=<YOUR_OpenMetadata_SERVER>/mcp --client-id=openmetadata --verbose --clean --header Authorization:${AUTH_HEADER}
    ```
    - If you are running [it locally](https://docs.open-metadata.org/latest/quick-start/local-docker-deployment), your command will look like this:
      ```
      npx -y mcp-remote http://localhost:8585/mcp --auth-server-url=http://localhost:8585/mcp --client-id=openmetadata --verbose --clean --header Authorization:${AUTH_HEADER}
      ```
  - Add 1 *Environment Variable*
    - *Variable name* is `AUTH_HEADER`
    - *Value* is "Bearer <YOUR_OpenMetadata_PAT>

{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-mcp-settings.jpg"
alt="Configuring OpenMetadata MCP Server"
caption="The proper settings for OpenMetadata MCP Server in Goose"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-mcp-settings.jpg"
alt="Configuring Collate MCP Server"
caption="The proper settings for Collate MCP Server in Goose"
/%}
{% /collateContent %}

    - Select *+Add* to store this Environment Variable
{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-mcp-settings.jpg"
alt="Configuring OpenMetadata MCP Server"
caption="The proper settings for OpenMetadata MCP Server in Goose"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-mcp-settings.jpg"
alt="Configuring Collate MCP Server"
caption="The proper settings for Collate MCP Server in Goose"
/%}
{% /collateContent %}

  - Select *Add Extension*
{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-add-extension.jpg"
alt="Adding extension"
caption="Adding OpenMetadata MCP Server as a custom extension to Goose"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-add-extension.jpg"
alt="Adding extension"
caption="Adding Collate MCP Server as a custom extension to Goose"
/%}
{% /collateContent %}

{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-success.jpg"
alt="OpenMetadata successfully added"
caption="OpenMetadata successfully added to Goose"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/goose-success.jpg"
alt="Collate successfully added"
caption="Collate successfully added to Goose"
/%}
{% /collateContent %}

## Prompt to read from {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}
This part of the guide assumes that you have assets in {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}. You can add data assets into {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} [here](https://docs.open-metadata.org/latest/connectors).

Select a model from Goose and paste the following prompt to have it read from {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}:
```
What tables do you have access to in OpenMetadata?
```

For more sample use cases with MCP please check out {% ossContent %}[our blog](https://blog.open-metadata.org/mcp-sample-uses-in-collate-0c195c7f5741){% /ossContent %}{% collateContent %}[our blog](https://collatedata.medium.com/mcp-sample-uses-in-collate-b7846864f63b){% /collateContent %}!

### Reach out on Slack!
With MCP, we are finding new ways to use {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} all the time! Now that you have Claude and {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} configured to work together, think you've got a great new use case? Show us what you've got in [Slack](https://slack.open-metadata.org/)!

