---
title: How to Add a Team
slug: /how-to-guides/quick-start-guide-for-admins/teams-and-users/add-team
---

# How to Add a Team

Creating a Team in OpenMetadata is easy. Decide on the `teamType` that you would like to add. Refer to the [**Team Structure in OpenMetadata**](/how-to-guides/quick-start-guide-for-admins/teams-and-users) to get a clear understanding of the various **Team Types**.

**1.** Click on **Settings >> Teams**. Further, navigate to the relevant `BusinessUnit`, `Division`, or `Department` where you would like to create a new team. Click on **Add Team**.

{% image
src="/images/v1.1/how-to-guides/teams-and-users/add-team1.png"
alt="select-team-type"
caption="Add a Team"
/%}

**2.** Enter the details like `Name`, `Display Name`, `Email`, `Team Type`, and `Description` and click on **OK**. The choice of the `teamType` is restricted by the type of the parent team selected. More information can be found in the [**Team Structure**](/how-to-guides/quick-start-guide-for-admins/teams-and-users) document.

{% note noteType="Warning" %}
- Once created, the teamType for `Group` **cannot be changed later**. 
- Only the Teams of the type `Group` can **own data assets**.
{% /note noteType="Warning" %}
{% /note %}

{% image
src="/images/v1.1/how-to-guides/teams-and-users/add-team2.png"
alt="select-team-type"
caption="Enter the Team Details"
/%}

**3.** The new team has been created. You can further add Users or create another Team within it.

{% image
src="/images/v1.1/how-to-guides/teams-and-users/add-team3.png"
alt="select-team-type"
caption="New Team Created"
/%}
