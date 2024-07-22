variable "name" {
  description = "The name of the API Gateway"
  type        = string
}

variable "description" {
  description = "The description of the API Gateway"
  type        = string
}

variable "endpoints" {
  description = "List of API Gateway endpoints"
  type = list(object({
    path            = string
    method          = string
    lambda_function = any
  }))
}

resource "aws_api_gateway_rest_api" "api" {
  name        = var.name
  description = var.description
}

resource "aws_api_gateway_resource" "resource" {
  for_each   = { for endpoint in var.endpoints : endpoint.path => endpoint }
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = each.value.path
}

resource "aws_api_gateway_method" "method" {
  for_each = var.endpoints
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource[each.key].id
  http_method   = each.value.method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  for_each = var.endpoints
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource[each.key].id
  http_method   = aws_api_gateway_method.method[each.key].http_method
  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = each.value.lambda_function.invoke_arn
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [aws_api_gateway_method.method]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"
}

output "url" {
  value = aws_api_gateway_deployment.deployment.invoke_url
}
