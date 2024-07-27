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
