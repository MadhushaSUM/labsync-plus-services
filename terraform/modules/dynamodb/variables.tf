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