variable "vpc" {
  type = string
}

variable "voicefork_cluster" {
  description = "AWS ECS Cluster resource for voicefork"
  type = object({
    arn  = string
    name = string
    id   = string
  })
}

variable "networks" {
  type = map(any)

}

variable "embeddings_url" {
  description = "Url of the embeddings load balancer"
}

variable "database_url" {
  description = "Url of the RDS database"
}
