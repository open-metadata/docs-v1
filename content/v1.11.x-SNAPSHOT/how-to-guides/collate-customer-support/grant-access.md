---
title: How to Grant Temporary Access to Collate Support Team Members
description: Give temporary support access to the customers support team members in Collate for support access, including external email setup and SSO domain settings.
slug: /how-to-guides/collate-customer-support/grant-access
collate: true
---

# How to Grant Temporary Access to Collate Support Team Members

This guide outlines the steps required to give temporary support access in the Collate platform for the support team.

## Steps to Grant  Access

### 1. Navigate to the Support Application

- Go to **Settings → Applications → Support**

{% image
src="/images/v1.10/how-to-guides/support/support-1.png"
alt="Settings → Applications → Support"
caption="Settings → Applications → Support"
/%}

### 2. Add the Collate Support Access

- In the **Add Support** section:
  - Enter the support email: eg `ayush@getcollate.io`
  - Set **Access Role** to `view only` or `Admin`.
  - Set the **Access Duration** to `1 hour`, `2 hour`, `4 hours` etc.

{% image
src="/images/v1.10/how-to-guides/support/support-2.png"
alt="Add the Collate Support Access"
caption="Add the Collate Support Access"
/%}

### 3. Grant Access

- Click the **Grant Access** button.

{% image
src="/images/v1.10/how-to-guides/support/support-3.png"
alt="Grant Access"
caption="Grant Access"
/%}

- The same access will be provided to the support email. This can be verified in the access logs.

{% image
src="/images/v1.10/how-to-guides/support/support-4.png"
alt="Access Logs"
caption="Access Logs"
/%}

- In the configuration section, you can select the delivery method as Email, Slack, or both.

{% image
src="/images/v1.10/how-to-guides/support/support-5.png"
alt="Configuration"
caption="Configuration"
/%}

{% note %}

If your organization uses Single Sign-On (SSO), you must **disable the Enforce Principal Domain** to allow access for emails from other domains (e.g., `gmail.com`). Navigate to **Settings → SSO → Configure** to disable the same.

{% image
src="/images/v1.10/how-to-guides/support/support-6.png"
alt="Configuration"
caption="Configuration"
/%}

{% /note %}
