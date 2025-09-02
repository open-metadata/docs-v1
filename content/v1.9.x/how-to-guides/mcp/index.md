---
title: Data Discovery
slug: /how-to-guides/mcp
---

# Overview of MCP

{% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}'s MCP Server gives technical or non-technical users the ability to interact with your organization's metadata through natural language conversations via systems such as ChatGPT or Claude.

## What is MCP?
The Model Context Protocol (MCP) is an emerging open standard (spearheaded by Anthropic and embraced by many industry leaders) that helps AI systems interact with external tools and data in a uniform, secure way. MCP works as a “universal translator” between AI assistants (or any LLM-driven application) and the myriad of systems where data and knowledge reside. Instead of building one-off integrations or brittle scripts for each data source, MCP provides a common interface.

In technical terms, MCP lets systems expose their capabilities — the data they hold and the actions they can perform — in a machine-readable schema that AI models can understand. For example, through MCP a data platform could advertise tools (functions an AI can call, like lookup_customer_by_email), resources (datasets or knowledge bases an AI can query), or even prompt templates that guide interactions. An AI assistant connected via MCP can then securely retrieve information or trigger actions by invoking these standardized functions, with proper authorization.

For organizations, MCP promises to bridge the gap between powerful AI reasoning and real-world data context. With a single, consistent protocol, an AI assistant can maintain awareness of business-specific context as it moves between different tools and datasets. Just as HTTP standardized how clients talk to servers, MCP is standardizing how AI models connect with data sources. It’s a simpler, more scalable way to give AI access to the knowledge it needs to produce relevant, accurate results.

## Adding an MCP Server to {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}
Even the best LLMs need context in order to operate effectively. We added an MCP Server to {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} to unlock a new level of value from its unified knowledge graph. By embedding an MCP server directly into {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}, the platform can now expose rich metadata context to AI assistants and other MCP clients in real time. This means an AI tool like ChatGPT or Claude can query OpenMetadata to ask such questions as, “What is the definition of this metric?”, “Show me the lineage of data feeding this dashboard”, or “Who is the owner of this dataset and when was it last updated?” — and get answers based on live organizational metadata.

All the relationships and context captured in {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}’s graph become available to augment AI-driven analyses and automations. What makes this particularly powerful is that {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}’s implementation of MCP is enterprise-ready by design.

{%  youtube videoId="AuYBaXC8-M4" start="0:00" end="23:05" width="800px" height="450px" /%}

## Installing MCP Server
MCP is an {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} application that is installed by default, if it is not downloaded:

- Go to <YOUR-OpenMetadata-SERVER>/marketplace/apps/McpApplication and select *Install*

{% ossContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/install-mcp.jpg"
alt="Add MCP app"
caption="Install MCP Server on OpenMetadata"
/%}
{% /ossContent %}

{% collateContent %}
{% image
src="/images/v1.9/how-to-guides/mcp/install-mcp.jpg"
alt="Add MCP app"
caption="Install MCP Server on Collate"
/%}
{% /collateContent %}

## Adding a Personal Access Token to your MCP Client
MCP Clients like Claude and Goose will need a {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} Personal Access Client (PAT) to authenticate with the {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} MCP Server. 

- Go to <YOUR-OpenMetadata-SERVER>/users/<YOUR-USERNAME>/access-token and select *Generate New Token*. This will give your AI agent the same role and access policy that is assign to you in {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}, if you would like it to have different role-based access controls, create a new user.

{% image
src="/images/v1.9/how-to-guides/mcp/generate-new-token.jpg"
alt="Generate New Token"
caption="Creating a new Personal Access Token"
/%}

- Set your *Token Expiration*. Once your new token is created copy it.

{% image
src="/images/v1.9/how-to-guides/mcp/generate-new-token-2.jpg"
alt="Set Token Lifespan"
caption="Personal Access Token expires in 60 days"
/%}

With MCP installed and a Personal Access Token created, you can connect {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} MCP Server to an MCP Client like Claude, Goose, or an API service. Choose your MCP Client below to start prompting with {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %}!

{%inlineCalloutContainer%}
 {%inlineCallout
  color="violet-70"
  bold="OpenMetadata MCP Server Connection Guide"
  icon="MdSearch"
  href="/how-to-guides/mcp/connect"%}
  Connect to your MCP Server.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="OpenMetadata MCP Tools Reference"
  icon="MdSearch"
  href="/how-to-guides/mcp/reference"%}
  Detailed examples and usage patterns for all available OpenMetadata MCP tools.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Getting Started with Claude Desktop"
  icon="MdSearch"
  href="/how-to-guides/mcp/claude"%}
  Connect your {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} to Anthropic's popular AI assistant.
 {%/inlineCallout%}
 {%inlineCallout
  color="violet-70"
  bold="Getting Started with Goose"
  icon="MdSearch"
  href="/how-to-guides/mcp/goose"%}
  Connect your {% collateContent %}Collate{% /collateContent %}{% ossContent %}OpenMetadata{% /ossContent %} to Block's Open-Source AI assistant.
 {%/inlineCallout%}
{%/inlineCalloutContainer%}

