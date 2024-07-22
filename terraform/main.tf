provider "aws" {
  region     = var.aws_region
  access_key = var.access_key
  secret_key = var.secret_key
}

module "lambda_functions" {
  source = "./modules/lambda"
  functions = [
    {
      name        = "function1"
      handler     = "src/functions/function1/handler.handler"
      runtime     = "nodejs14.x"
      memory_size = 128
      timeout     = 10
    },
    {
      name        = "function2"
      handler     = "src/functions/function2/handler.handler"
      runtime     = "nodejs14.x"
      memory_size = 128
      timeout     = 10
    },
    # More functions...
  ]
}

module "dynamodb_tables" {
  source = "./modules/dynamodb"
  tables = [
    {
      name           = "table1"
      hash_key       = "id"
      read_capacity  = 5
      write_capacity = 5
      attributes = [
        { name = "id", type = "S" }
      ]
    },
    {
      name           = "table2"
      hash_key       = "id"
      read_capacity  = 5
      write_capacity = 5
      attributes = [
        { name = "id", type = "S" }
      ]
    }
  ]
}
