# 1.10.7 Release 🎉

{% note noteType="Tip" %}
**17th November 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.10.7!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.10.7-release).

## Improvements

- Improve Okta public key URL validation to correctly handle both `/oauth2/v1/keys` and `/oauth2/{authServerId}/v1/keys` patterns.
- TRUNCATE Flowable history tables in both 1.10.5 and 1.10.7 migrations.
- Deduplicate dbt tags.
- Add support for classification tags in the dbt `meta` field.
- Add `consoleEndpointURL` support for S3-compatible services.

## Bug Fixes

- Resolve “dbt NoneType has no attribute len” error.
- Fix UI flickering issue in the classification module.
- Add pagination Playwright test in a separate file and address code smells.
- Correct currentPage reset issue across all pages.

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.10.6-release...1.10.7-release)
