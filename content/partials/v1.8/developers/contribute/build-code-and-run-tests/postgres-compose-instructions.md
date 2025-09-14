{%note%}
If you're following this tutorial using the Postgres compose file (`docker/development/docker-compose-postgres.yml`), make sure you set the following environment variables to override the default OpenMetadata settings.

```
DB_DRIVER_CLASS=org.postgresql.Driver
DB_PORT=5432
DB_SCHEME=postgresql
SEARCH_TYPE=opensearch
```
{%/note%}
