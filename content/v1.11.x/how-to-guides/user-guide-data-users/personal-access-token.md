---
title: How to Create a Personal Access Token | Official Documentation
description: Create personal access tokens to authenticate API requests to OpenMetadata.
slug: /how-to-guides/guide-for-data-users/personal-access-token
---

# How to Create a Personal Access Token

Personal Access Tokens (PATs) in OpenMetadata let you authenticate and interact with the OpenMetadata API securely. Follow the steps below to generate a new personal access token.

## Prerequisites

- You have a valid OpenMetadata user account.
- You have access to the OpenMetadata UI.

## Steps to Create a Personal Access Token

1. **Log in to the OpenMetadata UI**
   - Navigate to your OpenMetadata instance.
   - Enter your credentials to log in.

2. **Access your profile**
   - Click your profile icon in the top-right corner of the UI.
   - Select **View Profile** from the dropdown menu.

{% image
src="/images/v1.11/how-to-guides/user-guide-for-data-stewards/access-token1.png"
alt="Access your profile"
caption="Access your profile"
/%}

3. **Open the Access Tokens tab**
   - In your profile page, click the **Access Tokens** tab.

{% image
src="/images/v1.11/how-to-guides/user-guide-for-data-stewards/access-token2.png"
alt="Open the Access Tokens tab"
caption="Open the Access Tokens tab"
/%}

4. **Generate a new token**
   - Click **Generate New Token**.

{% image
src="/images/v1.11/how-to-guides/user-guide-for-data-stewards/access-token3.png"
alt="Generate a new token"
caption="Generate a new token"
/%}

5. **Set token expiration**
   - Choose an expiration period for the token. Available options typically include:
     - 1 hour
     - 1 day
     - 7 days
     - 30 days
     - 60 days

{% image
src="/images/v1.11/how-to-guides/user-guide-for-data-stewards/access-token4.png"
alt="Set token expiration"
caption="Set token expiration"
/%}

6. **Copy your token**
   - After generation, the personal access token is displayed.
   - You can revoke a token at any time by selecting `Revoke Token`.
   - Copy and securely store the token, as you may not be able to view it again later.

{% image
src="/images/v1.11/how-to-guides/user-guide-for-data-stewards/access-token5.png"
alt="Copy your token"
caption="Copy your token"
/%}

## Usage

Use the generated token to authenticate API requests to OpenMetadata. Include it in the Authorization header as follows:

```bash
Authorization: Bearer <your_personal_access_token>
```
