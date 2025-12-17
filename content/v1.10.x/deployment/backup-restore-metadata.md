---
title: Backup Metadata | OpenMetadata Deployment Guide
description: Back up and restore metadata to preserve lineage, classifications, descriptions, and governance data across updates or outages.
slug: /deployment/backup-restore-metadata
collate: false
---

# Backup & Restore Metadata

## Introduction

Before upgrading your OpenMetadata version we strongly recommend backing up the metadata.

The source of truth is stored in the underlying database (MySQL and Postgres supported). During each version upgrade there is a database migration process that needs to run. It will make changes to the OpenMetadata Application schema in the database and update the shape of the data to the newest OpenMetadata release.

It is important that we backup the data because if we face any unexpected issues during the upgrade process,
you will be able to get back to the previous version without any loss.

{% note %}

You can learn more about how the migration process works [here](/deployment/upgrade/how-does-it-work).

{% /note %}

Since version 1.4.0, **OpenMetadata encourages using the builtin-tools for creating logical backups of the metadata**:

- [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) for MySQL
- [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) for Postgres

For PROD deployments we recommend relying on managed cloud databases such as [AWS RDS](https://docs.aws.amazon.com/rds/),
[Azure SQL](https://azure.microsoft.com/en-in/products/azure-sql/database) or [GCP Cloud SQL](https://cloud.google.com/sql/).

If you're a user of these services, you can leverage their backup capabilities directly:
- [Creating a DB snapshot in AWS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html)
- [Backup and restore in Azure MySQL](https://learn.microsoft.com/en-us/azure/mysql/single-server/concepts-backup)
- [About GCP Cloud SQL backup](https://cloud.google.com/sql/docs/mysql/backup-recovery/backups)

## Requirements

- `mysqldump` 8.3 or higher 
- `pg_dump` 13.3 or higher

You **do not need to run the OpenMetadata docker-compose stack or the ingestion container** to take backups.
The examples below use a temporary `docker run` container that invokes the DB client directly.

## Storing the backup files

It's important that when you backup your database, you keep the snapshot safe in case you need in later.

You can check these two examples on how to:
- Use pipes to stream the result directly to S3 (or AWS blob storage) ([link](https://devcoops.com/pg_dump-to-s3-directly/?utm_content=cmp-true)).
- Dump to a file and copy to storage ([link](https://gist.github.com/bbcoimbra/0914c7e0f96e8ad53dfad79c64863c87)).

# Backup & Restore Examples (Recommended)

These examples assume your OpenMetadata metadata database is accessible on the network from the machine where you are running the commands.

There is **no need to start OpenMetadata or docker-compose**.

## MySQL

### 1. Backup

```bash
BACKUP_FILE="backup_$(date +%Y%m%d%H%M).sql"
docker run --rm mysql/mysql-server:latest \
  mysqldump --no-tablespaces \
  -u <user> \
  -p<password> \
  -h <mysql_host> \
  -P 3306 \
  <database> > "$BACKUP_FILE"
```

{% note %}

Replace <mysql_host> with your MySQL hostname (e.g., mysql, RDS endpoint, etc.).

The MySQL server does not need to run in docker; only the mysqldump client runs via docker.

{% /note %}

### 2. Restore

```bash
docker run --rm -i mysql/mysql-server:latest \
  mysql \
  -u <user> \
  -p<password> \
  -h <mysql_host> \
  -P 3306 \
  <database> < "$BACKUP_FILE"
```

## PostgreSQL

### 1. Backup

```bash
BACKUP_FILE="backup_$(date +%Y%m%d%H%M).sql"
docker run --rm \
  -e PGPASSWORD=<password> \
  postgres:latest \
  pg_dump \
    -U <user> \
    -h <postgres_host> \
    -p 5432 \
    <database> > "$BACKUP_FILE"
```

{% note %}

You must pass the password via PGPASSWORD env variable.

Replace <postgres_host> with your Postgres hostname.

{% /note %}

### 2. Restore

```bash
docker run --rm -i \
  -e PGPASSWORD=<password> \
  postgres:latest \
  psql \
    -U <user> \
    -h <postgres_host> \
    -p 5432 \
    <database> < "$BACKUP_FILE"
```
