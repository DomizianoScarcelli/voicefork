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

variable "users_ip" {
  description = "Public IP address of the users service"
}

variable "reservations_ip" {
  description = "Public IP address of the reservations service"
}

variable "restaurants_ip" {
  description = "Public IP address of the restaurants service"
}

variable "embeddings_ip" {
  description = "Public IP address of the embeddings service"
}
