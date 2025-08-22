## Reverse Metadata



### Description Management

Trino supports description updates at the following levels:
- Table level
- Column level

### Owner Management

❌ Owner management is not supported for Trino.

### Tag Management

❌ Tag management is not supported for Trino.

### Custom SQL Template

Trino supports custom SQL templates for metadata changes. The template is interpreted using python f-strings.

Here are examples of custom SQL queries for metadata changes:

```sql
-- Update table description
COMMENT ON TABLE "{database}"."{schema}"."{table}" IS {description}
```

The list of variables for custom SQL can be found [here](/applications/reverse-metadata#custom-sql-template).

For more details about reverse metadata ingestion, visit our [Reverse Metadata Documentation](/applications/reverse-metadata).
