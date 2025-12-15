---
title: Microsoft Teams Alerts Configuration | OpenMetadata
description: Configure Microsoft Teams as an alert destination in OpenMetadata.
slug: /how-to-guides/data-quality-observability/alerts-notifications/microsoft-teams-alerts-configuration
---

## Microsoft Teams Alerts Configuration

OpenMetadata integrates with Microsoft Teams using **Workflow Webhooks** to deliver alert messages directly to your Teams channels. This allows you to receive real-time notifications within Microsoft Teams.

### Important Migration Notice

{% note %}
**Microsoft Deprecation Update**: Microsoft has deprecated the legacy **Office 365 Connector** approach in favor of **Workflow Webhooks**.

**If you are using OpenMetadata v1.11.0 or later:**
- ✅ No code changes are required
- ✅ OpenMetadata already sends **Adaptive Cards** format
- ⚠️ **Action Required**: If you previously saved an **Office 365 Connector URL**, you must replace it with a new **Workflow Webhook URL**

For detailed Microsoft guidance, see: [Create incoming webhooks with Workflows for Microsoft Teams](https://support.microsoft.com/en-gb/office/create-incoming-webhooks-with-workflows-for-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498)
{% /note %}

### Setting Up a Microsoft Teams Workflow Webhook

An incoming webhook allows OpenMetadata to share alert content directly in your Teams channels and chats. Follow these steps using Microsoft's pre-configured webhook templates.

#### Step 1: Access Workflows from Your Channel

1. In **Microsoft Teams**, navigate to the **channel** or **chat** where you want alerts to be posted
2. Click **More options** (...) next to the channel or chat name
3. Select **Workflows**

#### Step 2: Select the Webhook Template

Microsoft provides pre-configured webhook templates. Search and select the "**Send webhook alerts to a channel**" pre-configured Webhook template to continue.

#### Step 3: Name and Configure the Webhook

1. Enter a **Name** for the workflow (e.g., "OpenMetadata Alerts")
2. Optionally, add a **Description** (e.g., "Receives data quality and governance alerts from OpenMetadata")
3. Review the authentication settings (the defaults are typically fine)
4. If you need to use a different account to post messages, click **Switch account**
5. Click **Next**

#### Step 4: Select the Destination

1. The workflow will ask you to specify where to post messages
2. Select your **Team**, **Channel**, or **Chat** (these fields auto-populate if you started from a specific channel)
3. Verify the account authentication is correct
4. Click **Add workflow** to create the workflow

#### Step 5: Copy Your Webhook URL

1. A confirmation dialog will appear displaying your **HTTP POST URL**
2. **Copy** the complete URL exactly as shown (do not modify or truncate it)
3. Store this URL securely - you'll paste it into OpenMetadata next

#### Finding Your Webhook URL Later

If you need to retrieve your webhook URL again:

1. Open the **Workflows** app in Microsoft Teams
2. Find and select your OpenMetadata workflow
3. Click **Edit**
4. Expand **When a Teams webhook request is received**
5. Copy the **HTTP POST URL** displayed there

### Configuring Microsoft Teams Webhooks in OpenMetadata

Once you have your Workflow Webhook URL, follow these steps to configure it in OpenMetadata:

#### Step 1: Access Alert Configuration

1. In OpenMetadata, navigate to **Alerts & Notifications** from the main menu
2. Select the type of alert you want to configure:
   - [**Data Observability Alerts**](/how-to-guides/data-quality-observability/alerts-notifications/data-observability-alerts) (for data quality and pipeline monitoring)
   - [**System & Governance Notifications**](/how-to-guides/data-quality-observability/alerts-notifications/system-governance-notifications) (for metadata and governance events)

#### Step 2: Add Microsoft Teams as a Destination

1. Click **Add Destination**
2. Select **Microsoft Teams** from the available destination options
3. Paste your **Workflow Webhook HTTP POST URL** into the **MS Teams Destination (HTTP POST URL)** field
4. Optionally, enter a **Display Name** for this Teams destination (e.g., "Data Quality Alerts")

#### Step 3: Test the Connection

1. Click **Test Connection** to verify the webhook is working
2. A test message will be sent to your Teams channel
3. If successful, you'll see a confirmation message and the test message will appear in your Teams channel as an Adaptive Card

#### Step 4: Save and Enable

1. Click **Save** to store the configuration
2. The Microsoft Teams destination is now ready to receive alerts


### Best Practices

- **Dedicated Channels**: Create separate Teams channels for different types of alerts (e.g., #data-quality-alerts, #pipeline-failures, #governance-events)
- **Channel Members**: Ensure all relevant team members are added to the Teams channel
- **Multiple Webhooks**: You can configure multiple Workflow Webhooks to send different alert types to different channels
- **Workflow Testing**: Always test your Workflow webhook in a non-production channel first
- **Notifications**: Enable notifications for the channel so team members don't miss important alerts

### Migration Guide: From Office 365 Connector to Workflow Webhook

If you're currently using the **legacy Office 365 Connector URLs**:

1. **Create a new Workflow Webhook** following the setup steps above
2. **Copy the new Webhook URL** from the Workflow
3. **Update OpenMetadata** with the new Workflow Webhook URL
4. **Test the configuration** in a test channel first
5. **Delete the old Office 365 Connector** from Microsoft Teams once the new Workflow is working

No code changes are required - only the webhook URL needs to be updated.


### Reference

For more information about Microsoft Teams Workflow Webhooks, visit [Create incoming webhooks with Workflows for Microsoft Teams](https://support.microsoft.com/en-gb/office/create-incoming-webhooks-with-workflows-for-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498).
