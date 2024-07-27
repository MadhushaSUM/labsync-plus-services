provider "aws" {
  region     = var.aws_region
  access_key = var.access_key
  secret_key = var.secret_key
}

module "lambda_functions" {
  source = "./modules/lambda"
  functions = [
    {
      name        = "create-patient"
      handler     = "index.handler"
      filename    = "patient/create-patient/create-patient.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 5
    },
    {
      name        = "update-patient"     
      handler     = "index.handler"  
      filename    = "patient/update-patient/update-patient.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 5
    },
    # More functions...
  ]
}

# module "dynamodb_tables" {
#   source = "./modules/dynamodb"
#   tables = [
#     {
#       name           = "table1"
#       hash_key       = "id"
#       read_capacity  = 5
#       write_capacity = 5
#       attributes = [
#         { name = "id", type = "S" }
#       ]
#     },
#     {
#       name           = "table2"
#       hash_key       = "id"
#       read_capacity  = 5
#       write_capacity = 5
#       attributes = [
#         { name = "id", type = "S" }
#       ]
#     }
#   ]
# }

# module "api_gateway" {
#   source = "./modules/apigateway"
#   name = "my-api-gateway"
#   description = "API Gateway for my serverless application"
#   endpoints = [
#     {
#       path = "/function1"
#       method = "GET"
#       lambda_function = module.lambda_functions.function1
#     },
#     {
#       path = "/function2"
#       method = "GET"
#       lambda_function = module.lambda_functions.function2
#     },
#     # More endpoints...
#   ]
# }