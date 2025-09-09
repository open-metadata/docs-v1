---
title: OpenMetadata MCP Server Connection Guide
slug: /how-to-guides/mcp/connect
---

# MCP Server Connection Guide

{% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} provides a Model Context Protocol (MCP) server that allows AI assistants and other clients to interact with your metadata catalog. The MCP server exposes tools for searching metadata, managing glossaries, and working with lineage data. Please check out our guides for [Claude](./how-to-guides/mcp/claude) and [Goose](./how-to-guides/mcp/goose) if you are using them as AI assistants.

## Server Information

- **Server Name**: `openmetadata-mcp-stateless`
- **Version**: `0.11.2`
- **Endpoint**: `{OMURL}/mcp`
- **Protocol**: Server-Sent Events (SSE) over HTTP
- **Authentication**: JWT Bearer Token

## Connection Setup

### 1. Server URL
Your MCP server is available at:
```
{OMURL}/mcp
```

Replace `{OMURL}` with your {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} instance URL (e.g., `https://your-openmetadata.com/mcp`)

### 2. Authentication
The MCP server requires [JWT authentication](./how-to-guides/mcp#adding-a-personal-access-token-to-your-mcp-client). Include your token in the Authorization header:
```http
Authorization: Bearer <your-jwt-token>
```

### 3. Content Type
All requests should use:
```http
Content-Type: application/json
```

## API Endpoints

### Initialize Connection
**Endpoint**: `POST {OMURL}/mcp`

**Sample Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": {},
      "prompts": {},
      "resources": {
        "subscribe": true,
        "listChanged": true
      }
    },
    "clientInfo": {
      "name": "your-client",
      "version": "1.0.0"
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": true,
      "prompts": true,
      "resources": {
        "subscribe": true,
        "listChanged": true
      },
      "logging": {}
    },
    "serverInfo": {
      "name": "openmetadata-mcp-stateless",
      "version": "0.11.2"
    }
  }
}
```

### List Available Tools
**Endpoint**: `POST {OMURL}/mcp`

**Sample Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "search_metadata",
        "description": "Find your data and business terms in OpenMetadata. For example if the user asks to 'find tables that contain customers information', then 'customers' should be the query, and the entity_type should be 'table'. Here make sure to use 'Href' is available in result to create a hyperlink to the entity in OpenMetadata.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Keywords to use for searching."
            },
            "entity_type": {
              "type": "string",
              "description": "Optional entity type to filter results..."
            },
            "limit": {
              "type": "integer",
              "description": "Maximum number of results to return. Default is 10."
            },
            "fields": {
              "type": "string",
              "description": "Comma-separated list of additional fields to include..."
            }
          },
          "required": ["query"]
        }
      },
      {
        "name": "get_entity_details",
        "description": "Get detailed information about a specific entity",
        "inputSchema": {
          "type": "object",
          "properties": {
            "entity_type": {
              "type": "string",
              "description": "Type of entity"
            },
            "fqn": {
              "type": "string",
              "description": "Fully qualified name of the entity"
            }
          },
          "required": ["entity_type", "fqn"]
        }
      }
    ]
  }
}
```

### List Available Prompts
**Endpoint**: `POST {OMURL}/mcp`

**Sample Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "prompts/list"
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "prompts": [
      {
        "name": "create-greeting",
        "description": "Generate a customized greeting message",
        "arguments": [
          {
            "name": "name",
            "description": "Name of the person to greet",
            "required": true
          },
          {
            "name": "style",
            "description": "The style of greeting, such a formal, excited, or casual. If not specified casual will be used"
          }
        ]
      },
      {
        "name": "search_metadata",
        "description": "Creates a prompt for Searching metadata in OpenMetadata.",
        "arguments": [
          {
            "name": "query",
            "description": "Keywords to use for searching.",
            "required": true
          },
          {
            "name": "entity_type",
            "description": "Entity Type to Filter Report."
          },
          {
            "name": "limit",
            "description": "Maximum number of results to return. Default is 10."
          }
        ]
      }
    ]
  }
}
```

### Call a Tool
**Endpoint**: `POST {OMURL}/mcp`

**Sample Request** (Search Metadata):
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "search_metadata",
    "arguments": {
      "query": "customer",
      "entity_type": "table",
      "limit": 5
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 3 results matching your search:\n\n1. **customer_orders** (Table)\n   - Description: Table containing customer order information\n   - Service: mysql_prod\n   - Database: ecommerce\n   - Schema: public\n   - [View in OpenMetadata](https://your-openmetadata.com/table/mysql_prod.ecommerce.public.customer_orders)\n\n2. **customer_profiles** (Table)\n   - Description: Customer profile and demographic data\n   - Service: postgresql_analytics\n   - Database: crm\n   - Schema: main\n   - [View in OpenMetadata](https://your-openmetadata.com/table/postgresql_analytics.crm.main.customer_profiles)\n\n3. **customer_events** (Table)\n   - Description: Customer interaction and event tracking\n   - Service: clickhouse_events\n   - Database: analytics\n   - Schema: events\n   - [View in OpenMetadata](https://your-openmetadata.com/table/clickhouse_events.analytics.events.customer_events)"
        }
      }
    ]
  }
}
```

### Get a Prompt
**Endpoint**: `POST {OMURL}/mcp`

**Sample Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "prompts/get",
  "params": {
    "name": "search_metadata",
    "arguments": {
      "query": "customer tables",
      "entity_type": "table",
      "limit": "10"
    }
  }
}
```

**Sample Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "description": "Creates a prompt for Searching metadata in OpenMetadata.",
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "Search for tables related to 'customer tables' in the OpenMetadata catalog. Filter results to show only 'table' entities and limit to 10 results. Look for tables that contain customer information, customer data, or are related to customer operations."
        }
      }
    ]
  }
}
```

## Error Handling

### Authentication Error
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32002,
    "message": "Authentication required",
    "data": {
      "type": "authentication_error"
    }
  }
}
```

### Invalid Tool Error
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32601,
    "message": "Tool not found: invalid_tool_name",
    "data": {
      "type": "tool_error"
    }
  }
}
```

### Validation Error
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "error": {
    "code": -32602,
    "message": "Invalid parameters: missing required field 'query'",
    "data": {
      "type": "validation_error",
      "field": "query"
    }
  }
}
```

## Best Practices

1. **Always authenticate**: Include the JWT token in every request
2. **Handle errors gracefully**: Check for error responses and handle them appropriately
3. **Use appropriate limits**: Don't request too many results at once to avoid performance issues
4. **Cache server capabilities**: Store the results of the initialize call to avoid repeated requests
5. **Use specific entity types**: When possible, specify entity_type to get more relevant results

## Security Considerations

- JWT tokens should be kept secure and not logged
- Use HTTPS for all communications
- Implement token refresh logic for long-running connections
- Follow your organization's security policies for API access

For more sample use cases with MCP please check out {% ossContent %}[our blog](https://blog.open-metadata.org/mcp-sample-uses-in-collate-0c195c7f5741){% /ossContent %}{% collateContent %}[our blog](https://collatedata.medium.com/mcp-sample-uses-in-collate-b7846864f63b){% /collateContent %}!

### Reach out on Slack!
With MCP, we are finding new ways to use {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} all the time! Now that you have Claude and {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} configured to work together, think you've got a great new use case? Show us what you've got in [Slack](https://slack.open-metadata.org/)!

