output "table_names" {
  value = { for k, v in aws_dynamodb_table.dynamodb_table : k => v.name }
}
