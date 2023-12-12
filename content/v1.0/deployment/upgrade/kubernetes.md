---
title: Upgrade on Kubernetes
slug: /deployment/upgrade/kubernetes
---

# Upgrade on Kubernetes

This guide will help you upgrade your OpenMetadata Kubernetes Application with automated helm hooks.

## Requirements

This guide assumes that you have an OpenMetadata deployment that you installed and configured following the 
[Kubernetes Deployment](/deployment/kubernetes) guide.

We also assume that your helm chart release names are `openmetadata` and `openmetadata-dependencies` and namespace used is
`default`.

## Procedure

{% note noteType="Warning" %}

It is advised to go through [openmetadata release notes](/deployment/upgrade#breaking-changes-from-0130-release)

{% /note %}

### Backup your data

{% note %}

To run the backup and restore commands, please make sure that you are always in the latest `openmetadata-ingestion`
version to have all the improvements shipped in the CLI.

{% /note %}

Before proceeding, please back up your MySQL/Postgres DB behind the OpenMetadata server. This step is crucial for 
restoring to your current state if any issues arise during the upgrade. It is recommended before upgrading your production instances.

Make sure you have connectivity between your database (MySQL / PostgreSQL) and the host machine where you will be running 
the below commands. If you are using the default database available with OpenMetadata Dependencies, make sure to 
port-forward the MySQL service using ```kubectl port-forward service/mysql 3306:3306```.

Then, follow the next steps to create a virtual environment and install the latest OpenMetadata Python package with the backup CLI:

- ```bash
     python -m venv venv
     source venv/bin/activate
     pip install openmetadata-ingestion~=1.0.0
     ```
- Validate the installed `metadata` version with 
     ```python -m metadata --version```
- Run the backup using the updated `metadata` CLI:
    ```
    python -m metadata backup -u openmetadata_user -p openmetadata_password -H mysql -d openmetadata_db --port 3306
    ```
    if using Postgres:
    ```
    python -m metadata backup -u openmetadata_user -p openmetadata_password -H postgresql -d openmetadata_db --port 5432 -s public
    ```
- The above command will generate a backup file with extension as `.sql`. You can copy the name from the backup
    command output.

## Get an overview of what has changed in Helm Values

You can get changes from artifact hub of [openmetadata helm chart](https://artifacthub.io/packages/helm/open-metadata/openmetadata) release. Click on Default Values >> Compare to Version.

{% image src="/images/v1.0/deployment/upgrade/artifact-hub-compare-to-version.png" alt="Helm Chart Release Comparison" /%}

## Upgrade Helm Repository with a new release

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
open-metadata/openmetadata              0.0.53          0.13.1          A Helm chart for OpenMetadata on Kubernetes
open-metadata/openmetadata              0.0.52          0.13.1          A Helm chart for OpenMetadata on Kubernetes
open-metadata/openmetadata              0.0.51          0.13.1          A Helm chart for OpenMetadata on Kubernetes
...
open-metadata/openmetadata-dependencies 0.0.53          0.13.1          Helm Dependencies for OpenMetadata         
open-metadata/openmetadata-dependencies 0.0.52          0.13.1          Helm Dependencies for OpenMetadata         
open-metadata/openmetadata-dependencies 0.0.51          0.13.1          Helm Dependencies for OpenMetadata 
...
```

## Upgrade OpenMetadata Dependencies

### Step 1: Upgrade OpenMetadata Dependencies with the below command

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

## Upgrade OpenMetdata

We upgrade OpenMetadata with the below command:

```commandline
helm upgrade openmetadata open-metadata/openmetadata
```

You might need to pass your own `values.yaml` with the `--values` flag

### Re-index all your metadata

Go to Settings -> OpenMetadata -> Elasticsearch
{% image src="/images/v1.0/deployment/upgrade/elasticsearch-re-index.png" alt="create-project" caption="Create a New Project" /%}

Click on reindex all
in the dialog box choose Recreate Indexes to All
{% image src="/images/v1.0/deployment/upgrade/reindex-ES.png" alt="create-project" caption="Reindex" /%}

## Troubleshooting

### Helm Upgrade fails with additional property airflow not allowed

With Release 1.0.0, if you see your helm charts failing to deploy with the below issue -

```
Error: INSTALLATION FAILED: values don't meet the specifications of the schema(s) in the following chart(s):
openmetadata:
- global: Additional property airflow is not allowed
```

This means the values passed to the helm charts has a section global.airflow. As per the breaking changes mentioned [here](/deployment/upgrade/versions/013-to-100#airflow-configuration-&-pipeline-service-client), Airflow configs are replaced with pipelineServiceClient for Helm Charts.

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
global:
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
```

Run the [helm lint](https://helm.sh/docs/helm/helm_lint/) command on your custom values after making the changes to validate with the JSON Schema.

### With 0.13.0 Release

If your helm dependencies upgrade fails with the below command result -

```
Error: UPGRADE FAILED: cannot patch "mysql" with kind StatefulSet: StatefulSet.apps "mysql" is invalid: spec: Forbidden: updates to statefulset spec for fields other than 'replicas', 'template', 'updateStrategy', 'persistentVolumeClaimRetentionPolicy' and 'minReadySeconds' are forbidden
```

This is probably because with `0.13.0`, we have **default size of mysql persistence set to 50Gi**.

Kubernetes does not allow changes to Persistent volume with helm upgrades.

In order to work around this issue, you can either default the persistence size to 8Gi or run the below command which will patch Persistent Volumes and Persistent Volume Claims for mysql helm and then run the above `helm upgrade` command.

```
kubectl patch pvc data-mysql-0 -p '{"spec":{"resources":{"requests":{"storage":"50Gi"}}}}'
kubectl patch pv <mysql-pv> -p '{"spec":{"storage":"50Gi"}}'
```

### MySQL Pod fails on Upgrade

{% note %}

This issue will only occur if you are using openmetadata-dependencies helm chart version `0.0.49` and `0.0.50` and upgrading to latest helm chart release.

{% /note %}

If your helm dependencies upgrade fails with the below command result -

```

Startup probe failed: mysqladmin: [Warning] Using a password on the command line interface can be insecure. mysqladmin: connect to server at 'localhost' failed error: 'Can't connect to local MySQL server through socket '/opt/bitnami/mysql/tmp/mysql.sock' (2)' Check that mysqld is running and that the socket: '/opt/bitnami/mysql/tmp/mysql.sock' exists!

```

This issue is related to a minor change that affected the MySQL Database Engine version upgrade from `8.0.28` to `8.0.29` for the Helm Chart Release `0.0.49` and `0.0.50`. Then the registry url was updated as we found a work around to fetch previous versions of [bitnami/mysql](https://github.com/bitnami/charts/issues/10833) Helm Releases.

As a result of the above fixes, anyone who is on OpenMetadata Dependencies Helm Chart Version `0.0.49` and `0.0.50` is affected with the above issue when upgrading for mysql. In order to fix this issue, make sure to follow the below steps -

1. Backup the Database using Metadata Backup CLI as mentioned [here](#backup-your-data)

2. Uninstall OpenMetadata Dependencies Helm Chart (`helm uninstall openmetadata-dependencies`)

3. Remove the unmanaged volume for MySQL Stateful Set Kubernetes Object (`kubectl delete pvc data-mysql-0`)

4. Install the latest version of [OpenMetadata Dependencies Helm Chart](/deployment/kubernetes)

5. Restore the Database using Metadata Restore CLI as mentioned [here](/deployment/backup-restore-metadata)

6. Next, Proceed with upgrade for OpenMetadata Helm Chart as mentioned [here](#upgrade-openmetdata)
