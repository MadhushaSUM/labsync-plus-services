provider "aws" {
  region     = var.aws_region
  access_key = var.access_key
  secret_key = var.secret_key
}

module "lambda_functions" {
  source = "./modules/lambda"
  functions = [
    {
      name        = "create-patient2"
      handler     = "index.handler"
      filename    = "patient/create-patient/create-patient.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 5
    },
    {
      name        = "update-patient2"     
      handler     = "index.handler"  
      filename    = "patient/update-patient/update-patient.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 5
    }
  ]
}

module "dynamodb_tables" {
  source = "./modules/dynamodb"
  tables = [
    {
      name           = "PatientTable1"
      hash_key       = "id"
      read_capacity  = 5
      write_capacity = 5
      attributes = [
        { name = "id", type = "S" }
      ]
    }
  ]
}

# module "api_gateway" {
#   source      = "./modules/apigateway"
#   name        = "my-api-gateway"
#   description = "API Gateway for my serverless application"
#   endpoints   = [
#     {
#       path            = "patient"
#       method          = "POST"
#       lambda_function = module.lambda_functions.lambda_function_arns["create-patient2"]
#     },
#     {
#       path            = "patient"
#       method          = "PUT"
#       lambda_function = module.lambda_functions.lambda_function_arns["update-patient2"]
#     },
#     {
#       path            = "patient"
#       method          = "GET"
#       lambda_function = module.lambda_functions.lambda_function_arns["get-patient-by-id2"]
#     },
#     {
#       path            = "patients"
#       method          = "GET"
#       lambda_function = module.lambda_functions.lambda_function_arns["get-all-patients2"]
#     }
#   ]
# }
