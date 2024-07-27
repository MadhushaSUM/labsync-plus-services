variable "functions" {
  type = list(object({
    name        = string
    handler     = string
    filename    = string
    runtime     = string
    memory_size = number
    timeout     = number
  }))
}

data "aws_iam_policy_document" "dynamodb_full_access" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_lambda_dynamodb_full" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.dynamodb_full_access.json
}

resource "aws_lambda_function" "lambda" {
  for_each      = { for function in var.functions : function.name => function }
  function_name = each.value.name
  handler       = each.value.handler
  runtime       = each.value.runtime
  memory_size   = each.value.memory_size
  timeout       = each.value.timeout
  role          = aws_iam_role.iam_lambda_dynamodb_full.arn
  filename      = "${path.module}/../../../bundled/${each.value.filename}"
}

