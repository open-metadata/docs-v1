# 1.9.9 Release 🎉

{% note noteType="Tip" %}
**19th September 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.9.9!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.9.9-release).

## Bug Fixes

- Fix post profiler time series migration with prefix index optimizations for MySQL compatibility
- Search filter removal now correctly restores full test case list in test suite pipeline edit page with wildcard search support
- Improved MySQL migration performance by optimizing queries
- Changed MySQL storage engine from MEMORY to InnoDB in migrations

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.9.8-release...1.9.9-release)
