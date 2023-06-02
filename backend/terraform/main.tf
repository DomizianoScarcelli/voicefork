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

#TODO: change resources names
module "embeddings" {
  source = "./modules"

  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}

module "restaurants" {
  source = "./modules"

  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}


module "reservations" {
  source = "./modules"

  voicefork_cluster = aws_ecs_cluster.voicefork_cluster
}
