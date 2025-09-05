# 1.9.7 Release 🎉

{% note noteType="Tip" %}
**5th September 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.9.7!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.9.7-release).

## Bug Fixes

- Fix contract schema pagination key selection not persisting across sessions.
- Fix date formatters to work according to the chosen language setting.
- Fix cross services lineage changes of service_names to missed methods and handled string value passed to service_names.
- Users with Data Product edit permission were unable to upload images due to missing Domain resource permission.
- Fix WebSocketManager concurrency issues during concurrent modification and consumer job processing.

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.9.5-release...1.9.7-release)
