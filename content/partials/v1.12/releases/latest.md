# 1.11.8 Release 🎉

{% note noteType="Tip" %}
**4th February 2026**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.11.8!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.11.8-release).

## Improvements

- Added BigQuery lineage support for PowerBI .pbit files
- Added sobjectNames field for multi-object selection in Salesforce connector
- Added PBI rdl report lineage
- Included API result properties descriptions from OpenAPI schemas

## Fixes

- Fixed PowerBI .pbit parser fails on multiline DAX expressions
- Fixed tag search in mUI Tag Suggestion
- Fixed app stuck on refresh call for basic
- Fixed testsuite result summary
- Fixed okta renewal
- Fixed Ingest Schema & View Definition For Unity Catalog
- Fixed DB2 connection TLS certificate connection fix
- Fixed Snowflake View DDL Fallback To Preserve Exact Case Identifiers
- Skip and warn when autoclassification values are too long
- Deploy pipeline before DB update to prevent inconsistent state
- Clean OpenMetadataWorkflowConfig in IngestionPipeline

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.11.7-release...1.11.8-release)
