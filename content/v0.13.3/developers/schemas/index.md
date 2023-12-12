---
title: Schemas
slug: /developers/schemas
---

# Schema Concepts

## Types

JSON schema supports many native types - `null`, `boolean`, `object`, `array`, `number` and `string`. In addition, to develop clear and consistent vocabulary, domain-specific reusable types are defined ranging from simple types, such as `UUID`, `timestamp`, and `email` to more complex object types, such as `Tags`, `Ownership` and `Usage`.

## Entities

An Entity is a special type that has an identity and represents an object that is either real or conceptual. An entity can be related to another entity through relationships. An Entity has two types of **Fields** - **Attributes** and **Relationships**:

### **Attributes**

**Attributes** represent an Entity’s data. Entities MUST include an attribute called **ID** that uniquely identifies an instance of an entity. It might optionally include a human-readable **fullyQualitifedName** attribute that uniquely identifies the entity. An attribute of an entity MUST not be another Entity and should be captured through a relationship. Entities typically SHOULD have the following common attributes:

| Abstract               | Extensible                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**                 | Mandatory attribute of type `UUID` that identifies the entity instance                                                                                                                                                                                                                                                                                            |
| **name**               | Name of the entity (example database name). For some entities, the name may uniquely identify an entity.                                                                                                                                                                                                                                                          |
| **fullyQualifiedName** | Human-readable name that uniquely identifies an entity that is formed using all the names in the hierarchy above the given entity. Example - `databaseService.database.table.` Attributes of an entity may also have `FQN` to uniquely identify a field. For example, a column of a table has `fqn` attribute set to `databaseService.database.table.columnName.` |
| **displayName**        | Optional name used for display purposes. For example, the name could be`john.smith@domain.com` and `displayName` could be `John Smith.`                                                                                                                                                                                                                           |
| **description**        | Description of the entity instance. Not all entities need a description. For example, a User entity might not need a description and just the name of the user might suffice. An`Database` entity needs `description` to provide details of what is stored in the database when to use it and other information on how to use it.                                 |
| **Owner**              | The Optional attribute is used to capture the ownership information. Not all entities have ownership information (for example `User, Team`, and `Organization`).                                                                                                                                                                                                  |
| **href**               | An attribute generated on the fly as part of API response to provide the URL link to the entity returned.                                                                                                                                                                                                                                                         |

### **Relationships**

**Relationships** capture information about the association of an Entity with another Entity. Relationships can have cardinality - **One-to-one**, **One-to-many**, **Many-to-one**, and **Many-to-many**. Example of relationships:

* One-to-one: A Table is owned by a User
* One-to-many: a Database contains multiple Tables.
* Many-to-many: A User belongs to multiple Teams. A team has multiple Users.

All relationships are captured using the`EntityReference`type.

Following is an example of a JSON schema of the User entity with attributes id, displayName, and email. User entity has one-to-many relationships to another entity Team (user is member of multiple teams).

```javascript
{
  "title": "User entity",
  "type": "object",

  "properties" : {
    "id": {
      "description": "Unique identifier for instance of a User",
      "$ref": "#/definitions/uuid"
    },
    "displayName": {
      "description": "Name used for display purposes. Example 'John Smith'",
      "type" : "string"
    },
    "email": {
      "description": "User's Email",
      "type": "string"
    },
   "teams" : {
      "description": "Teams that this user belongs to",
      "type": "array",
      "items" :{
        "$ref": "#/definitions/entityReference"
      }
   }
  }
}
```

### OpenMetadata JSON Schemas
For a complete list of OpenMetadata JSON Schema specification click [here](https://github.com/open-metadata/OpenMetadata/tree/main/openmetadata-spec/src/main/resources/json/schema)