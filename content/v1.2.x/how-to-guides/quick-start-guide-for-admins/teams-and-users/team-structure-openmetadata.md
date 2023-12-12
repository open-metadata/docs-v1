---
title: Team Structure in OpenMetadata
slug: /how-to-guides/quick-start-guide-for-admins/teams-and-users/team-structure-openmetadata
---

# Team Structure in OpenMetadata

OpenMetadata supports a hierarchical team structure with **teamType** that can be `Organization`, `Business Unit`, `Division`, `Department`, and `Group` (default team type). **Organization** serves as the foundation of the team hierarchy representing the entire company. The other **team types** under Organization are Business Units, Divisions, Departments, and Groups.

- **`Organization`** is the **root team** in the hierarchy. _It cannot have a parent_. It can have children of the type `Business Unit`, `Division`, `Department`, `Group` along with `Users` directly as children (who are without teams).

- **`BusinessUnit`** is the next level of the team in the hierarchy. It can have `Business Unit`, `Division`, `Department`, and `Group` as children. It can only have **one parent** either of the type `Organization`, or `Business Unit`.

- **`Division`** is the next level of the team in the hierarchy below `Business Unit`. It can have `Division`, `Department`, and `Group` as children. It can only have **one parent** of the type `Organization`, `Business Unit`, or `Division`.

- **`Department`** is the next level of the team in the hierarchy below `Division`. It can have `Department` and `Group` as children. It can have `Organization`, `Business Unit`, `Division`, or `Department` as parents. It can have **multiple parents**.

- **`Group`** is the last level of the team in the hierarchy. It can only have `Users` as children and not any other teams. It can have all the team types as parents. It can have **multiple parents**. 

{% note noteType="Warning" %}
- Once created, the teamType for `Group` **cannot be changed later**. 
- Only the Teams of the type `Group` can **own data assets**.
{% /note noteType="Warning" %}
{% /note %}

{% image
src="/images/v1.1/how-to-guides/teams-and-users/teams.png"
alt="team-structure"
caption="Team Hierarchy in OpenMetadata"
/%}