# 1.10.1 Release 🎉

{% note noteType="Tip" %}
**10th October 2025**
{% /note %}

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.10.1!
{% /inlineCallout %}
{% /inlineCalloutContainer %}

You can find the GitHub release [here](https://github.com/open-metadata/OpenMetadata/releases/tag/1.10.1-release).

### Bug Fixes

- **Fix:** Hide owner and domain "Add" button if classification is disabled  
- **Fix:** Change remove default persona icon  
- **Fix:** The table column resize handler not visible  
- **Fix:** Pin pydantic to `<2.12.0`  
- **Fix:** The wrong label displayed on semantic status  
- **Fix:** Logger level should work for deprecation warnings  
- **Fix:** Update the node version in Dockerfile *(Collate)*  
- **Fix:** Pass context for local ingestion webserver build `[skip ci]` *(Collate)* 

### Improvements

- Improved Playwright flaky user profile persona interactions  
- Test suite owner is getting blocked when trying to add test cases to a bundle suite.

**Full Changelog**: [link](https://github.com/open-metadata/OpenMetadata/compare/1.10.0-release...1.10.1-release)
