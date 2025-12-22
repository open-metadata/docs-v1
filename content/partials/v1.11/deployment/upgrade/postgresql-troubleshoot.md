### Azure PostgreSQL Extension Issue During 1.11.0 Migration

During the `1.11.0` database migration, OpenMetadata attempts to execute the following SQL command:

```
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

However, when using **Azure Database for PostgreSQL - Flexible Server**, extensions like pg_trgm must be explicitly allow-listed by the administrator.

Since `pg_trgm` is not allow-listed by default, Azure returns the following error:

```
ERROR: extension "pg_trgm" is not allow-listed for users in Azure Database for PostgreSQL
```

This error causes the migration to fail before completing the schema updates.

**Recommended Action**
Ensure that the pg_trgm extension is added to the allow-list in your Azure PostgreSQL server settings prior to running the migration.
