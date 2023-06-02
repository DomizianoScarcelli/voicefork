variable "voicefork_cluster" {
  description = "AWS ECS Cluster resource for voicefork"
  type = object({
    arn  = string
    name = string
    id   = string
  })
}
