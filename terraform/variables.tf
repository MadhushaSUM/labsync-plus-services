variable "aws_region" {
  description = "The AWS region to create resources in"
  type        = string
  default     = "us-east-1"
}

variable "access_key" {
  description = "AWS access key"
  type        = string
}

variable "secret_key" {
  description = "AWS secret key"
  type        = string
}

# variable "endpoints" {
#   description = "List of API Gateway endpoints"
#   type = list(object({
#     path            = string
#     method          = string
#     lambda_function = string
#   }))
# }
