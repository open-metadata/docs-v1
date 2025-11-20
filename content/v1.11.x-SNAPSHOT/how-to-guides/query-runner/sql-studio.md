---
title: SQL Studio | Collate Query Runner Guide
description: Learn how to write, run, and manage SQL queries in SQL Studio after connecting through Query Runner.
slug: /how-to-guides/query-runner/sql-studio
collate: true
---

# SQL Studio User Guide

Once connected to a database service through Query Runner, you can write and execute SQL queries in the SQL Studio interface.


## SQL Studio Layout

```
┌──────────────────────────────────────────────────────┐
│  [Service Selector ▼]  [Status: Connected 🟢]       │
├────────────┬─────────────────────────────────────────┤
│            │  Query Tab 1   Query Tab 2  [+ New]    │
│  Saved     │  ┌──────────────────────────────────┐   │
│  Queries   │  │ SELECT * FROM users LIMIT 10     │   │
│            │  │                                   │   │
│  Database  │  │                                   │   │
│  Explorer  │  └──────────────────────────────────┘   │
│            │  [▶ Run]  [💾 Save]  [⚙ Settings]     │
│  • project │  ─────────────────────────────────────  │
│    • dataset│ Results                                │
│      • table│ ┌──────────────────────────────────┐  │
│             │ │ name     │ email              │   │  │
│             │ │──────────│────────────────────│   │  │
│             │ │ Alice    │ [alice@example.com](mailto:alice@example.com)  │   │  │
│             │ │ Bob      │ [bob@example.com](mailto:bob@example.com)    │   │  │
│             │ └──────────────────────────────────┘  │
│             │ 2 rows • 123ms                        │
└────────────┴─────────────────────────────────────────┘
```

## Writing Queries

### SQL Editor Features

The SQL Editor provides:

- **Syntax Highlighting**: SQL keywords, strings, and comments are color-coded
- **Auto-complete**: Press `Ctrl+Space` for suggestions (table names, column names, keywords)
- **Multi-line Editing**: Write complex queries across multiple lines
- **Line Numbers**: Easy reference for debugging
- **Keyboard Shortcuts**:
    - `Cmd/Ctrl + Enter`: Execute query
    - `Cmd/Ctrl + S`: Save query
    - `Tab`: Indent selection
    - `Shift + Tab`: Unindent selection

### Query Best Practices

1. **Always use LIMIT**: Avoid fetching large datasets
    
    ```sql
    SELECT * FROM large_table LIMIT 100;
    ```
    
2. **Filter with WHERE**: Reduce data at the source
    
    ```sql
    SELECT name, email FROM users WHERE created_at > '2024-01-01';
    ```
    
3. **Use fully qualified names**: Specify database/schema/table
    
    ```sql
    -- BigQuery
    SELECT * FROM `project.dataset.table` LIMIT 10;
    
    -- Snowflake
    SELECT * FROM database.schema.table LIMIT 10;
    
    -- Trino
    SELECT * FROM catalog.schema.table LIMIT 10;
    ```
    
4. **Preview table structure**: Quickly see columns and sample data
    
    ```sql
    SELECT * FROM table LIMIT 5;
    ```

## Executing Queries

1. Write your SQL query in the editor
2. Click the **Run** button (▶️) in the toolbar, OR press `Cmd/Ctrl + Enter`
3. Query execution starts:
    - Status indicator shows "Running…"
    - Execution time counter starts
4. Results appear in the **Results Panel** below:
    - **Column headers**: Clickable for sorting (if supported)
    - **Data rows**: Up to max result size (typically 100 rows)
    - **Footer**: Shows row count and execution time (e.g., "45 rows • 234ms")

**Query Execution Limits**:

- **Max Result Size**: Set by admin (typically 100 rows)
- **Timeout**: Queries timeout after a configured duration (typically 5 minutes)
- **Permissions**: You can only query objects you have access to in the database

**Handling Errors**:

- Syntax errors: Red underline in editor + error message in results panel
- Permission errors: "Access denied" message with details
- Timeout errors: "Query timed out" message - optimize your query

## Managing Query Tabs

Work with multiple queries simultaneously using tabs:

### Creating a New Tab

1. Click **+ New Query** button in the tab bar
2. A new empty tab opens with a default name (e.g., "Query 1", "Query 2")

### Switching Between Tabs

1. Click on tab names to switch
2. Active tab is highlighted
3. Each tab maintains its own query text and results

### Renaming a Tab

1. Double-click on the tab name
2. Enter a new name (e.g., "User Analysis", "Revenue Report")
3. Press `Enter` to save

### Closing a Tab

1. Click the **×** icon on the tab
2. Unsaved changes are lost (queries are not auto-saved)
3. At least one tab must remain open

**Note**: Query tabs are session-based and not persisted. To keep queries, use the **Save Query** feature.

## Saving Queries

Save frequently-used queries for quick access:

### Save a Query

1. Write your query in the editor
2. Click **Save Query** in the toolbar
3. Enter a meaningful name (e.g., "Daily Active Users", "Revenue by Region")
4. Click **Save**
5. Query appears in the **Saved Queries** section of the sidebar

### Load a Saved Query

1. Navigate to **Saved Queries** in the left sidebar
2. Click on the query name
3. Query text loads into the current editor tab
4. Execute or modify as needed

### Edit a Saved Query

1. Load the query into the editor
2. Make your changes
3. Click **Save Query** again
4. Choose **Update existing** to overwrite, or **Save as new** to create a copy

### Delete a Saved Query

1. Hover over the query in the **Saved Queries** sidebar
2. Click the **Delete** (🗑️) icon
3. Confirm deletion
4. Query is permanently removed

**Note**: Saved queries are private to you. To share, copy the query text and send to your team.

## Exploring Database Metadata

The **Database Explorer** in the sidebar shows the structure of your database:

### Hierarchy

Depending on the service, you'll see:

- **BigQuery**: Projects → Datasets → Tables
- **Snowflake**: Databases → Schemas → Tables
- **Trino**: Catalogs → Schemas → Tables

### Browsing

1. Click the **▶** icon next to a database/project/catalog to expand
2. Expand schemas/datasets to view tables
3. Click on a table name to:
    - View table metadata (columns, types)
    - Insert table name into editor at cursor position

### Using Table Names

1. Expand to the table you want to query
2. Double-click the table name
3. Fully-qualified table name is inserted into editor:
    - BigQuery:  `project.dataset.table`
    - Snowflake: `database.schema.table`
    - Trino: `catalog.schema.table`
4. Build your query around it

**Example**:

```sql
-- Double-click on users table in explorer
-- This gets inserted:
SELECT * FROM `[my-project.analytics](http://my-project.analytics).users` LIMIT 10;
```

## Query Results

### Results Display

Results appear in a table format with:

- **Column Headers**: Show column names from your SELECT statement
- **Data Rows**: Up to the configured max result size
- **Scrolling**: Vertical and horizontal scroll for large results
- **Footer**:
    - Row count (e.g., "45 rows" or "100 rows (limit reached)")
    - Execution time (e.g., "234ms")

### Interacting with Results

- **Sort**: Click column headers to sort (if supported)
- **Copy**: Select cells and copy to clipboard
- **Export**: (Future feature) Export to CSV, JSON, or Excel

### Result Limits

- Maximum rows returned is set by admin (typically 100)
- If your query returns more rows, results are truncated
- Footer indicates: "100 rows (limit reached)"
- Use `LIMIT` clause in your query to control result size

**Example**:

```sql
-- Returns first 10 rows
SELECT * FROM large_table LIMIT 10;

-- Returns rows 11-20 (pagination)
SELECT * FROM large_table LIMIT 10 OFFSET 10;
```

## Service-Specific Query Syntax

### BigQuery

**Fully Qualified Names**:

```sql
SELECT * FROM `project-id.dataset_name.table_name` LIMIT 10;
```

**Standard SQL**:

```sql
SELECT name, COUNT(*) as count
FROM `project.dataset.users`
WHERE created_at > '2024-01-01'
GROUP BY name
ORDER BY count DESC
LIMIT 10;
```

**Cross-Project Queries**:

```sql
SELECT *
FROM `project-1.dataset.table1` t1
JOIN `project-2.dataset.table2` t2
  ON [t1.id](http://t1.id) = [t2.id](http://t2.id)
LIMIT 10;
```

**Common Functions**:

- `DATE()`, `TIMESTAMP()`: Date/time functions
- `ARRAY_AGG()`: Aggregate into array
- `STRUCT()`: Create structured data

### Snowflake

**Fully Qualified Names**:

```sql
SELECT * FROM database_name.schema_name.table_name LIMIT 10;
```

**Using Warehouse/Database/Schema**:

```sql
USE WAREHOUSE compute_wh;
USE DATABASE analytics;
USE SCHEMA public;
SELECT * FROM users LIMIT 10;
```

**Common Functions**:

- `DATEADD()`, `DATEDIFF()`: Date arithmetic
- `LISTAGG()`: Aggregate to comma-separated list
- `FLATTEN()`: Unnest arrays

**Role-Based Access**:

```sql
USE ROLE analyst_role;
SELECT * FROM sensitive_table LIMIT 10;
```

### Trino

**Fully Qualified Names**:

```sql
SELECT * FROM catalog_name.schema_name.table_name LIMIT 10;
```

**Cross-Catalog Queries** (Federated):

```sql
SELECT 
  [postgres.public.users.name](http://postgres.public.users.name),
  [mysql.analytics.orders.total](http://mysql.analytics.orders.total)
FROM postgres.public.users
JOIN [mysql.analytics](http://mysql.analytics).orders
  ON [users.id](http://users.id) = orders.user_id
LIMIT 10;
```

**Common Functions**:

- `date_format()`, `from_unixtime()`: Date functions
- `array_agg()`: Aggregate into array
- `regexp_extract()`: Regex extraction
