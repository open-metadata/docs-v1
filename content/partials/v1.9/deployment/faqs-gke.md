## Expose OpenMetadata to the internet with GKE Ingress
To allow access from the internet into your OpenMetadata deployment, you will need to configure a GKE Ingress with proper timeout settings.

GKE Ingress has a default 30-second timeout for backend services. OpenMetadata operations like testing database connections and running ingestion workflows often exceed this limit, causing 502 Bad Gateway errors even though the operations complete successfully on the backend. A BackendConfig resource increases this timeout to prevent these errors.
```
apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: openmetadata-backendconfig
spec:
  timeoutSec: 60 # prevents timeout for operations like test workflows and metadata ingestion
```
Apply the BackendConfig:
```
kubectl  apply -f backendConfig.yaml --namespace <kubernetes_namespace>
```

Update the `ingress` and `service.annotations.*` helm values for OpenMetadata to create the ingress and use the BackendConfig. With OpenMetadata Helm Charts, your Helm values would look something like this:
```
ingress:
  enabled: true
  hosts:
    - host: openmetadata.<your-domain>
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: <your-ssl-secret-name> # Replace with your TLS secret name and make sure it exists in the same namespace
      hosts:
        - openmetadata.<your-domain>
service:
  annotations:
    cloud.google.com/backend-config: '{"default": "openmetadata-backendconfig"}'
    cloud.google.com/neg: '{"ingress": true}'
```

Once you make the above changes to your helm values, run the below command to install/upgrade helm charts:
```
helm upgrade --install openmetadata-dependencies open-metadata/openmetadata-dependencies --values <path-to-values-file> --namespace <kubernetes_namespace>
helm upgrade --install openmetadata open-metadata/openmetadata --values <path-to-values-file> --namespace <kubernetes_namespace>
```

Wait for a minute and retrieve the IP of the ingress:
```
kubectl get ingress --namespace <kubernetes_namespace>
```

Finally, add the IP to your DNS records.
