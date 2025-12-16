---
title: Set Tags to ML Models Workflow - Governance Workflows | Official Documentation
description: Automatically assign governance tags to ML models based on metadata completeness to improve transparency and governance.
slug: /how-to-guides/data-governance/workflows/examples/set-tags-to-mlmodels-workflow
collate: true
---

# Set Tags to ML Model Workflow

## Overview
The **Set Tags to ML Model Workflow** automatically evaluates machine learning model metadata and assigns the appropriate governance tag based on whether key documentation is complete.  
This ensures that every ML model in the catalog is clearly marked as **Complete** or **Incomplete**, improving transparency, governance, and readiness for downstream use.


## How the Workflow Works

1. **Workflow Start**  
   The workflow is triggered for an ML model entity. It begins by reading the model’s metadata.

2. **Check: NON-NULL Description**  
   The workflow evaluates whether the ML model contains a valid, non-empty **Description** field.  
   This field is required to consider the model sufficiently documented.

3. **Decision Outcome**
    - If the **Description is present**, the workflow follows the **TRUE** branch.
    - If the **Description is missing or empty**, it follows the **FALSE** branch.

4. **TRUE Path: Set Complete Tag**  
   When the model passes the description check:
    - The workflow automatically assigns the **Complete** tag to the ML model.
    - The workflow then proceeds to the **End** step.

5. **FALSE Path: Set Incomplete Tag**  
   If the model does not have a valid description:
    - The workflow assigns the **Incomplete** tag.
    - The workflow then ends.

6. **Workflow Completion**  
   After the appropriate tag is assigned, the workflow concludes.  
   No human intervention is required.


## Workflow Diagram

Below is the visual representation of the Set Tags to ML Model Workflow:

{% image src="/images/v1.10/how-to-guides/governance/TagApprovalWorkflow.png" alt="Set Tags To MLModel Workflow" /%}


## Before Workflow Execution

Description is set for the Machine Learning Model and Tags are Empty

{% image src="/images/v1.10/how-to-guides/governance/MLModelBefore.png" alt="Set Tags To MLModel Workflow" /%}

Description is not set and empty for the Machine Learning Model and Tags are Empty

{% image src="/images/v1.10/how-to-guides/governance/MLModelNoDescriptionBefore.png" alt="Set Tags To MLModel Workflow" /%}

## After Workflow Execution

Complete Tag is populated 

{% image src="/images/v1.10/how-to-guides/governance/MLModelAfter.png" alt="Set Tags To MLModel Workflow" /%}

InComplete Tag is populated

{% image src="/images/v1.10/how-to-guides/governance/MLModelNoDescriptionAfter.png" alt="Set Tags To MLModel Workflow" /%}

## Key Features

- **Automated documentation validation**  
  Ensures ML models meet basic metadata requirements.

- **Automatic tag assignment**  
  Tags the model as **Complete** or **Incomplete** without manual action.

- **Clear governance signals**  
  Stakeholders can quickly determine whether a model has sufficient documentation.

- **Lightweight and fully automated**  
  No approval or human-in-the-loop required.


## Example Outcomes

| Condition                                 | Assigned Tag     |
|-------------------------------------------|------------------|
| ML model contains a non-null Description  | **Complete**     |
| ML model missing/empty Description        | **Incomplete**   |


## Why This Workflow Matters

- Ensures **minimum documentation quality** for ML models
- Helps data scientists and consumers quickly identify model readiness
- Improves governance and catalog hygiene
- Reduces manual tagging work
- Enables filtering and reporting based on documentation completeness


## Summary
The **Set Tags to ML Model Workflow** provides a simple yet powerful automation that keeps ML model metadata aligned with governance standards. By validating the presence of a model description and assigning the correct tag based on completeness, the workflow enhances transparency, supports quality assurance, and streamlines metadata management across the ML ecosystem.

