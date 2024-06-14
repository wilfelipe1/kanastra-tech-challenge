import boto3
bucket_name = 'debt-processing'

s3_client = boto3.client(
    "s3",
    endpoint_url=f"http://localhost:4566",
    aws_access_key_id="test",
    aws_secret_access_key="test"
)

s3_client.create_bucket(Bucket=bucket_name)

cors_rules = {
    'CORSRules': [
        {
            'AllowedOrigins': ['*'],
            'AllowedMethods': ['GET', 'PUT'],
            'AllowedHeaders': ['*'],
            'MaxAgeSeconds': 3000,
            'ExposeHeaders': ['x-amz-server-side-encryption']
        }
    ]
}

# Configurar as regras de CORS no bucket
s3_client.put_bucket_cors(Bucket=bucket_name, CORSConfiguration=cors_rules)
