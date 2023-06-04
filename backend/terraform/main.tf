provider "aws" {
  region = "us-east-1"
}

module "restaurants-db" {
  source   = "./modules/databases/restaurants-db"
  networks = var.networks
}

# resource "aws_s3_bucket" "avatar_bucket" {
#   bucket = "voicefork-avatars"
# }
# resource "aws_s3_bucket" "restaurant_images_bucket" {
#   bucket = "voicefork-restaurants-images"
# }

# resource "aws_ecs_cluster" "voicefork_cluster" {
#   name = "voicefork-cluster"
#   setting {
#     name  = "containerInsights"
#     value = "enabled"
#   }
# }


# module "users" {
#   source            = "./modules/services/users"
#   voicefork_cluster = aws_ecs_cluster.voicefork_cluster
#   networks          = var.networks
#   vpc               = var.vpc
# }
# module "reservations" {
#   source            = "./modules/services/reservations"
#   voicefork_cluster = aws_ecs_cluster.voicefork_cluster
#   networks          = var.networks
#   vpc               = var.vpc
# }
# module "embeddings" {
#   source            = "./modules/services/embeddings"
#   voicefork_cluster = aws_ecs_cluster.voicefork_cluster
#   networks          = var.networks
#   vpc               = var.vpc
# }
# module "restaurants" {
#   source            = "./modules/services/restaurants"
#   voicefork_cluster = aws_ecs_cluster.voicefork_cluster
#   networks          = var.networks
#   vpc               = var.vpc
#   embeddings_url    = module.embeddings.embeddings_ip
# }
# module "proxy" {
#   source            = "./modules/services/proxy"
#   voicefork_cluster = aws_ecs_cluster.voicefork_cluster
#   users_ip          = module.users.users_ip
#   reservations_ip   = module.reservations.reservations_ip
#   restaurants_ip    = module.restaurants.restaurants_ip
#   embeddings_ip     = module.embeddings.embeddings_ip
#   networks          = var.networks
#   vpc               = var.vpc
# }

# output "proxy_ip" {
#   value = module.proxy.proxy_ip
# }
