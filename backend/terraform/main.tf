provider "aws" {
  region = "us-east-1"
}

# resource "aws_s3_bucket" "avatar_bucket" {
#   bucket = "voicefork-avatars"
# }
# resource "aws_s3_bucket" "restaurant_images_bucket" {
#   bucket = "voicefork-restaurants-images"
# }

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
  networks          = var.networks
  vpc               = var.vpc
}
module "reservations" {
  source            = "./modules/reservations"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
  networks          = var.networks
  vpc               = var.vpc
}
module "embeddings" {
  source            = "./modules/embeddings"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
  networks          = var.networks
  vpc               = var.vpc
}
module "restaurants" {
  source            = "./modules/restaurants"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
  networks          = var.networks
  vpc               = var.vpc
  embeddings_url    = module.embeddings.embeddings_ip
}
module "proxy" {
  source            = "./modules/proxy"
  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
  users_ip          = module.users.users_ip
  reservations_ip   = module.reservations.reservations_ip
  restaurants_ip    = module.restaurants.restaurants_ip
  embeddings_ip     = module.embeddings.embeddings_ip
  networks          = var.networks
  vpc               = var.vpc
}

output "proxy_ip" {
  value = module.proxy.proxy_ip
}
