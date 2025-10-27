# 1.10.3 Release 🎉

{% note noteType="Tip" %}
**22nd October 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.10.3!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.10.3-release).


## Fixes

- Fixed issue with **table column descriptions** not being correctly handled.
- Resolved **FQN encoding bug** when retrieving test case results via Python SDK.
- Addressed **protobuf version conflict** to ensure compatibility.
- Reverted naming convention change from **"dbt" to "DBT"** for consistency.  
- Adjusted **migration structure** by moving changes to version `1.0.3`.

## Improvements

- Added **Databricks pipeline support** for function parsing.  
- Enabled configuration of **custom property fields** in search settings.
- Upgraded **sqlalchemy-bigquery** dependency to `v1.15.0`.

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.10.2-release...1.10.3-release)
