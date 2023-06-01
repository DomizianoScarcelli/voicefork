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
resource "aws_ecs_task_definition" "voicefork_task_definition" {
  family                   = "embeddings-task-definition"
  execution_role_arn       = "arn:aws:iam::535455227633:role/LabRole"
  task_role_arn            = "arn:aws:iam::535455227633:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "5120"

  container_definitions = jsonencode(
[
        {
            "name": "embeddings",
            "image": "doviscarcelli/embeddings-amd64",
            "cpu": 0,
            "portMappings": [
                {
                    "name": "embeddings-3004-tcp",
                    "containerPort": 3004,
                    "hostPort": 3004,
                    "protocol": "tcp",
                    "appProtocol": "http"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "LOCAL_MODE",
                    "value": "false"
                }
            ],
            "mountPoints": [],
            "volumesFrom": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-create-group": "true",
                    "awslogs-group": "/ecs/embeddings-task-definition",
                    "awslogs-region": "us-east-1",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        },
        {
            "name": "redis",
            "image": "redis",
            "cpu": 0,
            "portMappings": [
                {
                    "name": "redis-6379-tcp",
                    "containerPort": 6379,
                    "hostPort": 6379,
                    "protocol": "tcp",
                    "appProtocol": "http"
                }
            ],
            "essential": false,
            "environment": [],
            "mountPoints": [],
            "volumesFrom": []
        }
]
  )
}



resource "aws_lb_target_group" "target_group" {
    name="embeddings-target-group"
    port = 3004
    protocol  = "HTTP"
    target_type = "ip"
    vpc_id = "vpc-09f851ddd9cc105f4"
}

resource "aws_lb" "load_balancer" {
  name               = "embeddings-load-balancer"
  load_balancer_type = "application"
  subnets            = ["subnet-0ebcbd5c5542a0ee3",
                        "subnet-0ed8750f0b61f788c",
                        "subnet-0b1597f211f5a2c35",
                        "subnet-0973965c726625638",
                        "subnet-03887a0141f62d2f4", 
                        "subnet-03887a0141f62d2f4", 
                        "subnet-076d076632b06d637"]
  security_groups    = ["sg-02c4f407d06dc2383"]
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.target_group.arn
    type             = "forward"
  }
}

resource "aws_appautoscaling_target" "ecs_service_target" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${aws_ecs_cluster.voicefork_cluster.name}/${aws_ecs_service.embeddings_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_ecs_service" "embeddings_service" {
  name            = "embeddings_service"
  cluster         = aws_ecs_cluster.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.voicefork_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = ["sg-02c4f407d06dc2383"]
    subnets         = ["subnet-0ebcbd5c5542a0ee3",
                        "subnet-0ed8750f0b61f788c",
                        "subnet-0b1597f211f5a2c35",
                        "subnet-0973965c726625638",
                        "subnet-03887a0141f62d2f4", 
                        "subnet-03887a0141f62d2f4", 
                        "subnet-076d076632b06d637"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn 
    container_name   = "embeddings"
    container_port   = 3004
  }

deployment_controller {
    type = "ECS"
  }
}

