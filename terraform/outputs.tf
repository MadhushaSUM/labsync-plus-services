# output "api_gateway_url" {
#   value = module.api_gateway.url
# }

output "Lambdas" {
  value = module.lambda_functions.lambda_function_arns
}