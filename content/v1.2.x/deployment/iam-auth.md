---
title: How to enable AWS RDS IAM Auth
slug: /deployment/rds-iam-auth
---

# Aws resources on RDS IAM Auth
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html

# Requirements

1. AWS RDS Cluster with IAM auth enabled
2. User on DB Cluster with IAM enabled
3. IAM policy with permission on RDS connect
4. Role with IAM policy attached
5. IAM role attached to an EC2 instance on which openmetadata is deployed or ServiceAccount/Kube2Iam role attached to pod.

# How to enable ADS RDS IAM Auth on postgresql

Set the environment variables

```Commandline
  DB_USER_PASSWORD: "dummy"
  DB_PARAMS: "awsRegion=eu-west-1&allowPublicKeyRetrieval=true&sslmode=require&serverTimezone=UTC"
```

Either through helm (if deployed in kubernetes) or as env vars.

{% note %}

The `DB_USER_PASSWORD` is still required and cannot be empty. Set it to a random/dummy string.

{% /note %} 
