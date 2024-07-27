output "lambda_function_arns" {
  value = { for name, lambda in aws_lambda_function.lambda : name => lambda.arn }
}
