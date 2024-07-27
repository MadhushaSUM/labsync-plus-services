data "aws_iam_policy_document" "dynamodb_full_access" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "iam_lambda_dynamodb_full" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.dynamodb_full_access.json
}

resource "aws_iam_policy" "dynamodb_full_access" {
  name        = "DynamoDBFullAccess"
  description = "IAM policy for DynamoDB full access"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "dynamodb:*"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dynamodb_full_access" {
  policy_arn = aws_iam_policy.dynamodb_full_access.arn
  role       = aws_iam_role.iam_lambda_dynamodb_full.name
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