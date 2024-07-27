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
    lambda_function = string
  }))
}
