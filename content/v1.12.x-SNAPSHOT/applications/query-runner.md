---
title: Query Runner Application for SQL Studio
description: Install the Query Runner application to enable SQL Studio - execute SQL queries directly against database services from within Collate.
slug: /applications/query-runner
collate: true
---

# Query Runner Application

The Query Runner application enables SQL Studio functionality in Collate, allowing users to execute SQL queries directly against configured database services from within the platform. This eliminates the need to switch between different database clients and provides a unified query execution experience.

## Overview

Query Runner powers SQL Studio, Collate's integrated query execution environment. Once installed and configured, users can:

- **Unified Query Interface**: Write, Save & Execute SELECT queries to explore data across multiple database services without switching tools
- **Flexible Authentication**: Support for SSO-based, OAuth, and credential-based authentication methods

## Prerequisites

- **Admin Access**: You must have administrator privileges in Collate


## Installation

### Step 1: Access the App Marketplace

1. Log in to Collate with your administrator account
2. Navigate to **Settings** from the main navigation menu
3. Click on **Applications** card in settings.
4. Click on **Add Apps** button on top right to visit **`Marketplace`**

### Step 2: Find the Query Runner Application

1. In the App Marketplace, browse or search for **"Query Runner"**
2. The Query Runner application enables SQL Studio functionality
3. Click on the **Query Runner** application card to view details

{% image
src="/images/v1.12/applications/query_runner/marketspace.png"
alt="Query Runner in App Marketplace"
caption="Find Query Runner in the App Marketplace" /%}

### Step 3: Install the Application

1. Review the application details:
   - **Description**: The Query Runner Application enables users to execute queries against configured database services
2. Click the **Install** button

{% image
src="/images/v1.12/applications/query_runner/install_query_runner.png"
alt="Install Query Runner Application"
caption="Click Install to add Query Runner" /%}

3. Click **Schedule** button → Select **On Demand** option

{% image
src="/images/v1.12/applications/query_runner/on_demand.png"
alt="Select On Demand Scheduling"
caption="Choose On Demand scheduling option" /%}

4. Click **Create** to proceed with installation

### Step 4: Verify Installation

1. After installation completes, you'll see a success message

{% image
src="/images/v1.12/applications/query_runner/installation_success.png"
alt="Installation Success Message"
caption="Query Runner installation successful" /%}

2. The Query Runner application will appear in your **Installed Applications** list
3. The application status should show as **Active**

{% note noteType="Note" %}

Installation typically takes a few seconds. If the installation fails, check the application logs in **Settings** → **Applications** → **Query Runner** → **Logs**.

{% /note %}

## Post-Installation

Once the Query Runner application is installed, **SQL Studio** will appear in the main navigation menu for all users

{% image
src="/images/v1.12/applications/query_runner/sqlstudio_in_navigation.png"
alt="SQL Studio in Navigation"
caption="SQL Studio appears in the main navigation after installation" /%}

{% note noteType="Tip" %}

**Next Steps**: After installation, administrators must configure SQL Studio for supported database service. See the [SQL Studio Admin Configuration](/how-to-guides/sql-studio/admin-configuration) guide for detailed setup instructions.

{% /note %}

## Application Management


### Viewing Application Logs

If you need to troubleshoot issues:

1. Go to **Settings** → **Applications** → **Query Runner**
2. Click on the **Logs** tab
3. Review recent logs for errors or warnings
4. Filter logs by date or severity level


### Uninstalling the Application

If you need to remove SQL Studio:

1. Go to **Settings** → **Applications** → **Query Runner**
2. Click the **Uninstall** button
3. Type the application name to confirm
4. Click **Confirm Uninstall**

## Troubleshooting

### Installation Fails

**Problem**: Installation fails with "Application cannot be installed"

**Solutions**:
- Verify you have admin privileges
- Check that your Collate instance meets minimum requirements
- Review application logs for specific error messages
- Contact support if the issue persists

### Application Not Appearing

**Problem**: After installation, SQL Studio doesn't appear in the navigation

**Solutions**:
- Refresh your browser (Cmd/Ctrl + R)
- Clear browser cache and cookies
- Log out and log back in
- Verify the application status is "Active" in Settings → Applications


## Next Steps

After installing the Query Runner application, follow the **[SQL Studio](/how-to-guides/sql-studio)**  to get started.
