provider "aws" {
  region = "us-east-1"
}

resource "aws_ecs_cluster" "voicefork_cluster" {
  name = "voicefork-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

module "users" {
  source            = "./modules/users"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}
module "reservations" {
  source            = "./modules/reservations"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}
module "restaurants" {
  source            = "./modules/restaurants"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}
module "embeddings" {
  source            = "./modules/embeddings"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}
module "proxy" {
  source            = "./modules/proxy"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
  users_ip          = module.users.users_ip
  reservations_ip   = module.reservations.reservations_ip
  restaurants_ip    = module.restaurants.restaurants_ip
  embeddings_ip     = module.embeddings.embeddings_ip
}
