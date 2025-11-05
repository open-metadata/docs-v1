---
title: LDAP SSO Configuration | OpenMetadata
description: Step-by-step guide to configure LDAP-based SSO using ADFS, Okta, or Shibboleth for secure enterprise authentication and federated login in OpenMetadata.
slug: /deployment/security/ldap/ldap-configuration
---

# LDAP SSO Configuration

- [Troubleshooting](#troubleshooting)

LDAP (Lightweight Directory Access Protocol) authentication enables users to log in using their enterprise directory credentials from systems such as **Active Directory**, **OpenLDAP**, or other LDAP-compatible identity providers.  

This guide explains how to configure LDAP as an authentication source in OpenMetadata.

{% image 
src="/images/v1.10/deployment/security/saml/saml1.png" 
alt="SAML SSO Configuration" /%}

## Configuration Fields

### Provider Name

- **Definition:** A human-readable name for this LDAP SSO configuration instance.
- **Example:** `Company LDAP`, `Corporate Directory`, `Internal LDAP`
- **Why it matters:** Used for display and logging purposes.
- **Note:** This name does not impact authentication behavior.

### Client ID

- **Definition:** Identifier for the LDAP authentication configuration.
- **Example:** `ldap-client-123`
- **Why it matters:** Helps track and manage LDAP configurations.
- **Note:** Optional for LDAP; mainly used for tracking.

### Callback URL

- **Definition:** Redirect URI where users land after LDAP authentication.
- **Example:** `https://yourapp.company.com/callback`
- **Why it matters:** Defines the return URL post-authentication.
- **Note:** Typically your OpenMetadata application URL.

### Authority

- **Definition:** Base URL for the LDAP authentication authority.
- **Example:** `https://yourapp.company.com/auth/ldap`
- **Why it matters:** Defines the endpoint OpenMetadata uses for LDAP requests.
- **Note:** Required for routing LDAP authentication calls.

### Enable Self Signup

- **Definition:** Allows users to automatically create accounts on their first LDAP login.
- **Options:** Enabled | Disabled
- **Example:** Enabled
- **Why it matters:** Controls whether new LDAP users are auto-provisioned.
- **Note:** Disable for stricter access control.

### Public Key URLs

- **Definition:** URLs where public keys are published for token verification.
- **Example:** `["https://yourapp.company.com/.well-known/jwks.json"]`
- **Why it matters:** Used when LDAP integrates with token-based authentication (LDAP + JWT).
- **Note:** Optional for pure LDAP configurations.

### Token Validation Algorithm

- **Definition:** Algorithm used to validate JWT tokens if LDAP uses token-based authentication.
- **Options:** RS256 | RS384 | RS512
- **Default:** RS256
- **Example:** RS256

### LDAP Host

- **Definition:** Hostname or IP address of your LDAP server.
- **Example:** `ldap.company.com` or `192.168.1.10`
- **Note:** Do not include `ldap://` or `ldaps://`.

### LDAP Port

- **Definition:** Port for the LDAP server connection.
- **Example:** `389` (LDAP), `636` (LDAPS)
- **Note:**  
  - Use **389** for standard LDAP  
  - Use **636** for secure LDAP (LDAPS)

### Max Pool Size

- **Definition:** Maximum number of concurrent connections in the LDAP pool.
- **Default:** 3
- **Example:** 5
- **Why it matters:** Controls connection performance and resource usage.

### Full DN Required

- **Definition:** Whether users must log in using their full Distinguished Name (DN).
- **Default:** false
- **Example:** false
- **Note:**  
  - `false`: Login with username only  
  - `true`: Requires full DN (e.g., `cn=john,ou=users,dc=company,dc=com`)

### Admin Principal DN

- **Definition:** Distinguished Name of the LDAP admin user used for searches.
- **Example:** `cn=admin,ou=system,dc=company,dc=com`
- **Why it matters:** Required to search for and authenticate users.
- **Note:** The account must have read access to users and groups.

### Admin Password

- **Definition:** Password for the LDAP admin user.
- **Example:** `adminPassword123`
- **Why it matters:** Required for binding to the LDAP directory.
- **Note:** Store securely (e.g., in a secret manager).

### SSL Enabled

- **Definition:** Enables secure LDAP (LDAPS).
- **Default:** false
- **Example:** true
- **Why it matters:** Encrypts communication between OpenMetadata and LDAP.
- **Note:**  
  - true → Use LDAPS (port 636)  
  - false → Use LDAP (port 389)

### User Base DN

- **Definition:** Base DN under which user accounts are stored.
- **Example:** `ou=users,dc=company,dc=com`
- **Why it matters:** Defines where to search for user entries.

### Group Base DN

- **Definition:** Base DN where group objects reside.
- **Example:** `ou=groups,dc=company,dc=com`
- **Why it matters:** Required for role-based authorization.
- **Note:** Optional if not using group-based role mapping.

### Admin Role Name

- **Definition:** LDAP group that maps to OpenMetadata admin role.
- **Example:** `OpenMetadata-Admins`
- **Why it matters:** Members of this group get admin privileges.

### All Attribute Name

- **Definition:** Attribute used to retrieve user attributes.
- **Example:** `*` or `memberOf`
- **Why it matters:** Defines which attributes to fetch from LDAP.

### Email Attribute Name

- **Definition:** LDAP attribute containing user email.
- **Example:** `mail`
- **Note:** Common values include `mail`, `email`, or `userPrincipalName`.

### Username Attribute Name

- **Definition:** LDAP attribute representing usernames.
- **Example:** `uid` or `sAMAccountName`
- **Note:**  
  - Active Directory: `sAMAccountName` or `userPrincipalName`  
  - OpenLDAP: `uid` or `cn`

### Group Attribute Name

- **Definition:** Attribute that defines group membership.
- **Example:** `memberOf`
- **Why it matters:** Determines user’s LDAP group membership.

### Group Member Attribute Name

- **Definition:** Attribute in group entries listing members.
- **Example:** `member` or `uniqueMember`

### Auth Roles Mapping

- **Definition:** JSON mapping of LDAP groups to OpenMetadata roles.
- **Example:** `{"LDAP-Admins": "Admin", "LDAP-Users": "User"}`
- **Why it matters:** Automatically assigns roles based on group membership.

### Auth Reassign Roles

- **Definition:** Roles that are re-evaluated each time a user logs in.
- **Example:** `["Admin", "DataConsumer"]`

### Trust Store Configuration

- **Definition:** Configuration for SSL/TLS trust management.
- **Why it matters:** Required for LDAPS with custom certificates.

### Trust Store Configuration Type

- **Definition:** Type of SSL trust management.
- **Options:** `TrustAll`, `JVMDefault`, `HostName`, `CustomTrustStore`
- **Example:** `CustomTrustStore`
- **Note:**  
  - `TrustAll`: Accepts all certificates (unsafe)  
  - `JVMDefault`: Uses system trust store  
  - `CustomTrustStore`: Uses a custom certificate store

### Verify Hostname

- **Definition:** Validates LDAP server certificate hostname.
- **Default:** false
- **Example:** true

### Examine Validity Dates

- **Definition:** Checks SSL certificate validity period.
- **Default:** false
- **Example:** true

### Trust Store File Path

- **Definition:** Path to truststore file containing trusted CA certificates.
- **Example:** `/path/to/truststore.jks`

### Trust Store File Password

- **Definition:** Password for accessing the truststore.
- **Example:** `truststorePassword123`

### Trust Store File Format

- **Definition:** Format of the truststore file.
- **Example:** `JKS` or `PKCS12`

### Allow Wildcards

- **Definition:** Accept wildcard certificates (e.g., `*.company.com`).
- **Default:** false
- **Example:** true

### Acceptable Host Names

- **Definition:** List of hostnames valid for SSL validation.
- **Example:** `["ldap.company.com", "ldap-backup.company.com"]`

### JWT Principal Claims

- **Definition:** Claims used to identify users in LDAP + JWT setups.
- **Example:** `["preferred_username", "email", "sub"]`

### JWT Principal Claims Mapping

- **Definition:** Maps LDAP attributes to OpenMetadata user fields.
- **Example:** `["email:mail", "name:displayName", "firstName:givenName"]`

### Admin Principals

- **Definition:** Users with administrative privileges.
- **Example:** `["admin@company.com", "superuser@company.com"]`

### Principal Domain

- **Definition:** Default domain for user principals.
- **Example:** `company.com`

### Enforce Principal Domain

- **Definition:** Restricts logins to specific domains.
- **Default:** false
- **Example:** true

### Enable Secure Socket Connection

- **Definition:** Enables SSL/TLS for LDAP communication.
- **Default:** false
- **Example:** true
- **Note:** Must be enabled for production deployments.

## Summary Table

| **Field**                   | **Example / Default**                                       |
|------------------------------|-------------------------------------------------------------|
| LDAP Host                    | ldap.company.com                                           |
| LDAP Port                    | 636                                                        |
| SSL Enabled                  | true                                                       |
| User Base DN                 | ou=users,dc=company,dc=com                                |
| Group Base DN                | ou=groups,dc=company,dc=com                               |
| Username Attribute           | uid                                                       |
| Email Attribute              | mail                                                      |
| Group Attribute              | memberOf                                                  |
| Admin Principal DN           | cn=admin,ou=system,dc=company,dc=com                      |
| Token Validation Algorithm   | RS256                                                     |
| Full DN Required             | false                                                     |
| Trust Store Config Type      | CustomTrustStore                                          |
| Verify Hostname              | true                                                      |
| Admin Principals             | ["admin@company.com"]                                     |
| Principal Domain             | company.com                                               |
| Enforce Principal Domain     | false                                                     |
| SSL/TLS                      | true                                                      |

{% partial file="/v1.10/deployment/sso-troubleshooting.md" /%}
