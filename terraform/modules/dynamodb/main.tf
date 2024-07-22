variable "tables" {
  type = list(object({
    name           = string
    hash_key       = string
    read_capacity  = number
    write_capacity = number
    attributes = list(object({
      name = string
      type = string
    }))
  }))
}

resource "aws_dynamodb_table" "dynamodb_table" {
  for_each       = { for table in var.tables : table.name => table }
  name           = each.value.name
  hash_key       = each.value.hash_key
  billing_mode   = "PROVISIONED"
  read_capacity  = each.value.read_capacity
  write_capacity = each.value.write_capacity


  dynamic "attribute" {
    for_each = each.value.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }
}
