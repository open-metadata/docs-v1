### Troubleshooting

If users are automatically logged out and unable to log in again due to a bad authentication configuration, you can reset the security setup using the following command:

```

./bootstrap/openmetadata-ops.sh remove-security-config --force

```

After executing the command, **restart the server**. The authentication values from your YAML or Helm chart will then be reapplied on startup. The following tiles detail how to apply this configuration across Docker, Kubernetes, and Bare Metal deployments:

{% inlineCalloutContainer %}
  {% inlineCallout
    color="violet-70"
    icon="celebration"
    bold="Docker Security"
    href="/deployment/security/configuration/docker" %}
    Configure SSO for your Docker Deployment.
  {% /inlineCallout %}
  {% inlineCallout
    color="violet-70"
    icon="storage"
    bold="Bare Metal Security"
    href="/deployment/security/configuration/bare-metal" %}
    Configure SSO for your Bare Metal Deployment.
  {% /inlineCallout %}
  {% inlineCallout
    color="violet-70"
    icon="fit_screen"
    bold="Kubernetes Security"
    href="/deployment/security/configuration/kubernetes" %}
    Configure SSO for your Kubernetes Deployment.
  {% /inlineCallout %}
{% /inlineCalloutContainer %}
