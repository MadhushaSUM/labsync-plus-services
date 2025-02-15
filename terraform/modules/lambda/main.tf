data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "iam_lambda_role" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_iam_policy" "rds_connect_policy" {
  name        = "RDSConnectPolicy"
  description = "IAM policy for RDS connection"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "rds:DescribeDBInstances"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "rds_connect_policy_attachment" {
  policy_arn = aws_iam_policy.rds_connect_policy.arn
  role      = aws_iam_role.iam_lambda_role.name
}

resource "aws_lambda_function" "lambda" {
  for_each      = { for function in var.functions : function.name => function }
  function_name = each.value.name
  handler       = each.value.handler
  runtime       = each.value.runtime
  memory_size   = each.value.memory_size
  timeout       = each.value.timeout
  role          = aws_iam_role.iam_lambda_role.arn
  filename      = "${path.module}/../../../bundled/${each.value.filename}"

  source_code_hash = filebase64sha256("${path.module}/../../../bundled/${each.value.filename}")
}