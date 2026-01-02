# 1.11.4 Release 🎉

{% note noteType="Tip" %}
**24th December 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.11.4!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.11.4-release).

## Improvements

- Add AI Health Settings (CAIP-199).
- Monthly rate limits for credit usage.
- Add POV option to deployment enum in limits config.
- Force recomputation of vector index if needed (AI #197).
- Add component for Knowledge Center in AskCollate.
- Keep completed workflows for 4 weeks in Argo.
- Enable RDF on Collate.
- Add minimum height to Dimension tables in UI.
- Display “No Dimension” and stats in Data Quality.
- Add SQLGlot parser support for improved query parsing.
- Add support for bulk edit on nested glossary terms.
- Add lineage section in the Overview tab in the right panel.
- Improve lineage node column pagination.
- Add page size dropdown option to MUI table pagination.
- Enhance dbt functionality with new features.
- Add `username` and `preferred_username` support.
- Improve system repository health with extra validations.
- Stream ingestion logs to log versions.
- Upgrade MCP SDK to 0.14.0 for protocol 2025-06-18 support.
- Refactor field type and operators for enum custom properties.
- Refactor and improve glossary term operations.
- Remove redundant `updateMetadata` from Workflow Set Action.
- Modify logic to use parameterized queries for security.
- Improve test connection speed using `has_table_privilege` for partition details.
- Allow listing test case results with no dimensions.

## Fixes

- Fix runner test connection.
- Fix Health page checking CAIP with ingestion-bot and AskCollate displayName migration.
- Fix Metapilot cleanup in UI.
- Add column lineage support for Matillion pipeline.
- Fix tag and glossary term in the automator action config not shown in the edit form.
- Fix multiple “No Dimension” cards being displayed in UI.
- Update SCIM mapping creation migration to support default charset.
- Fix clusterAlias issue with `/getPlatformLineage` API.
- Fix index creation on start and later revert behavior.
- Fix security vulnerabilities.
- Fix dbt attribute errors.
- Fix low cardinality support for ClickHouse.
- Fix match function for ClickHouse.
- Fix DBT override lineage configuration.
- Secure DefaultTemplateProvider against template injection.
- Fix data files for Qlik connector.
- Fix glossary term `/search` API.
- Fix glossary term search relevance scoring.
- Fix time conversion issue for table freshness.
- Fix “usage entity already exists” error.
- Fix infinite loader issue in lineage section.
- Fix disabled default certifications still visible on assets.
- Fix entity type not being sent inside the `EntityReference` object.
- Fix SDK issue with deserializing `setterless` property `dataProducts`.

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.11.3-release...1.11.4-release)
