# 1.9.4 Release 🎉

{% note noteType="Tip" %}
**27th August 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.9.4!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.9.4-release).

## Enhancements & Features

- Ingestion Pipeline Enhancement: Added deploy pipeline method to ingestion pipeline repository for streamlined deployment workflows
- Entity Name Transformation: Refactored and enhanced entity name transformation logic for improved metadata processing and consistency
- MCP Integration: Upgraded Model Context Protocol (MCP) to version 0.11.2 for enhanced performance and stability (#23049)
- Databricks Connector: Improved Databricks Profiler reliability and Test Connection functionality for better data source validation
- Query Analytics: Added queryUsage metrics and additional fields for bulk query fetching to enhance usage analytics capabilities
- Airflow Lineage: Exposed retry_codes parameter in Airflow lineage configuration for better error handling and retry logic

## Bug Fixes

- UI Stability: Fixed critical UI crash when clicking contract status button, ensuring smooth user interaction
- Table Version Display: Resolved table version page breaking issue when displaying tables with large column lists
- Snowflake Connector: Fixed Snowflake tags ingestion to properly capture and display tag metadata
- Iceberg Tables: Resolved ingestion failures for Iceberg tables with nested partition structures 
- Persona Management: Fixed system default persona preferences validation to properly allow landing page configuration
- Test Case Validation: Added EntityLink column existence validation during test case creation to prevent invalid test configurations
- Test Case UI: Improved test case form loading performance and structure in Test Case form for better user experience
- Navigation: Fixed redirect notification links in Knowledge, Glossary, and Term pages for proper navigation flow
- Airflow Ingestion: Added order_by parameter to get_pipelines_list for consistent pipeline ordering
- Unity Catalog: Enhanced exception handling in Unity Catalog lineage processing for improved reliability
- SAP HANA Connector: Added support for parsing calculated view column formulas in SAP HANA connector
- Oracle Connector: Fixed Oracle DataDiff functionality and migrated Oracle connection to base implementation for improved compatibility

## Collate Release Updates

- Knowledge Center: Added support for mention redirects in Knowledge Center for improved navigation (#1982)
- Spark Engine: Implemented Spark Engine Lifecycle management for better resource optimization (#1974, #1966)

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.9.2-release...1.9.4-release)
