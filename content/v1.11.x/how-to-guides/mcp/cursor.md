---
title: Getting Started with Cursor
description: Connect Cursor IDE to OpenMetadata via MCP for AI-powered metadata exploration.
slug: /how-to-guides/mcp/cursor
---

# Getting Started with Cursor

Connect your OpenMetadata instance to Cursor IDE for AI-powered metadata exploration.

## Prerequisites

Before you begin, ensure you have:

1. **OpenMetadata v1.8.0+** running (e.g., `http://localhost:8585`)
2. **MCP Application** installed in OpenMetadata
   - Navigate to `<YOUR-OpenMetadata-SERVER>/marketplace/apps/`
   - Install **McpApplication** if it is not already installed
3. **[MCP Application and Personal Access Token](../authentication/bot-token-mcp.md)** - Follow this guide to generate your PAT
4. **Cursor IDE** installed with MCP support

## Configure Cursor MCP Server

Cursor locates the MCP configuration file at:

**macOS/Linux:**
```bash
~/.cursor/mcp.json
```

**Windows:**
```bash
%APPDATA%\Cursor\mcp.json
```

Create the `.cursor` directory if it does not exist, then create the configuration file:

```json
{
  "mcpServers": {
    "OpenMetadata": {
      "url": "<YOUR-OpenMetadata-SERVER>/mcp",
      "protocol": "sse",
      "headers": {
        "Authorization": "Bearer <YOUR-OpenMetadata-PAT>"
      }
    }
  }
}
```

Replace `<YOUR-OpenMetadata-SERVER>` with your server URL and `<YOUR-OpenMetadata-PAT>` with your Personal Access Token from the Prerequisites step.

{% image
src="/images/v1.11/how-to-guides/mcp/cursor-config-file.png"
alt="Cursor MCP Configuration File"
caption="Cursor MCP Configuration File"
/%}

> **Project-Specific Configuration**: You can also create `.cursor/mcp.json` in your project root directory. Project-specific configuration takes precedence over the global configuration.

## Restart Cursor

Save the configuration file and restart Cursor completely to load the MCP server:
- **macOS**: `Cmd+Q` or Cursor → Quit Cursor
- **Windows/Linux**: Close all Cursor windows and reopen

{% image
src="/images/v1.11/how-to-guides/mcp/cursor-connected.png"
alt="Cursor MCP Server Connected"
caption="Cursor MCP Server Connected"
/%}

## Try It Out

Once Cursor restarts, test your connection by asking questions in Cursor's chat:

> "Imagine you're a data analyst tasked with building a customer retention dashboard. You need tables that track customer transactions, engagement metrics, and churn indicators. Find relevant customer and transaction tables in the metadata catalog."

You should see Cursor using the OpenMetadata MCP tools to search and retrieve information from your metadata catalog.

## Troubleshooting

If you encounter connection issues:

1. **Verify OpenMetadata is running**: `curl <YOUR-OpenMetadata-SERVER>/api/health`
2. **Check MCP endpoint**: `curl <YOUR-OpenMetadata-SERVER>/mcp` (should return 401 Unauthorized)
3. **Verify MCP Application is installed**: Visit `<YOUR-OpenMetadata-SERVER>/marketplace/apps/McpApplication`
4. **Check configuration file syntax**: Ensure JSON is valid and file path is correct
5. **Token expired**: [Generate a new PAT](../authentication/bot-token-mcp.md) and update your configuration
6. **Restart Cursor** after making configuration changes

## Additional Resources

- [OpenMetadata MCP Documentation](https://docs.open-metadata.org/latest/how-to-guides/mcp)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [Cursor Documentation](https://docs.cursor.com)
