---
title: Upgrade on Kubernetes | Official Documentation
description: Upgrade Kubernetes deployments efficiently using version-specific instructions, Helm values, and best practices for safe rollout.
slug: /deployment/upgrade/kubernetes
collate: false
---

# Upgrade on Kubernetes

This guide will help you upgrade your OpenMetadata Kubernetes Application with automated helm hooks.

## Requirements

This guide assumes that you have an OpenMetadata deployment that you installed and configured following the 
[Kubernetes Deployment](/deployment/kubernetes) guide.

We also assume that your helm chart release names are `openmetadata` and `openmetadata-dependencies` and namespace used is `default`.

{% partial file="/v1.11/deployment/upgrade/upgrade-prerequisites.md" /%}

# Breaking Changes

## Helm Chart Refactor (v1.11.0)

OpenMetadata v1.11.0 includes a major refactor of the Helm charts as part of [PR #430](https://github.com/open-metadata/openmetadata-helm-charts/pull/430). This introduces several breaking changes that require manual intervention for existing deployments.

### Airflow Chart Migration

The Helm chart has migrated from the community `airflow-helm/airflow` v8.9.0 chart to the official Apache `airflow` v1.18.0 chart. This results in:

1. **Complete Values Restructure**: The Airflow configuration in `values.yaml` has been entirely reorganized to match the Apache Airflow Helm chart structure.
2. **Service Endpoint Changes**: Airflow services have been renamed (e.g., `web` service is now `api-server`).
3. **Chart Dependency Changes**: The underlying chart dependency has changed completely.

### Required Migration Steps

If you are upgrading from a previous version with `openmetadata-dependencies` deployed, follow these steps:

1. **Backup your Airflow data** - Ensure you have backups of your Airflow database and any custom configurations.
2. **Uninstall the existing `openmetadata-dependencies` release**:
   ```bash
   helm uninstall openmetadata-dependencies
   ```
3. **Update Helm dependencies**:
   ```bash
   helm repo update open-metadata
   ```
4. **Install the new chart version** - Follow the installation steps in [Step 3](#step-3-upgrade-openmetadata-dependencies).
5. **Update OpenMetadata configuration** - Update any service endpoint references in your OpenMetadata configuration (see below).

### Configuration Changes

#### Service Endpoints

Update any Airflow service endpoint references from:
```yaml
http://openmetadata-dependencies-web:8080
```

To:
```yaml
http://openmetadata-dependencies-api-server:8080
```

In your OpenMetadata values file, update the `pipelineServiceClientConfig.apiEndpoint`:

```yaml
openmetadata:
  config:
    pipelineServiceClientConfig:
      apiEndpoint: http://openmetadata-dependencies-api-server:8080
```

#### Executor Configuration

The default executor is now `KubernetesExecutor` (recommended for production). If you need to use `LocalExecutor` for development:

```yaml
openmetadata-dependencies:
  airflow:
    executor: LocalExecutor
    workers:
      replicas: 0
```

#### Webserver Secret Key

A static `webserverSecretKey` is now **required** to prevent JWT authentication failures between Airflow components (scheduler, api-server, and workers).

Generate a secure key and add it to your values:

```bash
openssl rand -hex 32
```

```yaml
openmetadata-dependencies:
  airflow:
    webserverSecretKey: "your-generated-secret-key"
```

#### Database Connection Structure

Database connections have migrated from an embedded format to the Apache chart structure with separate fields:

```yaml
openmetadata-dependencies:
  airflow:
    data:
      metadataConnection:
        user: airflow
        password: airflow
        protocol: mysql
        host: mysql
        port: 3306
        db: airflow
```

#### MySQL Compatibility

If using MySQL as the Airflow metadata database, the chart includes a compatibility workaround for MySQL syntax issues:

```yaml
openmetadata-dependencies:
  airflow:
    extraEnv:
      - name: _PIP_ADDITIONAL_REQUIREMENTS
        value: "apache-airflow-providers-fab==2.4.4"
```

This is automatically included in the default values to resolve `CREATE INDEX IF NOT EXISTS` syntax compatibility.

# Upgrade Process

## Step 1: Get an overview of what has changed in Helm Values

You can get changes from artifact hub of [openmetadata helm chart](https://artifacthub.io/packages/helm/open-metadata/openmetadata) release. Click on Default Values >> Compare to Version.

{% image src="/images/v1.11/deployment/upgrade/artifact-hub-compare-to-version.png" alt="Helm Chart Release Comparison" /%}

## Step 2: Upgrade Helm Repository with a new release

Update Helm Chart Locally for OpenMetadata with the below command:

```commandline
helm repo update open-metadata
```

It will result in the below output on screen.

```commandline
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "open-metadata" chart repository
Update Complete. ⎈Happy Helming!⎈
```

Verify with the below command to see the latest release available locally.

```commandline
helm search repo open-metadata --versions
> NAME                                   	CHART VERSION	APP VERSION	DESCRIPTION                                
open-metadata/openmetadata              1.3.1           1.3.1           A Helm chart for OpenMetadata on Kubernetes
open-metadata/openmetadata              1.2.8           1.2.5           A Helm chart for OpenMetadata on Kubernetes

...
open-metadata/openmetadata-dependencies 1.3.1           1.3.1           Helm Dependencies for OpenMetadata
open-metadata/openmetadata-dependencies 1.2.8           1.2.5           Helm Dependencies for OpenMetadata
...
```

## Step 3: Upgrade OpenMetadata Dependencies

You can run the below command to upgrade the dependencies with the new chart

```commandline
helm upgrade openmetadata-dependencies open-metadata/openmetadata-dependencies
```

The above command uses configurations defined [here](https://raw.githubusercontent.com/open-metadata/openmetadata-helm-charts/main/charts/deps/values.yaml).
You can modify any configuration and deploy by passing your own `values.yaml`.

{% note noteType="Tip" %}

Make sure that, when using your own `values.yaml`, you are not overwriting elements such as the `image` of the containers.
This would prevent your new deployment to use the latest containers when running the upgrade.

If you are running into any issues, double-check what are the default values of the helm revision.

{% /note %}

## Step 4: Upgrade OpenMetadata

Finally, we upgrade OpenMetadata with the below command:

```commandline
helm upgrade openmetadata open-metadata/openmetadata
```

You might need to pass your own `values.yaml` with the `--values` flag.

Note that in every version upgrade there is a migration process that updates your database to the newest version.

For kubernetes, this process will happen automatically as an upgrade hook.

{% note %}

You can learn more about how the migration process works [here](/deployment/upgrade/how-does-it-work).

{% /note %}

{% partial file="/v1.11/deployment/upgrade/post-upgrade-steps.md" /%}

# Troubleshooting

### Helm Upgrade failed for Airflow 3 Upgrade

```
W1223 18:27:15.171627   37790 warnings.go:70] spec.SessionAffinity is ignored for headless services
Error: UPGRADE FAILED: cannot patch "openmetadata-dependencies-dags" with kind PersistentVolumeClaim: PersistentVolumeClaim "openmetadata-dependencies-dags" is invalid: spec: Forbidden: spec is immutable after creation except resources.requests and volumeAttributesClassName for bound claims
@@ -1,6 +1,6 @@
 {
  "AccessModes": [
-  "ReadWriteMany"
+  "ReadWriteOnce"
  ],
  "Selector": null,
  "Resources": {
 && cannot patch "openmetadata-dependencies-scheduler" with kind Deployment: Deployment.apps "openmetadata-dependencies-scheduler" is invalid: spec.selector: Invalid value: {"matchLabels":{"component":"scheduler","release":"openmetadata-dependencies","tier":"airflow"}}: field is immutable
 ```

 If you see a similar issue as above when migrating OpenMetadata Helm Chart to latest 1.11.X Release, this is because Kubernetes does not allow updating Persistent volume claim fields. You need to uninstall openmtadata-dependencies helm chart as mentioned in the above steps [here (point 2)](#required-migration-steps). Uninstalling the openmetadata-dependencies helm chart will remove the PVCs and upon re-install of helm chart with latest 1.11.X Release, the chart will recreate the PVCs required. You will need to perform Post upgrade steps to redeploy pipelines to add the previous pipelines to Airflow as DAGs.

### Helm Upgrade fails with additional property airflow not allowed

With Release 1.0.0, if you see your helm charts failing to deploy with the below issue -

```
Error: INSTALLATION FAILED: values don't meet the specifications of the schema(s) in the following chart(s):
openmetadata:
- global: Additional property airflow is not allowed
```

This means the values passed to the helm charts has a section `global.airflow`. Airflow configs are replaced with pipelineServiceClient for Helm Charts.

The Helm Chart Values JSON Schema helps to catch the above breaking changes and this section will help you resolve and update your configurations for the same. You can read more about JSON Schema with Helm Charts [here](https://helm.sh/docs/topics/charts/#schema-files).

You will need to update the existing section of `global.airflow` values to match the new configurations.

⛔ Before 1.0.0 Helm Chart Release, the `global.airflow` section would be like -

```yaml
global:
  ...
  airflow:
    enabled: true
    # endpoint url for airflow
    host: http://openmetadata-dependencies-web.default.svc.cluster.local:8080
    # possible values are "no-ssl", "ignore", "validate"
    verifySsl: "no-ssl"
    # Local path in Airflow Pod
    sslCertificatePath: "/no/path"
    auth:
      username: admin
      password:
        secretRef: airflow-secrets
        secretKey: openmetadata-airflow-password
    openmetadata:
      # this will be the api endpoint url of OpenMetadata Server
      serverHostApiUrl: "http://openmetadata.default.svc.cluster.local:8585/api"
...
```

✅ After 1.0.0 Helm Chart Release, the `global.pipelineServiceClient` section will replace the above `airflow` section -

```yaml
openmetadata:
  config:
    ...
    pipelineServiceClientConfig:
      enabled: true
      className: "org.openmetadata.service.clients.pipeline.airflow.AirflowRESTClient"
      # endpoint url for airflow
      apiEndpoint: http://openmetadata-dependencies-web.default.svc.cluster.local:8080
      # this will be the api endpoint url of OpenMetadata Server
      metadataApiEndpoint: http://openmetadata.default.svc.cluster.local:8585/api
      # possible values are "no-ssl", "ignore", "validate"
      verifySsl: "no-ssl"
      ingestionIpInfoEnabled: false
      # local path in Airflow Pod
      sslCertificatePath: "/no/path"
      auth:
        username: admin
        password:
          secretRef: airflow-secrets
          secretKey: openmetadata-airflow-password
  ...
...
```

Run the [helm lint](https://helm.sh/docs/helm/helm_lint/) command on your custom values after making the changes to validate with the JSON Schema.

### MySQL Pod fails on Upgrade

{% note %}

This issue will only occur if you are using openmetadata-dependencies helm chart version `0.0.49` and `0.0.50` and upgrading to latest helm chart release.

{% /note %}

If your helm dependencies upgrade fails with the below command result -

```
Startup probe failed: mysqladmin: [Warning] Using a password on the command line interface can be insecure. mysqladmin: 
connect to server at 'localhost' failed error: 'Can't connect to local MySQL server through socket '/opt/bitnami/mysql/tmp/mysql.sock' (2)' 
Check that mysqld is running and that the socket: '/opt/bitnami/mysql/tmp/mysql.sock' exists!
```

This issue is related to a minor change that affected the MySQL Database Engine version upgrade from `8.0.28` to `8.0.29` for the Helm Chart Release `0.0.49` and `0.0.50`. Then the registry url was updated as we found a work around to fetch previous versions of [bitnami/mysql](https://github.com/bitnami/charts/issues/10833) Helm Releases.

As a result of the above fixes, anyone who is on OpenMetadata Dependencies Helm Chart Version `0.0.49` and `0.0.50` is affected with the above issue when upgrading for mysql. In order to fix this issue, make sure to follow the below steps -

1. Backup the Database using Metadata Backup CLI as mentioned [here](#backup-your-metadata)
2. Uninstall OpenMetadata Dependencies Helm Chart (`helm uninstall openmetadata-dependencies`)
3. Remove the unmanaged volume for MySQL Stateful Set Kubernetes Object (`kubectl delete pvc data-mysql-0`)
4. Install the latest version of [OpenMetadata Dependencies Helm Chart](/deployment/kubernetes)
5. Restore the Database using Metadata Restore CLI as mentioned [here](/deployment/backup-restore-metadata)
6. Next, Proceed with upgrade for OpenMetadata Helm Chart as mentioned [here](#step-4-upgrade-openmetadata)

{% partial file="/v1.11/deployment/upgrade/postgresql-troubleshoot.md" /%}
