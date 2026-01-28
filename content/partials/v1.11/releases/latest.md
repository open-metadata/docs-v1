# 1.11.7 Release 🎉

{% note noteType="Tip" %}
**28th January 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.11.7!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.11.7-release).

## Improvements

- Improved execution time tracking with more detailed
- Added timeout handling for temp table lineage graph node processing
- Enhanced Event Based Workflows to show relevant exclude fields
- Improved Kafka Connect storage lineage handling and related enhancements
- Optimized BigQuery ingestion performance
- Added support for maxResultSize in QueryRunnerRequest schema
- Enhanced AsyncService with retry support, exponential backoff, and timeout handling
- Added proper filters for domain assets 
- Updated collate-data-diff dependency version

## Fixes

- Fixed unique count metric errors for BigQuery with cardinality updates
- Fixed UI tab remount issue
- Fixed Unapproved Terms should not be linked during bulk import  
- Fixed handling of Snowflake tags without values by skipping tag creation
- Fixed DB SM does not strip secret prefix
- Fixed count import issues in profiler interface
- Fixed UI issue where removing custom properties did not update the UI
- Fixed pipeline status ingestion issues with special characters
- Fixed Tableau db_service_entity being None
- Fixed advanced search issues related to custom properties
- Fixed CSV export issues by properly escaping quoted fields containing commas
- Fixed classification page loading issues
- Fixed JSONLogic query builder suffix handling
- Fixed incorrect private key and passphrase fetching logic
- Added logging to TestCaseResultRepository
- Fixed UI plugin loading based on navigationItems configuration

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.11.6-release...1.11.7-release)
