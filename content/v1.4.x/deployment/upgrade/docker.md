---
title: Upgrade on Docker
slug: /deployment/upgrade/docker
---

# Upgrade on Docker

To run OpenMetadata with Docker, you can simply download the `docker-compose.yml` file. Optionally, we added some
Named Volumes to handle data persistence.

{% note %}

You can find more details about Docker deployment [here](/deployment/docker)

{% /note %}

Below we have highlighted the steps needed to upgrade to the latest version with Docker. Make sure to also look [here](/deployment/upgrade/versions/100-to-110) for the specific details related to upgrading to 1.0.0

{% partial file="/v1.4/deployment/upgrade/upgrade-prerequisites.md" /%}

# Upgrade Process

## Replace the docker compose file

- Stop the running compose deployment with below command 
```
docker compose down
```
- Download the Docker Compose Service File from OpenMetadata GitHub Release page [here](https://github.com/open-metadata/OpenMetadata/releases/latest)
- Replace the existing Docker Compose Service File with the one downloaded from the above step

{% note %}

Please make sure to go through [breaking changes and release highlights](/deployment/upgrade/versions/100-to-110).

{% /note %}

- Start the Docker Compose Service with the below command
```
docker compose -f docker-compose.yml up -d
```

{% partial file="/v1.4/deployment/upgrade/post-upgrade-steps.md" /%}


# Troubleshooting

#### Permission Denied when running  ```metadata openmetadata-imports-migration```
If you have a `Permission Denied` error thrown when running ```metadata openmetadata-imports-migration --change-config-file-path``` you might need to change the permission on the `/opt/airflow/dags` folder. SSH into the ingestion container and check the permission on the folder running the below commands
```
ls -l /opt/airflow
```
```
ls -l /opt/airflow/dags
```
both the `dags` folder and the files inside `dags/` should have `airflow root` permission. if this is not the case simply run the below command
```
chown -R airflow:root /opt/airflow/dags
```

#### Broken DAGs can't load config file: Permission Denied
You might need to change the permission on the `/opt/airflow/dag_generated_config` folder. SSH into the ingestion container and check the permission on the folder running the below commands
```
ls -l /opt/airflow
```
```
ls -l /opt/airflow/dag_generated_config
```
both the `dags` folder and the files inside `dags/` should have `airflow root` permission. if this is not the case simply run the below command
```
chown -R airflow:root /opt/airflow/dag_generated_config
```
