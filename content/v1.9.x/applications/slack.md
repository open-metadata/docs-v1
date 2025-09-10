---
title: Slack Integration with Collate for Data Collaboration
description: Integrate Collate with Slack to enable real-time data collaboration, search assets, receive notifications, and share metadata insights directly in Slack.
slug: /applications/slack
collate: true
---

# Slack Application in Collate

Integrate Collate with Slack to enhance data collaboration and streamline team workflows. This integration enables real-time notifications, in-Slack search and sharing of metadata assets, and message interactions—all within your existing Slack workspace.

## Overview

The Slack application connects your Slack workspace with Collate, enabling seamless communication and metadata access:

- **Real-Time Notifications**: Receive instant alerts, mentions, and updates directly in Slack.
- **Metadata Search**: Quickly search for glossaries, terms, tags, and tables within Slack.
- **Asset Sharing**: Share Collate assets effortlessly with your team from Slack.
- **Enhanced Productivity**: Stay informed and connected without leaving your workspace.

## Key Capabilities

- **Search Entities**: Use Slack to search glossaries, terms, tags, and tables.
- **Share Assets**: Share metadata assets from Collate to your team directly in Slack.
- **Notifications**: Get notified when someone mentions `@collate2`, or when updates occur in your data workspace.

## Authorizations

When connected, Collate will have the following permissions in Slack:

- View and respond to messages that mention `@collate2`.
- Access content in public channels where Collate is added.
- Join public channels and view their basic information.
- Add and respond to shortcuts and slash commands.
- Access content in direct messages and group direct messages.
- View user profiles in the workspace.
- Send messages as `@collate2`, including to channels it's not a member of.
- Post messages to designated Slack channels.

## Slack App Configuration

To enable Slack integration in Collate:

1. Navigate to **Settings** → **Applications** → **Add Apps**.

{% image
src="/images/v1.9/applications/slack1.png"
alt="Configuration"
caption="Configuration"
/%}

2. Search for **Slack** and install the application.

{% image
src="/images/v1.9/applications/slack2.png"
alt="Configuration"
caption="Configuration"
/%}

### Configuration Fields

- **User Token**: Token used to authenticate Slack API requests on behalf of a user.
- **Bot Token**: Token used to authenticate Slack API requests on behalf of the bot.

{% image
src="/images/v1.9/applications/slack3.png"
alt="Configuration"
caption="Configuration"
/%}

{% note %}

Ensure that both tokens are securely stored and have the required scopes for interaction with your Slack workspace.

{% /note %}

## How to Obtain Slack Bot Token and User Token

To integrate Slack with Collate, you need to generate both a **Bot Token** and a **User Token** from your Slack workspace. These tokens allow Collate to interact with Slack APIs on behalf of your application and users.

## Step-by-Step Instructions

### Create a Slack App

1. Go to the [Slack API: Your Apps](https://api.slack.com/apps) page.
2. Click **Create New App**.

{% image
src="/images/v1.9/applications/slack4.png"
alt="Configuration"
caption="Configuration"
/%}

3. Select **From scratch**.

{% image
src="/images/v1.9/applications/slack5.png"
alt="Configuration"
caption="Configuration"
/%}

4. Enter the **App Name** (e.g., `Collate Integration`) and choose your **Slack workspace**.
5. Click **Create App**.

{% image
src="/images/v1.9/applications/slack6.png"
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
src="/images/v1.9/applications/slack-basic.png"
alt="Basic Information page"
caption="Basic Information page"
/%}

### Configure OAuth & Permissions

1. In your app’s dashboard, navigate to **OAuth & Permissions**.

{% image
src="/images/v1.9/applications/slack7.png"
alt="Configuration"
caption="Configuration"
/%}

2. Under **Scopes**, configure the following:

{% image
src="/images/v1.9/applications/slack8.png"
alt="Configuration"
caption="Configuration"
/%}

#### For **Bot Token Scopes**:
Add these scopes:
- `chat:write`
- `channels:read`
- `groups:read`
- `im:read`
- `mpim:read`
- `users:read`
- `commands`
- `app_mentions:read`

#### For **User Token Scopes**:
Add these scopes:
- `channels:history`
- `groups:history`
- `im:history`
- `mpim:history`

{% note %}

Only add the scopes you need. Ensure your Slack workspace allows user token generation (may require admin privileges).

{% /note %}

### Configure Redirect URLs

Before installing the app to your workspace, configure the redirect URLs to ensure successful OAuth authentication:
1. In the left-hand menu, go to **OAuth & Permissions**.
2. Scroll down to the **Redirect URLs** section.
3. Click **Add New Redirect URL** and enter the redirect URL (e.g., https://sandbox.open-metadata.org/api/slack/callback).
4. Click **Save URLs** to apply the changes.

The redirect URL must exactly match the URL used in your OAuth request.  
This ensures Slack can return the authorization code to your backend after the user grants permissions.

{% image
src="/images/v1.9/applications/slack-redirect.png"
alt="Configure Redirect URLs"
caption="Configure Redirect URLs"
/%}

### Configure Event Subscriptions

After setting the necessary OAuth scopes, follow the steps below to configure **Event Subscriptions**:

1. In the left-hand menu under Features, click on Event Subscriptions.

2. Toggle the Enable Events switch to On.

{% image
src="/images/v1.9/applications/enable-events.png"
alt="Enable Events"
caption="Enable Events"
/%}

3. In the Request URL field, enter your app’s endpoint (e.g., https://sandbox.open-metadata.org/api/slack/events).

    - Slack will send a verification request containing a challenge parameter.
    - Ensure your endpoint responds with the challenge value to confirm validation.

4. Scroll down to the Subscribe to bot events section and click **Add Bot User Event**.

{% image
src="/images/v1.9/applications/bot-events.png"
alt="Subscribe to bot events"
caption="Subscribe to bot events"
/%}

- Add the following events (ensure corresponding scopes are already granted under OAuth permissions):

    - app_home_opened – Triggered when a user clicks into your App Home (no additional scope needed).
    - app_mention – Subscribes to messages that mention your app or bot (app_mentions:read scope required).
    - message.im – Subscribes to messages in direct message channels (im:history scope required).
    - message.mpim – Subscribes to messages in multi-party direct message channels (mpim:history scope required).

5. (Optional) Under **Subscribe to events on behalf of users**, click **Add Workspace Event** and select:

    - message.im – Subscribes to messages posted in a direct message channel on behalf of users (im:history scope required).

Slack automatically adds the necessary scopes for any subscribed events if not already included.

{% image
src="/images/v1.9/applications/subscribe-events.png"
alt="Subscribe to events on behalf of users"
caption="Subscribe to events on behalf of users"
/%}

### Configure Slash Commands

To enable users to interact with your app via custom commands in Slack:

1. In the left-hand menu under **Features**, click on **Slash Commands**.
2. Click **Create New Command** to define a new command, or edit an existing one.

{% image
src="/images/v1.9/applications/create-command.png"
alt="Create Edit New Command"
caption="Create Edit New Command"
/%}

#### Example Slash Commands

| Command | Description | Request URL | Usage Hint |
|---------|-------------|-------------|-------------|
| `/find` | Find the asset | `https://sandbox.open-metadata.org/api/slack/command/find` | `query or entityType query` |
| `/asset` | Fetch data for a specific asset | `https://sandbox.open-metadata.org/api/slack/command/asset` | `entityType fqn/id` |

{% image
src="/images/v1.9/applications/slash-commands.png"
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
src="/images/v1.9/applications/slack9.png"
alt="Configuration"
caption="Configuration"
/%}

2. Authorize the permissions requested by the app.

After installation, you'll be redirected to the OAuth screen where your tokens will be displayed.

### 4. Copy the Tokens

- **Bot User OAuth Token**: Starts with `xoxb-...`
- **User OAuth Token**: Starts with `xoxp-...`

Store these tokens securely and provide them in the Slack app configuration within Collate.

{% note %}

- Never expose your tokens publicly.
- Rotate tokens periodically.
- Use Slack's [token rotation policy](https://api.slack.com/authentication/token-types#rotating) for better security.

{% /note %}

For more information, refer to the [Slack API documentation](https://api.slack.com/).
