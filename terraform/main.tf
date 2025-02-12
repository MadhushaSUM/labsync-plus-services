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
      timeout     = 120
    },
    {
      name        = "update-patient"     
      handler     = "index.handler"  
      filename    = "patient/update-patient/update-patient.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-all-patients"     
      handler     = "index.handler"  
      filename    = "patient/get-all-patients/get-all-patients.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-patient-by-id"     
      handler     = "index.handler"  
      filename    = "patient/get-patient-by-id/get-patient-by-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "search-patient-by-name"     
      handler     = "index.handler"  
      filename    = "patient/search-patient-by-name/search-patient-by-name.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "create-doctor"
      handler     = "index.handler"
      filename    = "doctor/create-doctor/create-doctor.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "update-doctor"     
      handler     = "index.handler"  
      filename    = "doctor/update-doctor/update-doctor.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-all-doctors"     
      handler     = "index.handler"  
      filename    = "doctor/get-all-doctors/get-all-doctors.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-doctor-by-id"     
      handler     = "index.handler"  
      filename    = "doctor/get-doctor-by-id/get-doctor-by-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-investigation-by-id"     
      handler     = "index.handler"  
      filename    = "investigation/get-investigation-by-id/get-investigation-by-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "add-investigation-registration"     
      handler     = "index.handler"  
      filename    = "investigation-register/add-investigation-registration/add-investigation-registration.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "update-investigation-registration"     
      handler     = "index.handler"  
      filename    = "investigation-register/update-investigation-registration/update-investigation-registration.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-all-investigation-registrations"     
      handler     = "index.handler"  
      filename    = "investigation-register/get-all-investigation-registrations/get-all-investigation-registrations.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "add-investigation-data"     
      handler     = "index.handler"  
      filename    = "investigation-data/add-investigation-data/add-investigation-data.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-investigation-data"     
      handler     = "index.handler"  
      filename    = "investigation-data/get-investigation-data/get-investigation-data.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "update-investigation-data"     
      handler     = "index.handler"  
      filename    = "investigation-data/update-investigation-data/update-investigation-data.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-data-empty-investigations"     
      handler     = "index.handler"  
      filename    = "investigation-data/get-data-empty-investigations/get-data-empty-investigations.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-data-added-investigations"
      handler     = "index.handler"
      filename    = "investigation-data/get-data-added-investigations/get-data-added-investigations.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "mark-investigation-as-printed"
      handler     = "index.handler"
      filename    = "investigation-data/mark-investigation-as-printed/mark-investigation-as-printed.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-all-audit-trail-records"
      handler     = "index.handler"
      filename    = "audit-trail/get-all-audit-trail-records/get-all-audit-trail-records.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-all-investigations"
      handler     = "index.handler"
      filename    = "investigation/get-all-investigations/get-all-investigations.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "update-investigation-price"
      handler     = "index.handler"
      filename    = "investigation/update-investigation-price/update-investigation-price.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-investigation-fields-by-test-id"
      handler     = "index.handler"
      filename    = "investigation/get-investigation-fields-by-test-id/get-investigation-fields-by-test-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "add-update-normal-range-by-test-field-id"
      handler     = "index.handler"
      filename    = "normal-ranges/add-update-normal-range-by-test-field-id/add-update-normal-range-by-test-field-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-normal-ranges-by-test-field-id"
      handler     = "index.handler"
      filename    = "normal-ranges/get-normal-ranges-by-test-field-id/get-normal-ranges-by-test-field-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-normal-ranges-by-test-id"
      handler     = "index.handler"
      filename    = "normal-ranges/get-normal-ranges-by-test-id/get-normal-ranges-by-test-id.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
    {
      name        = "get-patient-analysis"
      handler     = "index.handler"
      filename    = "analysis/get-patient-analysis/get-patient-analysis.zip"
      runtime     = "nodejs20.x"
      memory_size = 128
      timeout     = 120
    },
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
