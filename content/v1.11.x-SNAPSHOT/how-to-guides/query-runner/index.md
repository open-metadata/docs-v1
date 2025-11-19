---
title: Query Runner Overview | Collate Query Runner Guide
description: Learn what Query Runner is, supported services, and how it powers the SQL Studio experience in Collate.
slug: /how-to-guides/query-runner
collate: true
---

# Query Runner User Guide

## 1. Introduction to Query Runner

Query Runner is a powerful feature in OpenMetadata Collate that allows you to execute SQL queries directly against your configured database services from within the UI. This eliminates the need to switch between different database clients and provides a unified interface for data exploration and analysis.

### Key Benefits

- **Unified Interface**: Execute queries across multiple database services from a single interface
- **Secure Authentication**: Support for OAuth, SSO, and Basic Authentication with encrypted credential storage
- **Query Management**: Save, organize, and reuse frequently-used queries
- **Database Explorer**: Browse databases, schemas, and tables visually
- **Audit Trail**: All queries are logged for compliance and security

### Supported Database Services

Query Runner currently supports:
- **BigQuery** (Google Cloud Platform)
- **Snowflake**
- **Trino** (Starburst)

### Query Runner Workflow

```
Admin Configuration → User Authentication → SQL Studio → Query Execution
```

1. **Admin** configures Query Runner for a database service and sets authentication method
2. **User** authenticates and establishes a connection to the service
3. **User** writes and executes queries in SQL Studio
4. **Results** are displayed with execution time and row counts
