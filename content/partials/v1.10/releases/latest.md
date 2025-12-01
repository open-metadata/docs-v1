# 1.10.10 Release 🎉

{% note noteType="Tip" %}
**01st December 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.10.10!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.10.10-release).

## Fixes

- Fix application description overlapping on Safari.
- Fix overlapping of data asset header values.
- Fix custom property failures around date and time formats.
- Fix 404 error when loading dashboards or other entities that reference deleted glossary terms or tags.
- Deploy pipelines in OpenMetadataOperations fixes.
- Fix PowerBI dataset to upstream dataset column lineage.

## Improvements

- Cache user policies to improve performance
- Add missing imports for Ingestion Bot and related utilities in `DashboardResourceTest`

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.10.9-release...1.10.10-release)
