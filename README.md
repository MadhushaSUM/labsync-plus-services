# labsync-plus-services
Serverless backend of labsync-plus project

must have terraform.tfvars file with these data

access_key = "YOUR_AWS_ACCESS_KEY"

secret_key = "YOUR_AWS_SECRET_KEY"

Use following command to bundle code with Webpack
npx webpack --config webpack.config.js

Had to migrate to RDS PostgreSQL due to DynamoDB's limited support to server-side pagination (limit, skip params)

RDS need trust certificates with lambda requests for now these SSL errors are suppressed 
need db_credentials.ts file in src/shared/lib directory

export const db_credentials = {
    user: __,
    host: __,
    database: __,
    password: __,
    port: __,
}