variable "functions" {
  type = list(object({
    name        = string
    handler     = string
    runtime     = string
    memory_size = number
    timeout     = number
  }))
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_lambda_function" "lambda" {
  for_each      = { for function in var.functions : function.name => function }
  function_name = each.value.name
  handler       = each.value.handler
  runtime       = each.value.runtime
  memory_size   = each.value.memory_size
  timeout       = each.value.timeout
  role          = aws_iam_role.iam_for_lambda.arn
  filename      = "${path.module}/../../src/functions/${each.value.name}/${each.value.name}.zip"

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.dynamodb_table.name
    }
  }
}
