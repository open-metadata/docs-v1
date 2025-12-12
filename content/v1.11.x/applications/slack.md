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

1. **Create and configure a Slack app** on [api.slack.com/apps](https://api.slack.com/apps) using the app manifest method
2. **Configure the integration** in your Collate instance (getcollate.io) using the credentials from your Slack app

This guide will walk you through both steps in order.

## Required Permissions

When you install AskCollate, the app will request the following permissions in your Slack workspace:

- **Message Access**: View and respond to messages that mention `@AskCollate` in public channels, direct messages, and group conversations
- **Channel Access**: Join public channels, view channel information, and access message history
- **User Information**: View user profiles to personalize responses and notifications
- **Messaging**: Send messages as `@AskCollate` to any channel or user
- **Commands**: Register and respond to slash commands (e.g., `/find`, `/asset`)
- **Interactive Components**: Handle button clicks, menu selections, and other interactive elements

These permissions enable AskCollate to provide seamless data collaboration features while maintaining security and privacy within your workspace.

## Step 1: Create and Configure Your Slack App

**Platform: [api.slack.com/apps](https://api.slack.com/apps)**

In this step, you'll create a Slack app using a pre-configured manifest, install it to your workspace, and obtain the necessary credentials.

### Create a Slack App

1. Go to the [Slack API: Your Apps](https://api.slack.com/apps) page.

{% image
src="/images/v1.11/applications/slack-apps-page.png"
alt="Slack API Apps page"
caption="Slack API: Your Apps page"
/%}

2. Click **Create New App**.
3. Select **From manifest**.

{% image
src="/images/v1.11/applications/choose-manifest.png"
alt="Configuration"
caption="Configuration"
/%}

4. Choose your **Slack workspace** and click **Next**.

{% image
src="/images/v1.11/applications/choose-workspace.png"
alt="Choose workspace"
caption="Select your Slack workspace"
/%}

5. Paste the manifest JSON below (remember to replace `<your-instance>` with your actual Collate instance name).

{% image
src="/images/v1.11/applications/paste-json.png"
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
        "users:read",
        "channels:history",
        "users:read.email",
        "groups:history"
      ]
    }
  },
  "settings": {
    "event_subscriptions": {
      "request_url": "https://<your-instance>.getcollate.io/api/slack/events",
      "bot_events": [
        "app_home_opened",
        "app_mention"
      ]
    },
    "interactivity": {
      "is_enabled": true,
      "request_url": "https://<your-instance>.getcollate.io/api/slack/events"
    },
    "org_deploy_enabled": false,
    "socket_mode_enabled": false,
    "token_rotation_enabled": false
  }
}
```

{% note %}

Replace `<your-instance>` with your Collate instance name. For example, if your Collate URL is `https://acme.getcollate.io`, use `https://acme.getcollate.io/api/slack/events`.

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

### Install the App to Workspace

1. In the left-hand menu, navigate to **Install App**.

{% image
src="/images/v1.11/applications/install-app-menu-click.png"
alt="Navigate to Install App"
caption="Click Install App in the left sidebar"
/%}

2. Click **Install to Workspace** to install the app to your Slack workspace.

{% image
src="/images/v1.11/applications/install-to-workspace.png"
alt="Install to Workspace button"
caption="Click Install to Workspace"
/%}

3. Authorize the permissions requested by the app.

{% image
src="/images/v1.11/applications/authorize-permissions.png"
alt="Authorize permissions"
caption="Review and authorize the requested permissions"
/%}

After installation, you'll be redirected back to the Install App page where you will see the User and Bot Tokens.

{% image
src="/images/v1.11/applications/tokens-displayed.png"
alt="Tokens displayed after installation"
caption="User and Bot tokens are displayed after successful installation"
/%}

### Copy the Credentials and Tokens

1. Copy the following credentials and tokens from your Slack app:

- **Client ID, Client Secret, and Signing Secret**: Available on the **Basic Information** page
- **Bot User OAuth Token**: Starts with `xoxb-...` (displayed on the **Install App** page after installation)
- **User OAuth Token**: Starts with `xoxp-...` (displayed on the **Install App** page after installation)

Store these tokens securely - you'll need them in Step 2 to configure the integration in Collate, check image below.

{% image
src="/images/v1.11/applications/tokens-displayed.png"
alt="Tokens displayed after installation"
caption="Update Token Details"
/%}

{% note %}

- Never expose your tokens publicly.
- Rotate tokens periodically.
- Use Slack's [token rotation policy](https://api.slack.com/authentication/token-types#rotating) for better security.

{% /note %}

## Step 2: Configure Slack Integration in Collate

**Platform: getcollate.io**

Now that you have created your Slack app and obtained the credentials, you'll configure the integration in your Collate instance.

### Add Slack Application

1. Log in to your Collate instance at `https://<your-instance>.getcollate.io`.
2. Navigate to **Settings** → **Applications** → **Add Apps**.

{% image
src="/images/v1.11/applications/slack1.png"
alt="Navigate to Applications"
caption="Navigate to Settings → Applications → Add Apps"
/%}

3. Search for **Slack** and install the application.

{% image
src="/images/v1.11/applications/slack2.png"
alt="Install Slack Application"
caption="Search for Slack and click Install"
/%}

### Configure Credentials

4. Provide the credentials you copied from your Slack app in Step 1:

- **Client ID**: Unique identifier for your Slack application (from Basic Information page)
- **Client Secret**: Secret key used to authenticate your application (from Basic Information page)
- **Signing Secret**: Used to verify that requests are coming from Slack (from Basic Information page)
- **Bot Token**: OAuth token for bot operations, starts with `xoxb-` (from Install App page)
- **User Token**: OAuth token for user-level operations, starts with `xoxp-` (from Install App page)

{% image
src="/images/v1.11/applications/provide-credentials.png"
alt="Enter Slack Credentials"
caption="Enter the credentials from your Slack app"
/%}

5. Click **Save** to complete the configuration.

{% note %}

Ensure that both tokens are securely stored and have the required scopes for interaction with your Slack workspace.

{% /note %}

---

## Step 3: Verify Event Subscriptions

1. Navigate to **Event Subscriptions** in the left-hand menu.
2. Verify that the Request URL shows a green checkmark indicating successful verification.

{% image
src="/images/v1.11/applications/event-subscriptions-verified.png"
alt="Event Subscriptions Verified"
caption="Event Subscriptions should show verification success"
/%}

{% note %}

If the Request URL shows a verification error, contact Collate Support for assistance.

{% /note %}

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
