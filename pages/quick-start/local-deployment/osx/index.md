---
title: Try OpenMetadata in Docker
slug: /quick-start/local-deployment/osx
---

# Requirements for OSX

Please ensure your host system meets the requirements listed below. Then continue to the Procedure for installing
OpenMetadata.

### Python (version 3.7 or greater)

To check what version of Python you have, you can use the following command:

```bash
python3 --version
```

{% divider /%}

### Docker (version 20.10.0 or greater)

To check what version of Docker you have, please use the following command.

```commandline
docker --version
```

If you need to install Docker, please visit [Get Docker](https://docs.docker.com/get-docker/).

{% note %}

You must allocate at least 6GB of memory to Docker in order to run OpenMetadata. To change the memory allocation
for Docker, please visit `Preferences -> Resources -> Advanced` in your Docker Desktop.

{% /note %}

### Docker Compose (version v2.1.1 or greater)

To verify that the docker compose command is installed and accessible on your system, run the following command.

```commandline
docker compose version
```

Upon running this command you should see output similar to the following.

```commandline
Docker Compose version v2.1.1
```

{% divider /%}

## Procedure

{% divider /%}

### 1. Create a directory for OpenMetadata

Create a new directory for OpenMetadata and navigate into that directory.

```bash
mkdir openmetadata-docker && cd openmetadata-docker
```

{% divider /%}

### 2. Create a Python virtual environment

Create a virtual environment to avoid conflicts with other Python environments on your host system.
A virtual environment is a self-contained directory tree that contains a Python installation for a particular version
of Python, plus a number of additional packages.

In a later step you will install the `openmetadata-ingestion` Python module and its dependencies in this virtual environment.

```bash
python3 -m venv env
```

{% divider /%}

### 3. Activate the virtual environment

```bash
source env/bin/activate
```

{% divider /%}

### 4. Upgrade pip and setuptools

```bash
pip3 install --upgrade pip setuptools
```

{% divider /%}

### 5. Install the OpenMetadata Python module using pip

```bash
pip3 install --upgrade "openmetadata-ingestion[docker]"
```

{% divider /%}

### 6. Ensure the module is installed and ready for use

```bash
metadata docker --help
```

After running the command above, you should see output similar to the following.

```
❯ metadata docker --help
Usage: metadata docker [OPTIONS]

  Checks Docker Memory Allocation Run Latest Release Docker - metadata docker
  --start Run Local Docker - metadata docker --start -f path/to/docker-
  compose.yml

Options:
  --start                         Start release docker containers
  --stop                          Stops openmetadata docker containers
  --pause                         Pause openmetadata docker containers
  --resume                        Resume/Unpause openmetadata docker
                                  containers
  --clean                         Stops and remove openmetadata docker
                                  containers along with images, volumes,
                                  networks associated
  -f, --file-path FILE            Path to Local docker-compose.yml
  -env-file, --env-file-path FILE
                                  Path to env file containing the environment
                                  variables
  --reset-db                      Reset OpenMetadata Data
  --ingest-sample-data            Enable the sample metadata ingestion
  --help                          Show this message and exit.
```

{% divider /%}

### 7. Start the OpenMetadata Docker containers

```bash
metadata docker --start
```

This will create a docker network and four containers for the following services:

- MySQL to store the metadata catalog
- Elasticsearch to maintain the metadata index which enables you to search the catalog
- Apache Airflow which OpenMetadata uses for metadata ingestion
- The OpenMetadata UI and API server

After starting the Docker containers, you should see an output similar to the following.

```
[2021-11-18 15:53:52,532] INFO     {metadata.cmd:202} - Running Latest Release Docker
[+] Running 5/5
 ⠿ Network tmp_app_net                  Created                                                                                        0.3s
 ⠿ Container tmp_mysql_1                Started                                                                                       1.0s
 ⠿ Container tmp_elasticsearch_1        Started                                                                                       1.0s
 ⠿ Container tmp_ingestion_1            Started                                                                                       2.1s
 ⠿ Container tmp_openmetadata-server_1  Started                                                                                       2.2s
[2021-11-18 15:53:55,876] INFO     {metadata.cmd:212} - Time took to get containers running: 0:00:03.124889
.......
```

After starting the containers, `metadata` will launch Airflow tasks to ingest sample metadata and usage data for you to
experiment with. This might take several minutes, depending on your system.

<Note>

- `metadata docker --stop` will stop the Docker containers.
- `metadata docker --clean` will clean/prune the containers, volumes, and networks.

</Note>

#### Running with Postgres

From 0.12, OpenMetadata also supports Postgres local deployment out of the box!

You just need to run:

```bash
metadata docker --start -db postgres
```

Note that the option `-db postgres` needs to be passed to the other commands as well to locate the proper compose file.

{% divider /%}

### 8. Wait for metadata ingestion to finish

˚
Once metadata ingestion has finished and the OpenMetadata UI is ready for use, you will see output similar to the following.

```
✅  OpenMetadata is up and running

Open http://localhost:8585 in your browser to access OpenMetadata..

To checkout Ingestion via Airflow, go to http://localhost:8080
(username: admin, password: admin)

We are available on Slack , https://slack.open-metadata.org/ . Reach out to us if you have any questions.

If you like what we are doing, please consider giving us a star on github at https://github.com/open-metadata/OpenMetadata.
It helps OpenMetadata reach wider audience and helps our community.
```

{% divider /%}

<Tip>

The `metadata` CLI is very useful for quickly testing when getting started or wanting to try out a new release.

If you had already set up a release and are trying to test a new one, you might need to run `metadata docker --clean`
to clean up the whole environment and pick up the new ingredients from a fresh start.

</Tip>

<Image src="/images/quickstart/docker/openmetadata.png" alt="UI"/>

{% divider /%}

## Go on a tour and start discovering the power of metadata & collaboration

<Image src="/images/quickstart/tour.png" alt="tour"/>

{% divider /%}

## Log in to Airflow

OpenMetadata ships with an Airflow container to run the ingestion workflows that have been deployed
via the UI.

In the Airflow, you will also see some sample DAGs that will ingest sample data and serve as an example.

You can access Airflow at [http://localhost:8080](http://localhost:8080). Use the following credentials to log in to Airflow.

- Username: `admin`
- Password: `admin`

{% divider /%}

## Security

Please follow our [Enable Security Guide](/deployment/docker/security) to configure security for your OpenMetadata
installation.

{% divider /%}

## Advanced

If you want to persist your data, prepare [Named Volumes](/deployment/docker/volumes) for the containers.

{% divider /%}

## Next Steps

1. Visit the [Features](/overview/features) overview page and explore the OpenMetadata UI.
2. Visit the [Connectors](/connectors) documentation to see what services you can integrate with
   OpenMetadata.
3. Visit the [API](/swagger.html) documentation and explore the rich set of OpenMetadata APIs.

{% divider /%}

## Troubleshooting

### Compose is not a docker command

If you are getting an error such as `"compose" is not a docker command`, you might need to revisit the
installation steps above to make sure that Docker Compose is properly added to your system.

{% divider /%}

### metadata CLI issues

Are you having trouble starting the containers with the `metadata` CLI? While that process is recommended,
you can always run `docker compose` manually after picking up the latest `docker-compose.yml` file from the release:

```commandline
mkdir openmetadata && cd "$_"
wget https://github.com/open-metadata/OpenMetadata/releases/download/0.11.3-release/docker-compose.yml
docker compose up -d
```

This snippet will create a directory named `openmetadata` and download the `docker-compose.yml` file automatically.
Afterwards, it will start the containers. If instead you want to download the file manually to another location,
you can do so from the Releases [page](https://github.com/open-metadata/OpenMetadata/releases).

This will start all the necessary components locally. You can validate that all containers are up
and running with `docker ps`.

```commandline
❯ docker ps
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED          STATUS                    PORTS                                                            NAMES
470cc8149826   openmetadata/server:0.11.0                             "./openmetadata-star…"   45 seconds ago   Up 43 seconds             3306/tcp, 9200/tcp, 9300/tcp, 0.0.0.0:8585-8586->8585-8586/tcp   openmetadata_server
63578aacbff5   openmetadata/ingestion:0.11.0                          "./ingestion_depende…"   45 seconds ago   Up 43 seconds             0.0.0.0:8080->8080/tcp                                           openmetadata_ingestion
9f5ee8334f4b   docker.elastic.co/elasticsearch/elasticsearch:7.10.2   "/tini -- /usr/local…"   45 seconds ago   Up 44 seconds             0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp                   openmetadata_elasticsearch
08947ab3424b   openmetadata/db:0.11.0                                 "/entrypoint.sh mysq…"   45 seconds ago   Up 44 seconds (healthy)   3306/tcp, 33060-33061/tcp                                        openmetadata_mysql
```

In a few seconds, you should be able to access the OpenMetadata UI at [http://localhost:8585](http://localhost:8585):

{% divider /%}

### Network openmetadata_app_net Error

You might see something like:

```
The docker command executed was `/usr/local/bin/docker compose --file /var/folders/bl/rm5dhdf127ngm4rr40hvhbq40000gn/T/docker-compose.yml --project-name openmetadata up --detach`.
It returned with code 1
The content of stdout can be found above the stacktrace (it wasn't captured).
The content of stderr is 'Network openmetadata_app_net  Creating
Network openmetadata_app_net  Error
failed to create network openmetadata_app_net: Error response from daemon: Pool overlaps with other one on this address space
```

A common solution is to run `docker network prune`:

```
WARNING! This will remove all custom networks not used by at least one container.
```

So be careful if you want to keep up some (unused) networks from your laptop.
