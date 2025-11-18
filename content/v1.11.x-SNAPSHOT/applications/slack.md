---
title: Slack Integration with Collate for Data Collaboration
description: Integrate Collate with Slack to enable real-time data collaboration, search assets, receive notifications, and share metadata insights directly in Slack.
slug: /applications/slack
collate: true
---

# Slack Integration with AskCollate

{% youtube videoId="IVxnitE23GM" start="0:00" end="1:45" width="800px" height="450px" /%}

Connect Collate with your Slack workspace to enable seamless data collaboration and streamline team workflows. With the AskCollate Slack application, your team can search metadata assets, receive real-time notifications, share data insights, and interact with your data catalog—all without leaving Slack.

## What You Can Do

The AskCollate Slack application brings powerful data collaboration features to your workspace:

- **Real-Time Notifications**: Receive instant alerts for mentions, task assignments, and data asset updates directly in Slack channels
- **In-Slack Search**: Quickly find glossaries, terms, tags, and tables without switching to the Collate UI
- **Easy Asset Sharing**: Share metadata assets and data insights with your team in any Slack conversation
- **AI-Powered Assistance**: Chat with AskCollate AI to query your metadata using natural language (available with AskCollate Add-on)
- **Slash Commands**: Use convenient commands like `/find` and `/asset` to access data quickly

## Setup Overview

Setting up the Slack integration involves two main steps:

1. **Create and configure a Slack app** in your Slack workspace with the necessary permissions and credentials
2. **Configure the integration** in Collate using the credentials from your Slack app

This guide provides two approaches to create your Slack app:
- **From scratch**: Step-by-step manual configuration (recommended for learning or custom setups)
- **From manifest**: Quick setup using a pre-configured JSON manifest (recommended for faster deployment)

## Required Permissions

When you install AskCollate, the app will request the following permissions in your Slack workspace:

- **Message Access**: View and respond to messages that mention `@AskCollate` in public channels, direct messages, and group conversations
- **Channel Access**: Join public channels, view channel information, and access message history
- **User Information**: View user profiles to personalize responses and notifications
- **Messaging**: Send messages as `@AskCollate` to any channel or user
- **Commands**: Register and respond to slash commands (e.g., `/find`, `/asset`)
- **Interactive Components**: Handle button clicks, menu selections, and other interactive elements

These permissions enable AskCollate to provide seamless data collaboration features while maintaining security and privacy within your workspace.

## Slack App Configuration

To enable Slack integration in Collate:

1. Navigate to **Settings** → **Applications** → **Add Apps**.

{% image
src="/images/v1.11/applications/slack1.png"
alt="Configuration"
caption="Configuration"
/%}

2. Search for **Slack** and install the application.

{% image
src="/images/v1.11/applications/slack2.png"
alt="Configuration"
caption="Configuration"
/%}

### Configuration Fields

Provide the following credentials from your Slack app:

- **Client ID**: Unique identifier for your Slack application (found in Basic Information)
- **Client Secret**: Secret key used to authenticate your application (found in Basic Information)
- **Signing Secret**: Used to verify that requests are coming from Slack (found in Basic Information)
- **Bot Token**: OAuth token for bot operations, starts with `xoxb-` (found in OAuth & Permissions)
- **User Token**: OAuth token for user-level operations, starts with `xoxp-` (found in OAuth & Permissions)

{% image
src="/images/v1.11/applications/slack3.png"
alt="Configuration"
caption="Configuration"
/%}

{% note %}

Ensure that both tokens are securely stored and have the required scopes for interaction with your Slack workspace.

{% /note %}

---

## Creating Your Slack App

To integrate Slack with Collate, you'll need to create a Slack application and obtain the necessary credentials (Client ID, Client Secret, Signing Secret, Bot Token, and User Token). Choose one of the following methods:

## Method 1: Create App From Scratch

Follow these detailed steps to manually configure your Slack app with all necessary permissions and settings.

### Create a Slack App

1. Go to the [Slack API: Your Apps](https://api.slack.com/apps) page.
2. Click **Create New App**.

{% image
src="/images/v1.11/applications/slack4.png"
alt="Configuration"
caption="Configuration"
/%}

3. Select **From scratch**.

{% image
src="/images/v1.11/applications/slack5.png"
alt="Configuration"
caption="Configuration"
/%}

4. Enter the **App Name** (e.g., `Collate Integration`) and choose your **Slack workspace**.
5. Click **Create App**.

{% image
src="/images/v1.11/applications/slack6.png"
alt="Configuration"
caption="Configuration"
/%}

6. After your app is created, you'll be redirected to the Basic Information page under Settings.
   Here, you'll find the following important credentials:

- Client ID – Used to identify your app.
- Client Secret – Used for authenticating requests made from your app.
- Signing Secret – Used to verify that incoming requests (e.g., from Slack) are genuinely from Slack.

  Click Show next to each secret if you need to view the values. You can also regenerate them if needed using the Regenerate button, and after that you can share it with Collate Team.

Make sure to store these securely, as you'll need them to configure OAuth and validate request signatures later.

{% image
src="/images/v1.11/applications/slack-basic.png"
alt="Basic Information page"
caption="Basic Information page"
/%}

### Configure OAuth & Permissions

1. In your app’s dashboard, navigate to **OAuth & Permissions**.

{% image
src="/images/v1.11/applications/slack7.png"
alt="Configuration"
caption="Configuration"
/%}

2. Under **Scopes**, configure the following:

{% image
src="/images/v1.11/applications/slack8.png"
alt="Configuration"
caption="Configuration"
/%}

#### For **Bot Token Scopes**:
Add these scopes:
- `chat:write`
- `groups:read`
- `im:read`
- `mpim:read`
- `users:read`
- `commands`
- `app_mentions:read`
- `channels:read`
- `files:read`
- `im:history`
- `channels:history`
- `im:write`
- `users:read.email`
- `groups:history`

#### For **User Token Scopes**:
Add these scopes:
- `channels:read`
- `users:read`
- `chat:write`

{% note %}

Only add the scopes you need. Ensure your Slack workspace allows user token generation (may require admin privileges).

{% /note %}

### Configure Redirect URLs

Before installing the app to your workspace, configure the redirect URLs to ensure successful OAuth authentication:
1. In the left-hand menu, go to **OAuth & Permissions**.
2. Scroll down to the **Redirect URLs** section.
3. Click **Add New Redirect URL** and enter the redirect URL, e.g., https://sandbox.open-metadata.org/api/slack/callback.
4. Click **Save URLs** to apply the changes.

The redirect URL must exactly match the URL used in your OAuth request.  
This ensures Slack can return the authorization code to your backend after the user grants permissions.

{% image
src="/images/v1.11/applications/slack-redirect.png"
alt="Configure Redirect URLs"
caption="Configure Redirect URLs"
/%}

### Configure Event Subscriptions

After setting the necessary OAuth scopes, follow the steps below to configure **Event Subscriptions**:

1. In the left-hand menu under Features, click on Event Subscriptions.

2. Toggle the Enable Events switch to On.

{% image
src="/images/v1.11/applications/enable-events.png"
alt="Enable Events"
caption="Enable Events"
/%}

3. In the Request URL field, enter your app’s endpoint (e.g., https://sandbox.open-metadata.org/api/slack/events).

    - Slack will send a verification request containing a challenge parameter.
    - Ensure your endpoint responds with the challenge value to confirm validation.

4. Scroll down to the Subscribe to bot events section and click **Add Bot User Event**.

{% image
src="/images/v1.11/applications/bot-events.png"
alt="Subscribe to bot events"
caption="Subscribe to bot events"
/%}

- Add the following events (ensure corresponding scopes are already granted under OAuth permissions):

    - app_home_opened – Triggered when a user clicks into your App Home (no additional scope needed).
    - app_mention – Subscribes to messages that mention your app or bot (app_mentions:read scope required).
    - message.im – Subscribes to messages in direct message channels (im:history scope required).
    - message.mpim – Subscribes to messages in multi-party direct message channels (mpim:history scope required).

{% image
src="/images/v1.11/applications/slack10.png"
alt="Subscribe to bot events"
caption="Subscribe to bot events"
/%}


5. (Optional) Under **Subscribe to events on behalf of users**, click **Add Workspace Event** and select:

    - message.im – Subscribes to messages posted in a direct message channel on behalf of users (im:history scope required).

Slack automatically adds the necessary scopes for any subscribed events if not already included.

{% image
src="/images/v1.11/applications/subscribe-events.png"
alt="Subscribe to events on behalf of users"
caption="Subscribe to events on behalf of users"
/%}

### Configure Slash Commands

To enable users to interact with your app via custom commands in Slack:

1. In the left-hand menu under **Features**, click on **Slash Commands**.
2. Click **Create New Command** to define a new command, or edit an existing one.

{% image
src="/images/v1.11/applications/create-command.png"
alt="Create Edit New Command"
caption="Create Edit New Command"
/%}

#### Example Slash Commands

| Command | Description | Request URL | Usage Hint |
|---------|-------------|-------------|-------------|
| `/find` | Find the asset | `https://sandbox.open-metadata.org/api/slack/command/find` | `query or entityType query` |
| `/asset` | Fetch data for a specific asset | `https://sandbox.open-metadata.org/api/slack/command/asset` | `entityType fqn/id` |

{% image
src="/images/v1.11/applications/slash-commands.png"
alt="Slash Commands"
caption="Slash Commands"
/%}

For each command:

- **Command**: Keyword users will type (e.g., `/find`).
- **Request URL**: The backend endpoint that processes the command.
- **Short Description**: What the command does.
- **Usage Hint**: Shows users how to pass parameters.
- *(Optional)* Enable **Escape channels, users, and links** if you want Slack to escape mentions and links.

    - Once created, the commands will appear in Slack's autocomplete suggestions when users start typing `/`.
    - Authorize the permissions requested by the app.

### Install the App to Workspace

1. Still in **OAuth & Permissions**, click **Install** to install App to your Workspace.

{% image
src="/images/v1.11/applications/slack9.png"
alt="Configuration"
caption="Configuration"
/%}

2. Authorize the permissions requested by the app.

After installation, you'll be redirected to the OAuth screen where your tokens will be displayed.

### Copy the Credentials and Tokens

After installation, copy the following credentials from your Slack app:

- **Client ID, Client Secret, and Signing Secret**: Available on the Basic Information page
- **Bot User OAuth Token**: Starts with `xoxb-...` (found on OAuth & Permissions page)
- **User OAuth Token**: Starts with `xoxp-...` (found on OAuth & Permissions page)

Store these tokens securely and use them to configure the Slack integration in Collate.

{% note %}

- Never expose your tokens publicly.
- Rotate tokens periodically.
- Use Slack's [token rotation policy](https://api.slack.com/authentication/token-types#rotating) for better security.

{% /note %}


---

## Method 2: Create App From Manifest

Use a pre-configured JSON manifest for faster setup. This method automatically configures most settings, requiring minimal manual configuration.

### Create a Slack App

1. Go to the [Slack API: Your Apps](https://api.slack.com/apps) page.
2. Click **Create New App**.
3. Select **From manifest**.

{% image
src="/images/v1.11/applications/slack11.png"
alt="Configuration"
caption="Configuration"
/%}

4. Choose your **Slack workspace** and click 'Next'.
5. Use the below json as a reference and paste it in.

{% image
src="/images/v1.11/applications/slack12.png"
alt="Configuration"
caption="Configuration"
/%}

```json
{
    "display_information": {
        "name": "AskCollate",
        "description": "AI-powered data assistant for OpenMetadata",
        "background_color": "#2e3030",
        "long_description": "Connect OpenMetadata with Slack!\r\n\r\nCollate unlocks the value of your data with a unified Platform for data discovery, observability and governance.\r\n\r\nWith two of your most essential workspaces connected, you will receive notifications from Collate directly in Slack. Benefit from an improved discovery and collaboration process that enables you to:\r\n\r\n1. *Search Entities*: Quickly search for glossaries, terms, tags, and tables directly within Slack.\r\n2. Notifications: Stay informed with real-time alerts. :bell:\r\n3. Share Assets: Seamlessly share OpenMetadata assets with your team. :link:"
    },
    "features": {
        "bot_user": {
            "display_name": "AskCollate",
            "always_online": false
        }
    },
    "oauth_config": {
        "scopes": {
            "user": [
                "channels:read",
                "users:read",
                "chat:write"
            ],
            "bot": [
                "app_mentions:read",
                "channels:read",
                "chat:write",
                "files:read",
                "im:history",
                "im:read",
                "users:read",
                "channels:history",
                "im:write",
                "users:read.email",
                "groups:history"
            ]
        }
    },
    "settings": {
        "event_subscriptions": {
            "request_url": "https://sandbox-beta.open-metadata.org/api/slack/events",
            "bot_events": [
                "app_mention",
                "message.channels",
                "message.groups",
                "message.im"
            ]
        },
        "interactivity": {
            "is_enabled": true,
            "request_url": "https://sandbox-beta.open-metadata.org/api/slack/events"
        },
        "org_deploy_enabled": false,
        "socket_mode_enabled": false,
        "token_rotation_enabled": false
    }
}
```

{% note %}

- Please update the request url in the above json to your server url.

{% /note %}

6. After your app is created, you'll be redirected to the Basic Information page under Settings.
   Here, you'll find the following important credentials:

- Client ID – Used to identify your app.
- Client Secret – Used for authenticating requests made from your app.
- Signing Secret – Used to verify that incoming requests (e.g., from Slack) are genuinely from Slack.

  Click Show next to each secret if you need to view the values. You can also regenerate them if needed using the Regenerate button, and after that you can share it with Collate Team.

Make sure to store these securely, as you'll need them to configure OAuth and validate request signatures later.

{% image
src="/images/v1.11/applications/slack-basic.png"
alt="Basic Information page"
caption="Basic Information page"
/%}

---

## Next Steps

After configuring your Slack app and adding the credentials to Collate:

1. **Test the integration**: Send a message mentioning `@AskCollate` in a Slack channel to verify the connection
2. **Try slash commands**: Use `/find` or `/asset` to search your metadata from Slack
3. **Configure notifications**: Set up which Collate notifications you want to receive in Slack
4. **Invite team members**: Add AskCollate to relevant channels where your team discusses data

## Additional Resources

- [Slack API Documentation](https://api.slack.com/)
- [Slack App Management Console](https://api.slack.com/apps)
- [OAuth Scopes Reference](https://api.slack.com/scopes)
