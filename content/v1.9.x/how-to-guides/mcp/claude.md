---
title: Getting Started with Claude Desktop
description: Set up MCP Server to connect Claude Desktop, generate tokens, and enable seamless AI-powered access to your data.
slug: /how-to-guides/mcp/claude
---

# Getting Started with Claude Desktop

Configure {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}'s MCP Server to interact with Anthropic's AI assistant platform.

## Prerequisites
For this guide, you will need:

- [nvm](https://github.com/nvm-sh/nvm) and npx/node version 22
- OpenMetadata v1.8.0 or later - You can upgrade your version of {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} with [this guide](https://docs.open-metadata.org/latest/deployment/upgrade)
- [Claude Desktop](https://claude.ai/download)
- {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} [MCP Application and Personal Access Token](https://docs.open-metadata.org/v1.9.x/how-to-guides/mcp#installing-mcp-server)

## Adding your {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} MCP Server to Claude Desktop
This how-to guide uses the free version of Claude Desktop for macOS with Sonnet 4.

- Navigate to Claude Desktop's Settings, then select *Developer* and *Edit Config*. Paste the following into `claude_desktop_config.json`

```
{"mcpServers": {
    "openmetadata": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "<YOUR-OpenMetadata-SERVER>/mcp",
        "--auth-server-url=<YOUR-OpenMetadata-SERVER>/mcp",
        "--client-id=openmetadata",
        "--verbose",
        "--clean",
        "--header",
        "Authorization:${AUTH_HEADER}"
      ],
      "env": {
        "AUTH_HEADER": "Bearer <YOUR-OpenMetadata-PAT>"
      }
    }
  }
}
```

- Restart Claude Desktop. You should see your `openmetadata` service running

{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/claude-settings.jpg"
alt="Claude Settings"
caption="OpenMetadata MCP Server running in Claude Desktop"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/claude-settings.jpg"
alt="Claude Settings"
caption="Collate MCP Server running in Claude Desktop"
/%}
{% /collateContent %}

## Prompt to read from {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}
This part of the guide assumes that you have assets in {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} that Claude can read, and that some of your data assets have references to customers. You can change the prompt accordingly and/or add data sources into OpenMetadata [here](https://docs.open-metadata.org/latest/connectors).

Past the following prompt into Claude to have it read from {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}:
```
Imagine you're a data analyst tasked with building a customer retention dashboard. Can you help me identify which tables or datasets in the openmetadata database might contain relevant information?
```

Claude will ask if it can use the external integration {% collateContent %}`Collate`{% /collateContent %}{% ossContent %}`OpenMetadata`{% /ossContent %}, select *Allow always*. You may have to do this multiple times, once for each tool. Claude is now reading from {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} via its MCP Server!

{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/claude-allow.jpg"
alt="Allow Claude to use OpenMetadata"
caption="Claude asking for permission to search OpenMetadata"
/%}
{% /ossContent %}
{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/claude-allow.jpg"
alt="Allow Claude to use Collate"
caption="Claude asking for permission to search Collate"
/%}
{% /collateContent %}

For more sample use cases with MCP please check out {% ossContent %}[our blog](https://blog.open-metadata.org/mcp-sample-uses-in-collate-0c195c7f5741){% /ossContent %}{% collateContent %}[our blog](https://collatedata.medium.com/mcp-sample-uses-in-collate-b7846864f63b){% /collateContent %}!

### Reach out on Slack!
With MCP, we are finding new ways to use {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} all the time! Now that you have Claude and {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} configured to work together, think you've got a great new use case? Show us what you've got in [Slack](https://slack.open-metadata.org/)!

