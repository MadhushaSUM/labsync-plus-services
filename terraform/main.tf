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
    # {
    #   name        = "update-patient"     
    #   handler     = "index.handler"  
    #   filename    = "patient/update-patient/update-patient.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    {
      name        = "get-all-patients"     
      handler     = "index.handler"  
      filename    = "patient/get-all-patients/get-all-patients.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 5
    },
    # {
    #   name        = "get-patient-by-id"     
    #   handler     = "index.handler"  
    #   filename    = "patient/get-patient-by-id/get-patient-by-id.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "create-doctor"
    #   handler     = "index.handler"
    #   filename    = "doctor/create-doctor/create-doctor.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "update-doctor"     
    #   handler     = "index.handler"  
    #   filename    = "doctor/update-doctor/update-doctor.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "get-all-doctors"     
    #   handler     = "index.handler"  
    #   filename    = "doctor/get-all-doctors/get-all-doctors.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "get-doctor-by-id"     
    #   handler     = "index.handler"  
    #   filename    = "doctor/get-doctor-by-id/get-doctor-by-id.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "get-investigation-by-id"     
    #   handler     = "index.handler"  
    #   filename    = "investigation/get-investigation-by-id/get-investigation-by-id.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "add-investigation-registration"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-register/add-investigation-registration/add-investigation-registration.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "update-investigation-registration"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-register/update-investigation-registration/update-investigation-registration.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "get-all-investigation-registrations"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-register/get-all-investigation-registrations/get-all-investigation-registrations.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "confirm-investigation-registration"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-register/confirm-investigation-registration/confirm-investigation-registration.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "add-investigation-data"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-data/add-investigation-data/add-investigation-data.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "get-investigation-data"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-data/get-investigation-data/get-investigation-data.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # },
    # {
    #   name        = "update-investigation-data"     
    #   handler     = "index.handler"  
    #   filename    = "investigation-data/update-investigation-data/update-investigation-data.zip"
    #   runtime     = "nodejs20.x"
    #   memory_size = 128
    #   timeout     = 5
    # }
  ]
}

# module "dynamodb_tables" {
#   source = "./modules/dynamodb"
#   tables = [
#     {
#       name           = "PatientTable"
#       hash_key       = "id"
#       read_capacity  = 5
#       write_capacity = 5
#       attributes = [
#         { name = "id", type = "S" }
#       ]
#     },
#     {
#       name           = "DoctorTable"
#       hash_key       = "id"
#       read_capacity  = 5
#       write_capacity = 5
#       attributes = [
#         { name = "id", type = "S" }
#       ]
#     },
#     {
#       name           = "InvestigationTable"
#       hash_key       = "id"
#       read_capacity  = 5
#       write_capacity = 5
#       attributes = [
#         { name = "id", type = "S" }
#       ]
#     },
#     {
#       name           = "InvestigationRegisterTable"
#       hash_key       = "id"
#       read_capacity  = 5
#       write_capacity = 5
#       attributes = [
#         { name = "id", type = "S" }
#       ]
#     },
#     {
#       name           = "InvestigationDataTable"
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
